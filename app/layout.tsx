import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Theme from "@/components/Theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuildSpeak QR",
  description: "Build for BuildSpeak podcast by @Dzem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
