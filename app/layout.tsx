import { Inter, Cinzel, Orbitron } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });
const orbitron = Orbitron({ subsets: ["latin"], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: "Aman Adhikari // Software_Engineer",
  description: "Web_Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cinzel.variable} ${orbitron.variable} bg-surface-dim text-text overflow-x-hidden`}>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
