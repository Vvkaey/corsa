import type { Metadata, Viewport } from "next";
import { Exo_2, Fustat } from "next/font/google";
import "./globals.css";
import { MentorshipProvider } from "./_contexts/MentorshipContext";
import { AuthProvider } from "./_contexts/AuthContext";
import GlobalStyles from "./_components/GlobalStyles";
import ClientProviders from "./_components/ClientProviders";
import { GsapProvider } from './_components/GsapProvider';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseMetadata } from "./_utils/seo";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
});

const fustat = Fustat({
  subsets: ["latin"],
  variable: "--font-fustat",
});

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={`${exo2.variable} ${fustat.variable}`}>
        <GlobalStyles />
        <GsapProvider>
          <AuthProvider>
            <MentorshipProvider>
              <ClientProviders>
                {children}
              </ClientProviders>
            </MentorshipProvider>
          </AuthProvider>
        </GsapProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}