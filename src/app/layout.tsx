import type { Metadata } from "next";
import { Exo_2, Fustat } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientProviders from "./_components/ClientProviders";

const geistSans = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
});

const getFustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADV APP",
  description: "lorem ipsum",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${getFustat.variable} ${styles.body}`}>
        <ClientProviders>
          {children}
        </ClientProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}