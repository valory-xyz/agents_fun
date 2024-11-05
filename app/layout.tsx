"use client";

import localFont from "next/font/local";
import "./globals.css";
import { useState } from "react";
import HowItWorksModal from "@/components/HowItWorksModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <div className="fixed inset-0 z-0 grid grid-cols-8 gap-8 p-8 opacity-30 select-none pointer-events-none">
          {/* Create and render the grid */}
          <EmojiGrid />
        </div>
        <main className="pt-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="">
              <h1 className="text-center transition-opacity ease-in duration-700 opacity-100 hover:opacity-0 text-5xl font-bold mb-8 font-['Space_Mono'] transition-opacity duration-700 hover:opacity-80">
                ⚡ Agents.Fun 🤖
              </h1>
              <p className="text-center text-xl mb-8 font-['Space_Mono'] transition-opacity duration-700 hover:opacity-80">
              An AI agent you can own!!
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <a
                href="https://github.com/dvilelaf/meme-ooorr-quickstart/blob/main/README.md"
                className="px-6 py-3 text-xl font-semibold bg-white text-black rounded-lg hover:bg-blue-700 transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create your agent!
              </a>
              <button
                onClick={() => setShowHowItWorks(true)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                How it Works
              </button>
            </div>

            <p className="text-center text-gray-500 text-xs mb-8 transition-opacity duration-700 hover:opacity-80">
              DISCLAIMER: 
              AGENTS.FUN IS AN EXPERIMENTAL PRODUCT CREATED ON OLAS. 
              THIS IS A COMMUNITY CREATED SITE BUILT FOR INFORMATIONAL PURPOSES ONLY. 
              DO YOUR OWN RESEARCH AND USE AT YOUR OWN RISK.
            </p>
          </div>
          {children}
        </main>
      </body>
      <HowItWorksModal
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
      />
    </html>
  );
}

function EmojiGrid() {
  // Create the grid
  const grid: (string | null)[][] = Array(25)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Fill the grid
  for (let i = 0; i < 200; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;

    if ((row + col) % 2 === 0) {
      const usedEmojis = new Set<string>();
      for (let r = Math.max(0, row - 1); r <= Math.min(24, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(7, col + 1); c++) {
          if (grid[r]?.[c]) usedEmojis.add(grid[r][c]!);
        }
      }

      const availableEmojis = ["🤖", "⚡", "⭐", "🚀"].filter(
        (emoji) => !usedEmojis.has(emoji)
      );
      const selectedEmoji =
        availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
      grid[row][col] = selectedEmoji;
    }
  }

  return Array(200)
    .fill(null)
    .map((_, i) => {
      const row = Math.floor(i / 8);
      const col = i % 8;
      return (row + col) % 2 === 0 ? (
        <div
          key={i}
          className="text-4xl text-center animate-float"
          style={{
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${row * 0.1 + col * 0.2}s`,
          }}
        >
          {grid[row][col]}
        </div>
      ) : (
        <div key={i} />
      );
    });
}
