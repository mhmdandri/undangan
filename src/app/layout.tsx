"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Loading from "@/loading";
import LoadingStore from "@/loadingStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = LoadingStore((state) => state.loading);

  return (
    <html lang="en">
      {loading && <Loading />}
      <body>{children}</body>
    </html>
  );
}
