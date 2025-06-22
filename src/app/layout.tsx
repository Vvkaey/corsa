import type { Metadata, Viewport } from "next";
import { Exo_2, Fustat } from "next/font/google";
import "./globals.css";
import { MentorshipProvider } from "./_contexts/MentorshipContext";
import { AuthProvider } from "./_contexts/AuthContext";
import GlobalStyles from "./_components/GlobalStyles";
import ClientProviders from "./_components/ClientProviders";
import { GsapProvider } from './_components/GsapProvider';
import { SpeedInsights } from "@vercel/speed-insights/next";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
});

const fustat = Fustat({
  subsets: ["latin"],
  variable: "--font-fustat",
});

export const metadata: Metadata = {
  title: "Stroda Club",
  description: "Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank.",
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