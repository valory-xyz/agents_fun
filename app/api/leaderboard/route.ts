/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
import { getTokenData } from "@/lib/helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sortBy") ?? "recentHeartCount";
    const sortOrder = searchParams.get("order")?.toUpperCase() || "DESC";
    const chain = searchParams.get("chain")?.toLowerCase() ?? null;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const oneDayAgo = currentTimestamp - 24 * 60 * 60;

    const graphqlQuery = {
      query: `
        query UnleashedMemes {
          memeTokens(
            where: { 
              isUnleashed: true
              ${chain ? `, chain: "${chain}"` : ""}
            }
            orderBy: heartCount
            orderDirection: ${sortOrder}
          ) {
            items {
              id
              chain
              owner
              lpPairAddress
              liquidity
              heartCount
              recentHeartCount: heartEvents(
                where: { timestamp_gt: ${oneDayAgo} }
              ) {
                id
              }
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
    //   recentHeartCount: 10,
    //   heartCount: 10,
    //   marketCap: 1000000,
    //   isUnleashed: true,
    //   timestamp: 1725379200,
    //   blockNumber: 17423944,
    // };
    // const mockEntry2 = {
    //   ...mockEntry,
    //   recentHeartCount: 20,
    // };

    const leaderboardData = response?.data?.data?.memeTokens?.items;
    //use mockEntry for testing, delete later
    // const leaderboardData = [mockEntry, mockEntry2];

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
          recentHeartCount: token.recentHeartCount,
        };
      })
    );

    // Always sort by recentHeartCount unless explicitly specified otherwise
    if (sortBy === "recentHeartCount" || !sortBy) {
      enrichedData.sort((a, b) => {
        return sortOrder === "DESC"
          ? b.recentHeartCount - a.recentHeartCount
          : a.recentHeartCount - b.recentHeartCount;
      });
    }

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.log("Error in API route:", error);
    return NextResponse.json([]);
  }
}
