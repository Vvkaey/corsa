"use client";

import Script from "next/script";
import ListPageComponent, { ListPageDataProps } from "../_components/tnc";
import { Footer } from "../_components/global/footer";

const TNC_DATA = [
    {
      title: "1. Introduction",
      description: `These Terms and Conditions ("Terms") govern your use of StrodaClub's website(owned and operated by Vvkaey Edtech Private Limited) and services, including online mentor sessions and subscriptions. By accessing or using our services, you agree to comply with these Terms.`,
    },
    {
      title: "2. User Eligibility",
      description:
        "These Terms and Conditions &ldquo;Terms&rdquo; govern your use of StrodaClub's website and services, including online mentor sessions and subscriptions. By accessing or using our services, you agree to comply with these Terms.",
    },
    {
      title: "3. Mentor Sessions",
      description: "",
      pointers: [
        "Rescheduling Policy: Currently, rescheduling of sessions is not supported.",
        "No-Show Policy:",
        "If a user misses a scheduled session, no refund will be issued. Mentor availability is limited, and scheduling is done in advance to accommodate both users and mentors. We request users to book sessions only if they are certain of their availability.",
        "If a mentor is unable to attend a scheduled session, StrodaClub will arrange a rescheduled session.",
        "While our mentoring sessions aim to provide valuable insights and guidance, individual outcomes may vary.",
      ],
    },
    {
      title: "4. Payment & Refund Policy",
      description: "",
      pointers: [
        "All payments are securely processed via Razorpay. StrodaClub does not store any payment details.",
        "Approved refunds will be processed within 7-10 business days.",
      ],
    },
    {
      title: "5. Code of Conduct",
      description: "",
      pointers: [
        "Users must interact respectfully with mentors and other community members.",
        "Any form of harassment, hate speech, offensive behavior, or content misuse is strictly prohibited.",
        "Violations may result in temporary suspension or permanent account termination.",
        "Mentors are also expected to uphold professional conduct at all times.",
      ],
    },
    {
      title: "6. Intellectual Property",
      description: "",
      pointers: [
        "All content, including mentorship session materials, is owned by StrodaClub and cannot be reproduced, distributed, or used without prior written permission.",
        "Users are prohibited from recording, sharing, or redistributing mentorship sessions or any proprietary content.",
      ],
    },
    {
      title: "7. Limitation of Liability",
      description:
        "StrodaClub shall not be liable for any direct, indirect, incidental, special, punitive, or consequential losses or damages arising from Users' use of the Website or Services.",
    },
    {
      title: "8. Account Termination",
      description: "",
      pointers: [
        "We reserve the right to suspend or terminate your account if you violate these Terms.",
        "Depending on the severity of the violation, users may receive a warning before termination, except in cases of serious breaches.",
      ],
    },
    {
      title: "9. Changes to These Terms",
      description: "",
      pointers: [
        "StrodaClub reserves the right to modify these Terms at any time.",
        "Continued use of our services after any changes implies acceptance of the updated Terms.",
      ],
    },
    {
      title: "10. Contact Us",
      description: "For inquiries, please contact us at connect@stroda.club",
    },
  ] satisfies ListPageDataProps;

export default function TnC() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Your Blog Title",
    datePublished: "2025-01-30",
    author: {
      "@type": "Person",
      name: "Strodaclub",
    },
  };
  return (
    <>
      <Script id="blog-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <main>
        <ListPageComponent title={"Terms of Service"} data={TNC_DATA}/>
        <Footer />
      </main>
    </>
  );
}
