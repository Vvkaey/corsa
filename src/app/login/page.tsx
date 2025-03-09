"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../_components/theme";
import Script from "next/script";
import { LoginSection } from "../_components/login";


export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Your Blog Title",
    datePublished: "2025-01-30",
    author: {
      "@type": "Person",
      name: "Corsa",
    },
  };
  return (
    <>
      <Script id="blog-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <ThemeProvider theme={theme}>
        <div>
          <main>
            <LoginSection />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
