"use client";

import { ThemeProvider } from "styled-components";
import { HeroSection } from "./_components/home/HeroSection";
import styles from "./page.module.css";
import { theme } from "./_components/theme";
import Script from "next/script";
import { FlowSection } from "./_components/home/FlowSection";
import { QuotationSection } from "./_components/home/QuotationSection";
import { BannerSection } from "./_components/home/BannerSection";

const ICONS = [
  {
    icon: "/iconA.svg",
  },
  {
    icon: "/iconB.svg",
  },
  {
    icon: "/iconC.svg",
  },
  {
    icon: "/iconD.svg",
  },
  {
    icon: "/iconE.svg",
  },
];

const FLOW_CONTENT = [
  {
    colA: {
      img: "/flow/item-a.svg",
      width: 156,
      height: 217,
      top: "-20%",
      right: "15%",
      transform: "rotate(-6deg)",
    },
    colB: {
      img: "/flow/flow-a.svg",
      title: "Book a Slot",
      subtitle: "Schedule a session with a mentor.",
    },
    colC: {
      img: "/flow/flow-ss-a.svg",
    },
  },
  {
    colA: {
      img: "/flow/item-bb.svg",
      width: 191,
      height: 214,
      top: "0%",
      right: "70%",
      transform: "rotate(0deg)",
    },
    colB: {
      img: "/flow/flow-b.svg",
      title: "Engage & Sharet",
      subtitle:
        "Connect during the session to share your goals, challenges, and take notes on actionable advice.",
    },
    colC: {
      img: "/flow/flow-ss-b.svg",
    },
  },
  {
    colA: {
      img: "/flow/item-c.svg",
      width: 173 * 1.75,
      height: 121 * 1.75,
      top: "-10%",
      right: "0%",
      transform: "rotate(3deg)",
    },
    colB: {
      img: "/flow/flow-c.svg",
      title: "Get Feedback",
      subtitle:
        "Receive detailed feedback and additional insights over email after your session.",
    },
    colC: {
      img: "/flow/flow-ss-c.svg",
    },
  },
  {
    colA: {
      img: "/flow/item-d.svg",
      width: 186,
      height: 154,
      top: "-3%",
      right: "15%",
      transform: "rotate(0deg)",
    },
    colB: {
      img: "/flow/flow-d.svg",
      title: "Implement & Reflect",
      subtitle:
        "Connect during the session to share your goals, challenges, and take notes on actionable advice.",
    },
    colC: {
      img: "/flow/flow-ss-d.svg",
    },
  },
  {
    colA: {
      img: "/flow/item-e.svg",
      width: 250 + 50,
      height: 278 + 55.6,
      top: "-25%",
      right: "10%",
      transform: "rotate(-2deg)",
    },
    colB: {
      img: "/flow/flow-e.svg",
      title: "Stay connected",
      subtitle:
        "Receive detailed feedback and additional insights over email after your session.",
    },
    colC: {
      img: "/flow/flow-ss-e.svg",
    },
  },
];

const BANNER_SECTION = {
  title: (
    <>
      Break Through <span className="circled">Barriers</span>
    </>
  ),
  description: `From challenges to milestones, we're here to guide you with
            actionable insights that actually work.`,
  banners: [
    {
      head: `Guidance`,
      description: `Get one-on-one support to navigate challenges with confidence.`,
    },
    {
      head: `Feedback`,
      description: `Receive honest, actionable Feedback.`,
    },
    {
      head: `Strategy`,
      description: `Work through obstacles with mentor-backed solutions.`,
    },
    {
      head: `RESOURCE`,
      description: `Exclusive content and courses recommended by mentors.`,
    },
    {
      head: `SAFESPACE`,
      description: `Ask questions and express concerns freely, without judgment.`,
    },
    {
      head: `Takeaway`,
      description: `Learn about trends and best practices.`,
    },
  ],
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Your Blog Title",
    datePublished: "2025-01-30",
    author: {
      "@type": "Person",
      name: "Author Name",
    },
  };
  return (
    <>
      <Script id="blog-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <ThemeProvider theme={theme}>
        {/* <div className={styles.page}> */}
        <div>
          {/* <main className={styles.main}> */}
          <main className={styles.main}>
            <HeroSection
              head={
                <>
                  Your Mentorship <br /> Network
                </>
              }
              subHead="Community that leads together."
              primaryCta="Connect with a mentor"
              secondaryCta="Access newsletter"
              headB="Gain exclusive insights and access an unparalleled tribe of
              mentors."
              subHeadB="Counsel by Scholars from"
              icons={ICONS}
            />
            <HeroSection
              head={
                <>
                  We’ve got your back, <br />
                  Let’s{" "}
                  <span style={{ color: " #FF2626" }}>make it happen.</span>
                </>
              }
              subHeadB={
                <>
                  No fluff, no big promises—just real conversations with mentors
                  who <br /> get it done. Here&apos;s how we&apos;ll help you
                  step up.
                </>
              }
              compactContainerB={true}
            />
            <FlowSection flowItems={FLOW_CONTENT} />
            <QuotationSection
              description={
                <>
                  “Seek advice, but also be ready to put in the work. <br />{" "}
                  Mentorship works both ways”
                </>
              }
              author={<>—Sheryl Sandberg</>}
            />
            <BannerSection bannerContent={BANNER_SECTION} />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
