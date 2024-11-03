/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChain, setSelectedChain] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("heartCount");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedChain !== "all") {
          params.append("chain", selectedChain);
        }
        params.append("sortBy", sortBy);
        params.append("order", sortOrder);

        const response = await fetch(`/api/leaderboard?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (err: any) {
        setError(err?.message ?? "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [selectedChain, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-white">
        <p>Loading leaderboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 text-white">
        <p>Error: {error}</p>
      </div>
    );
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(column);
      setSortOrder("DESC");
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-8 text-white">
      <div className="flex items-center justify-between w-full mb-8">
        <h2 className="text-3xl font-bold text-white">
          Top Agent created tokens
        </h2>
        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All Chains</option>
          <option value="base">Base</option>
          <option value="celo">Celo</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full divide-y divide-slate-600">
          <thead>
            <tr className="bg-slate-700">
              <th
                className="group px-8 py-5 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Token Symbol
                  {sortBy === "name" && (
                    <span>{sortOrder === "DESC" ? "↓" : "↑"}</span>
                  )}
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Token Address
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Token Owner
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Chain
                </div>
              </th>
              <th
                className="group px-8 py-5 text-left cursor-pointer"
                onClick={() => handleSort("heartCount")}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Hearts
                  {sortBy === "heartCount" && (
                    <span>{sortOrder === "DESC" ? "↓" : "↑"}</span>
                  )}
                </div>
              </th>
              <th
                className="group px-8 py-5 text-left cursor-pointer"
                onClick={() => handleSort("marketCap")}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Market Cap
                  {sortBy === "marketCap" && (
                    <span>{sortOrder === "DESC" ? "↓" : "↑"}</span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-600">
            {leaderboardData?.map((token: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-white">
                    ${token.symbol}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center">
                    <a
                      href={`https://explorer.${token.chain}.org/address/${token.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      {token.id}
                    </a>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <a
                    href={`https://explorer.${token.chain}.org/address/${token.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {token.owner}
                  </a>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-white capitalize">
                    {token.chain}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-white">
                    {token.heartCount}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-white">
                    $
                    {token.marketCap.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
