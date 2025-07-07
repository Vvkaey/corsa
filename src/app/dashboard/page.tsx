"use client";

import React, { Suspense } from "react";
import { BadgeSection } from "../_components/dashboard/BadgeSection";
import AuthGuard from "../_components/auth/AuthGuard";
import Script from "next/script";
import { structuredData } from "../_utils/seo";

export default function Dashboard() {
  return (
    <>
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify(structuredData.organization)}
      </Script>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthGuard>
          <BadgeSection />
        </AuthGuard>
      </Suspense>
    </>
  );
}
