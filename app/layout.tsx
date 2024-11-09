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
  title: "Agents.Fun - On Chain Agents for Everyone",
  description:
    "Create and deploy your own on-chain agents powered by AutonoLabs",
  openGraph: {
    title: "Agents.Fun - On Chain Agents for Everyone",
    description:
      "Create and deploy your own on-chain agents powered by AutonoLabs",
    url: "https://agents.fun",
    siteName: "Agents.Fun",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agents.Fun - On Chain Agents for Everyone",
    description:
      "Create and deploy your own on-chain agents powered by AutonoLabs",
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
