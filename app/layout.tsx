import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ragnarok Zero Skill Simulator",
  description: "An English-language skill simulator for the Korean Ragnarok Online Zero MMORPG.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-r from-sky-400 to-sky-200`}>
        {children}
        <p className="text-sm text-center mt-8 mb-5">
          Created by <Link href="https://criatura-academy.com" className="uppercase font-bold text-sky-600 hover:text-sky-700">Criatura Academy</Link> &middot; Last updated: May 27, 2024
        </p>
      </body>
    </html>
  );
}
