"use client";

import Script from "next/script";
import ListPageComponent, { ListPageDataProps } from "../_components/tnc";
import { Footer } from "../_components/global/footer";

const POLICY_DATA = [
  {
    title: "1. Introduction",
    description: `Welcome to StrodaClub ("we," "our," "us"). We respect your privacy and are committed to protecting it through this Privacy Policy. 
    This document explains how we collect, use, and safeguard your personal information when you use our website, services.`,
  },
  {
    title: "2. Information We Collect",
    description: `We may collect the following information:`,
    pointers: [
      `Personal Information: Name, email, phone number, and any details you provide when subscribing to our plan.`,
      `Payment Information: If users subscribe a plan, payment details are processed securely through Razorpay (we do not store payment details).`,
      `Usage Data: Information about how you interact with our website, including IP address, browser type, and session activity, collected via Google Analytics.`,
    ],
  },
  {
    title: "3. How We Use Your Information",
    description: " We use the collected data to:",
    pointers: [
      ` Provide and improve our mentoring and access plan services.`,
      ` Communicate with you regarding updates, confirmations, and customer support.`,
      `Personalize your experience based on your preferences.`,
      `Ensure compliance with legal obligations and prevent fraudulent activity you interact with our website, including IP address, browser type, and session activity, collected via Google Analytics.`,
    ],
  },
  {
    title: "4. Data Sharing & Third-Party Services",
    description: `We do not sell or rent your personal information. 
     We may share data with carefully selected third-party educational partners, solely for
     the purpose of enhancing the user learning experience. These collaborations adhere to
     strict confidentiality and data protection standards. We do not share the information
     collected from Google Auth with any third-party service providers; it is purely used
     to onboard users faster on the platform`,
  },
  {
    title: "5. Data Retention Policy",
    description:
      "We retain your personal data only for as long as necessary to provide services and comply with legal obligations. If you request data deletion, we will remove your information unless required by law to retain it.",
  },
  {
    title: "6. Data Security",
    description:
      "We employ strong security measures to protect your data, including encryption, access controls, and regular security audits. All information collected through Google Authentication, such as email and name, is securely encrypted and stored in our databases.",
  },
  {
    title: "7. Cookies & Tracking Technologies",
    description: `We use cookies to enhance your experience. These include:
    Essential Cookies: Required for core functionality (e.g., logging in).
    Analytics Cookies: Collected via Google Analytics to improve our services.
    You can manage or disable cookies via your browser settings.
`,
  },
  {
    title: "8. Changes to This Policy",
    description:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.",
  },
  {
    title:
      "9. Contact Us",
    description:
      "For any privacy-related concerns, reach out to us at connect@stroda.club",
  }
] satisfies ListPageDataProps;

export default function PrivacyPolicy() {
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

      <main>
        <ListPageComponent title={"Privacy Policy"} data={POLICY_DATA} />
        <Footer />
      </main>
    </>
  );
}
