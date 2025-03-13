"use client";

import { AuthProgress } from "@/app/_components/auth/AuthProgress";
import Script from "next/script";
import { Suspense } from "react";

export default function Callback() {
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
      <Suspense fallback={<h1>Loading...</h1>}>
        <Script id="blog-schema" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
        <AuthProgress />
      </Suspense>
    </>
  );
}
