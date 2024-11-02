'use client';

import React from 'react';

const tokens = [
  {
    name: 'PantherCoin',
    tokenAddress: 'https://basescan.org/token/0xa12b34cde567f890123abc',
    tokenAddressDisplay: '0xa12b34cde567f890123abc',
    walletAddress: 'https://basescan.org/address/0xA12b34CdE567f890123ABcDE4567890fA123',
    walletAddressDisplay: '0xA12b34CdE567f890123ABcDE4567890fA123',
    marketCap: '$12,345,678',
    volume: '$1,234,567',
    change24h: '+15.4%',
    rank: 1,
  },
  {
    name: 'LionToken',
    tokenAddress: 'https://basescan.org/token/0xb23c45def678901234bcd',
    tokenAddressDisplay: '0xb23c45def678901234bcd',
    walletAddress: 'https://basescan.org/address/0xB23c45DEf678901234BcdEF5678901bC234',
    walletAddressDisplay: '0xB23c45DEf678901234BcdEF5678901bC234',
    marketCap: '$8,765,432',
    volume: '$876,543',
    change24h: '-5.2%',
    rank: 2,
  },
  {
    name: 'TigerBase',
    tokenAddress: 'https://basescan.org/token/0xc34d56efg789012345def',
    tokenAddressDisplay: '0xc34d56efg789012345def',
    walletAddress: 'https://basescan.org/address/0xC34d56EFg789012345DEfGH6789012cD345',
    walletAddressDisplay: '0xC34d56EFg789012345DEfGH6789012cD345',
    marketCap: '$6,543,210',
    volume: '$654,321',
    change24h: '+8.7%',
    rank: 3,
  },
  {
    name: 'ElephantDAO',
    tokenAddress: 'https://basescan.org/token/0xd45e67fgh890123456efg',
    tokenAddressDisplay: '0xd45e67fgh890123456efg',
    walletAddress: 'https://basescan.org/address/0xD45e67FGh890123456EfgHI7890123dE456',
    walletAddressDisplay: '0xD45e67FGh890123456EfgHI7890123dE456',
    marketCap: '$5,432,109',
    volume: '$543,210',
    change24h: '+2.3%',
    rank: 4,
  },
  {
    name: 'ZebraFi',
    tokenAddress: 'https://basescan.org/token/0xe56f78ghi901234567fgh',
    tokenAddressDisplay: '0xe56f78ghi901234567fgh',
    walletAddress: 'https://basescan.org/address/0xE56f78GHi901234567FghIJ8901234eF567',
    walletAddressDisplay: '0xE56f78GHi901234567FghIJ8901234eF567',
    marketCap: '$4,321,098',
    volume: '$432,109',
    change24h: '-1.8%',
    rank: 5,
  },
];

const Leaderboard = () => {
  return (
    <div className="bg-slate-800 rounded-xl p-8 text-white">
      <div className="flex items-center text-center justify-between w-full mb-8">
        <h2 className="text-3xl text-center font-bold text-white w-full">Top Meme-Oorrr created tokens</h2>
      </div>
      
    
        <table className="min-w-full divide-y divide-slate-600">
          <thead>
            <tr className="bg-slate-700">
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Token Name
                  <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Token Address
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Wallet Address
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Market Cap
                </div>
              </th>
              <th className="group px-8 py-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Volume
                </div>
              </th>
            
            </tr>
          </thead>
          <tbody className="bg-slate-800 divide-y divide-slate-600">
            {tokens.map((token, index) => (
              <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center">
                    
                    <span className="text-sm font-medium text-white">{token.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <a 
                    href={token.tokenAddress} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline font-mono"
                  >
                    {token.tokenAddressDisplay}
                  </a>
                </td>
                <td className="px-8 py-6">
                  <a 
                    href={token.walletAddress} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 hover:underline font-mono"
                  >
                    {token.walletAddressDisplay}
                  </a>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-white">{token.marketCap}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-medium text-white">{token.volume}</span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Leaderboard;
