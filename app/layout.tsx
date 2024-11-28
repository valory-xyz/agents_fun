import localFont from "next/font/local";
import "./globals.css";

import ClientHeader from "@/components/ClientHeader";
import ClientWrapper from "@/components/ClientWrapper";

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

export const metadata = {
  title: "Agents.Fun - Fun autonomous AI agents you can own!",
  description:
    "Create and deploy your own autonomous AI agents powered by Olas",
  openGraph: {
    title: "Agents.Fun - Fun autonomous AI agents you can own!",
    description:
      "Create and deploy your own autonomous AI agents powered by Olas",
    url: "https://agents.fun",
    siteName: "Agents.Fun",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agents.Fun - Fun autonomous AI agents you can own!",
    description:
      "Create and deploy your own autonomous AI agents powered by Olas",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <div className="mb-8 p-4 bg-red-900/80 border-2 border-red-500 rounded-none text-white">
          <h3 className="text-xl font-bold mb-2 text-center">
            ⚠️ High Risk Warning - DO NOT USE!
          </h3>
          <p className="text-sm md:text-base">
            The Unleash feature for meme tokens with large ETH commitments has
            critical vulnerabilities.&nbsp;
            <strong className="font-bold">
              We strongly advise against using this feature
            </strong>
            &nbsp;as it may result in permanent loss of funds. The contracts are
            unaudited and potentially dangerous.
          </p>
        </div>
        <div className="fixed inset-0 z-0 grid grid-cols-8 gap-8 p-8 opacity-30 select-none pointer-events-none">
          <EmojiGrid />
        </div>
        <ClientWrapper>
          <main className="pt-20 relative z-10">
            <div className="max-w-4xl mx-auto px-4">
              <ClientHeader />
              {children}
            </div>
          </main>
          <a
            href="https://x.com/agentsdotfun"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-20 text-white/50 hover:text-white transition-colors"
            aria-label="Follow us on X (Twitter)"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </ClientWrapper>
      </body>
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
