import type { Metadata } from "next";
import { Exo_2, Fustat } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientProviders from "./_components/ClientProviders";
import { GsapProvider } from './_components/GsapProvider';

const geistSans = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
});

const getFustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Your Mentorship Network - Community that leads together",
  description: "Connect with top mentors from premier institutions like IITs for guidance on your educational journey.",
  metadataBase: new URL('https://corsa-gules.vercel.app'),
  openGraph: {
    title: "Your Mentorship Network - Community that leads together",
    description: "Connect with top mentors from premier institutions like IITs for guidance on your educational journey.",
    images: [
      {
        url: "/header/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Mentorship Network",
      },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // Any other viewport configurations
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${getFustat.variable} ${styles.body}`}>
        <GsapProvider>
        <ClientProviders>
          {children}
        </ClientProviders>
        </GsapProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}