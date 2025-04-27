"use client";

import React, { Suspense } from "react";
import { BadgeSection } from "../_components/dashboard/BadgeSection";
import AuthGuard from "../_components/auth/AuthGuard";

export default function Dashobard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AuthGuard>
      <BadgeSection />
    </AuthGuard>
    </Suspense>
  );
}
