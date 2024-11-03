/* eslint-disable @typescript-eslint/no-unused-vars */
import redis from "./redis";
import { ethers } from "ethers";

// Cache duration in seconds (3 minutes)
const CACHE_DURATION = 180;

// Standard ERC20 ABI segments we need
const erc20ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
];

// Uniswap V3 Pool ABI segments we need
const poolABI = [
  "function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
];

interface TokenData {
  price: number;
  marketCap: number;
  totalSupply: number;
  name: string;
  symbol: string;
}

// RPC URLs for different chains
const RPC_URLS = {
  base: process.env.BASE_RPC_URL!,
  celo: process.env.CELO_RPC_URL!,
} as const;

export const getTokenData = async (
  tokenAddress: string,
  lpPairAddress: string,
  chain: string
): Promise<TokenData> => {
  const cacheKey = `token_data:${tokenAddress.toLowerCase()}`;

  try {
    // Check Redis cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Get the correct RPC URL based on chain
    const rpcUrl = RPC_URLS[chain as keyof typeof RPC_URLS];
    if (!rpcUrl) {
      throw new Error(`Unsupported chain: ${chain}`);
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider);

    // Get token supply and decimals
    const [totalSupply, decimals, name, symbol] = await Promise.all([
      tokenContract.totalSupply(),
      tokenContract.decimals(),
      tokenContract.name(),
      tokenContract.symbol(),
    ]);

    let price = 0;
    if (lpPairAddress) {
      try {
        const poolContract = new ethers.Contract(
          lpPairAddress,
          poolABI,
          provider
        );

        const [slot0Data, token0, token1] = await Promise.all([
          poolContract.slot0(),
          poolContract.token0(),
          poolContract.token1(),
        ]);

        const sqrtPriceX96 = slot0Data.sqrtPriceX96;
        const isToken0 = token0.toLowerCase() === tokenAddress.toLowerCase();

        // Calculate price from sqrtPriceX96, safely converting BigInt to number
        price = isToken0
          ? (Number(sqrtPriceX96.toString()) / 2 ** 96) ** 2
          : 1 / (Number(sqrtPriceX96.toString()) / 2 ** 96) ** 2;
      } catch (lpError) {
        console.error(`Error fetching pool data: ${lpError}`);
        // Continue with price as 0 if pool interaction fails
      }
    }

    // Convert totalSupply from wei to ETH using ethers.js formatting
    const formattedSupply = Number(ethers.formatUnits(totalSupply, decimals));
    const marketCap = formattedSupply * price;

    const tokenData: TokenData = {
      price,
      marketCap,
      totalSupply: formattedSupply,
      name,
      symbol,
    };

    // Store in Redis cache with expiration
    await redis.setex(cacheKey, CACHE_DURATION, JSON.stringify(tokenData));

    return tokenData;
  } catch (error) {
    console.log(`Error processing token ${tokenAddress} on ${chain}:`, error);
    return {
      price: 0,
      marketCap: 0,
      totalSupply: 0,
      name: "",
      symbol: "",
    };
  }
};
