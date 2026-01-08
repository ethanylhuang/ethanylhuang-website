import "./global.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fira_Code as FiraCode, Inter } from "next/font/google";
import { Breadcrumb } from "./components/breadcrumb";
import { Navbar } from "./components/nav";
import { Footer } from "./components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fira = FiraCode({ subsets: ["latin"], variable: "--font-mono" });

const cx = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cx("text-slate-100", inter.variable, fira.variable)}
    >
      <body className="antialiased max-w-3xl mt-8 lg:mx-auto bg-transparent">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-6 md:px-4">
          <header className="flex flex-col space-y-2">
            <Breadcrumb />
            <Navbar />
          </header>
          <div className="mt-8" />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
