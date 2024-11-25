/* eslint-disable @typescript-eslint/no-unused-vars */
import { poolABI } from "@/public/contracts/poolContract";
import redis from "./redis";
import { ethers } from "ethers";

const CACHE_DURATION = 180;

const erc20ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
];

interface TokenData {
  price: number;
  marketCap: number;
  totalSupply: number;
  name: string;
  symbol: string;
}

const RPC_URLS = {
  base: process.env.BASE_RPC_URL!,
  celo: process.env.CELO_RPC_URL!,
} as const;

// We only need one USDC pool address since ETH price will be the same
const ETH_USDC_POOL = "0x88A43bbDF9D098eEC7bCEda4e2494615dfD9bB9C";
const BASE_PROVIDER = new ethers.JsonRpcProvider(RPC_URLS.base);

export const getTokenData = async (
  tokenAddress: string,
  lpPairAddress: string,
  chain: string
): Promise<TokenData> => {
  const cacheKey = `token_data:${tokenAddress.toLowerCase()}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const rpcUrl = RPC_URLS[chain as keyof typeof RPC_URLS];
    if (!rpcUrl) {
      throw new Error(`Unsupported chain: ${chain}`);
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider);

    const [totalSupply, decimals, name, symbol] = await Promise.all([
      tokenContract.totalSupply(),
      tokenContract.decimals(),
      tokenContract.name(),
      tokenContract.symbol(),
    ]);

    let price = 0;
    let priceUSD = 0;

    if (lpPairAddress) {
      try {
        const code = await provider.getCode(lpPairAddress);
        if (code === "0x") {
          throw new Error("No contract found at LP pair address");
        }

        const poolContract = new ethers.Contract(
          lpPairAddress,
          poolABI,
          provider
        );

        const [reserves, token0, token1] = await Promise.all([
          poolContract.getReserves(),
          poolContract.token0(),
          poolContract.token1(),
        ]);

        const isToken0 = token0.toLowerCase() === tokenAddress.toLowerCase();
        const [reserve0, reserve1] = [reserves._reserve0, reserves._reserve1];

        const token0Contract = new ethers.Contract(token0, erc20ABI, provider);
        const token1Contract = new ethers.Contract(token1, erc20ABI, provider);
        const [decimals0, decimals1] = await Promise.all([
          token0Contract.decimals(),
          token1Contract.decimals(),
        ]);

        const reserve0BigInt = BigInt(reserve0);
        const reserve1BigInt = BigInt(reserve1);

        const decimal0Multiplier = BigInt(10) ** BigInt(decimals0);
        const decimal1Multiplier = BigInt(10) ** BigInt(decimals1);

        // Calculate price maintaining BigInt throughout and avoiding premature rounding
        const priceInWei = isToken0
          ? (reserve1BigInt * decimal0Multiplier * BigInt(10 ** 18)) /
            (reserve0BigInt * decimal1Multiplier)
          : (reserve0BigInt * decimal1Multiplier * BigInt(10 ** 18)) /
            (reserve1BigInt * decimal0Multiplier);

        // Convert to number with proper scaling
        price = Number(priceInWei) / 10 ** 18;

        // Get ETH/USD price from USDC pool
        const usdcPoolContract = new ethers.Contract(
          ETH_USDC_POOL,
          poolABI,
          BASE_PROVIDER
        );

        const usdcReserves = await usdcPoolContract.getReserves();
        const ethReserveBigInt = BigInt(usdcReserves._reserve0);
        const usdcReserveBigInt = BigInt(usdcReserves._reserve1);

        const ethPriceInWei =
          (usdcReserveBigInt * BigInt(10) ** BigInt(18)) /
          (ethReserveBigInt * BigInt(10) ** BigInt(6));

        const ethPrice = Number(ethers.formatUnits(ethPriceInWei, 0));

        priceUSD = price * ethPrice;
      } catch (lpError) {
        console.error(
          `Error fetching pool data for ${lpPairAddress}: ${lpError}`
        );
        // Log additional context for debugging
        console.error("Chain:", chain);
        console.error("Token Address:", tokenAddress);
        price = 0;
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
