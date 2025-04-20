"use client";

import React from "react";
import { BadgeSection } from "../_components/dashboard/BadgeSection";
import AuthGuard from "../_components/auth/AuthGuard";

export default function Dashobard() {
  return (
    <AuthGuard>
      <BadgeSection />
    </AuthGuard>
  );
}
