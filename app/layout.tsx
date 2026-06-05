import "./global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fira_Code as FiraCode, Inter } from "next/font/google";
import { Breadcrumb } from "./components/breadcrumb";
import { Navbar } from "./components/nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fira = FiraCode({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fira.variable} text-neutral-950`}>
      <body className="antialiased max-w-3xl mt-8 lg:mx-auto bg-white">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-6 md:px-4">
          <header className="flex flex-col space-y-2">
            <Breadcrumb />
            <Navbar />
          </header>
          <div className="mt-8" />
          {children}
        </main>
      </body>
    </html>
  );
}
