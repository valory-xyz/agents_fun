/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
import { getTokenData } from "@/lib/helpers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortOrder = searchParams.get("order")?.toLowerCase() || "desc";
    const chain = searchParams.get("chain")?.toLowerCase() ?? null;
    const view = searchParams.get("view") ?? "trending";

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const unleashCondition =
      view === "top"
        ? ""
        : view === "summoned"
        ? "isUnleashed: false"
        : "isUnleashed: true";

    const graphqlQuery = {
      query: `
        query UnleashedMemes {
          memeTokens(
            where: { 
              ${unleashCondition}
              ${chain ? `chain: "${chain}"` : ""}
            }
            orderBy: "heartCount"
            orderDirection: "${sortOrder}"
          ) {
            items {
              id
              chain
              owner
              lpPairAddress
              liquidity
              isUnleashed
              timestamp
              blockNumber
              heartCount
              heartAmount {
                id
                amount
              }
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

    const leaderboardData = response?.data?.data?.memeTokens?.items;

    if (!Array.isArray(leaderboardData) || leaderboardData.length === 0) {
      return NextResponse.json([]);
    }

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
          heartCount: token.heartCount ?? 0,
          heartAmount: token.heartAmount?.amount
            ? Number(token.heartAmount.amount) / 1e18
            : 0,
        };
      })
    );

    if (view === "top") {
      enrichedData.sort((a, b) => {
        return sortOrder === "desc"
          ? b.heartCount - a.heartCount
          : a.heartCount - b.heartCount;
      });
    } else if (view === "summoned") {
      enrichedData.sort((a, b) => {
        return sortOrder === "desc"
          ? b.heartCount - a.heartCount
          : a.heartCount - b.heartCount;
      });
    }

    return NextResponse.json(enrichedData);
  } catch (error) {
    console.log("Error in API route:", error);
    return NextResponse.json([]);
  }
}
