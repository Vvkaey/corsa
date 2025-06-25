"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "../_components/theme";
import Script from "next/script";
import { LoginSection } from "../_components/login";
import { Suspense, useState, useEffect } from "react";
import VideoLoadingScreen from "../_components/global/loading";
import styled from "styled-components";

// Loading overlay component
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export default function Login() {
  const [showLoading, setShowLoading] = useState(true);

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

  // Add a small delay to ensure smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while content is loading
  if (showLoading) {
    return (
      <LoadingOverlay>
        <VideoLoadingScreen videoSrc="/loading.mp4" loop={true} />
      </LoadingOverlay>
    );
  }

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
