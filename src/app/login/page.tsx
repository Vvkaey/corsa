"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../_components/theme";
import Script from "next/script";
import { LoginSection } from "../_components/login";
import { Suspense } from "react";


export default function Login() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Stroda Club",
    datePublished: "2025-01-30",
    author: {
      "@type": "Person",
      name: "Stroda Club",
    },
  };


  // Show appropriate state
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Script id="blog-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <ThemeProvider theme={theme}>
        <div>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginSection />
            </Suspense>
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
