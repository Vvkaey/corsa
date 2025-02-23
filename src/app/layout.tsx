
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import styles from "./page.module.css";
 import "./globals.css";
import { GlobalUIProvider } from "./_utils/hooks/globalUI";
import { Header } from "./_components/global/header";
import StyledComponentsRegistry from "../../lib/registry";
// import { Header } from "./_components/global/header";

const geistSans = Exo_2({
  variable: "--font-geist-sans",
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
  return (
    <GlobalUIProvider>
      <html lang="en">
        {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
        <body className={`${geistSans.variable} + ${styles.body}`}
        style={{
        paddingTop : '98px'
        }}
        >
          <Header />
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </html>
      </GlobalUIProvider>
  );
}
