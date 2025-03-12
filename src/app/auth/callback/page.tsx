"use client";

import Script from "next/script";



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
      <Script id="blog-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <div style={{fontSize : '88px', color: '#fff'}}>
        Congrats ! You land on correct callback !!
      </div>
    </>
  );
}
