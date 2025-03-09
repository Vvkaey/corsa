import type { Metadata } from "next";
import { Exo_2, Fustat } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";
import { GlobalUIProvider } from "./_utils/hooks/globalUI";
import { Header } from "./_components/global/header";
import StyledComponentsRegistry from "../../lib/registry";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Header } from "./_components/global/header";

const geistSans = Exo_2({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const getFustat = Fustat({
  variable: "--font-fustat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADV APP",
  description: "lorem ipsum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error("Google Client ID is not defined in the environment");
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GlobalUIProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${getFustat.variable} ${styles.body}`}
          >
            <Header />
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </body>
        </html>
      </GlobalUIProvider>
    </GoogleOAuthProvider>
  );
}
