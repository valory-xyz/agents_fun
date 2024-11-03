/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
import { getTokenData } from "@/lib/helpers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("order")?.toUpperCase() || "DESC";
    const chain = searchParams.get("chain")?.toLowerCase() ?? null;

    const graphqlQuery = {
      query: `
        query UnleashedMemes {
          memeTokens(
            where: { 
              isUnleashed: true
              ${chain ? `, chain: "${chain}"` : ""}
            }
            ${sortBy ? `orderBy: ${sortBy}` : ""}
            ${sortBy ? `orderDirection: ${sortOrder}` : ""}
          ) {
            items {
              id
              chain
              owner
              lpPairAddress
              liquidity
              heartCount
              isUnleashed
              timestamp
              blockNumber
            }
          }
        }
      `,
    };

    const response = await axios({
      url: process.env.SUBGRAPH_URL,
      method: "post",
      data: graphqlQuery,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // use mockEntry for testing, delete later
    // const mockEntry = {
    //   id: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
    //   chain: "base",
    //   owner: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    //   lpPairAddress: "0xc9034c3E7F58003E6ae0C8438e7c8f4598d5ACAA",
    //   liquidity: "1000000000000000000", // 1 ETH worth of liquidity
    //   heartCount: 10,
    //   isUnleashed: true,
    //   timestamp: Math.floor(Date.now() / 1000), // current Unix timestamp
    //   blockNumber: 100000,
    // };

    const leaderboardData = response?.data?.data?.memeTokens?.items;
    //use mockEntry for testing, delete later
    // const leaderboardData = [mockEntry];

    if (!Array.isArray(leaderboardData) || leaderboardData.length === 0) {
      return NextResponse.json([]);
    }

    // Process each token
    const enrichedData = await Promise.all(
      leaderboardData.map(async (token: any) => {
        const tokenData = await getTokenData(
          token.id,
          token.lpPairAddress,
          token.chain
        );
        return {
          ...token,
          ...tokenData,
        };
      })
    );

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.log("Error in API route:", error);
    return NextResponse.json([]);
  }
}
