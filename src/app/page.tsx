"use client";

import { ThemeProvider } from "styled-components";
import { HeroSection } from "./_components/home/HeroSection";
import styles from "./page.module.css";
import { theme } from "./_components/theme";
import Script from "next/script";
import { FlowSection } from "./_components/home/FlowSection";

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
    colA : "Flow 1",
    colB : {
      img : "/flow/flow-a.svg",
      title : "Book a Slot",
      subtitle : "Schedule a session with a mentor."
    },
    colC : {
      img : "/flow/flow-ss-a.svg"
    }
  },
  {
    colA : "Flow 2",
    colB : {
      img : "/flow/flow-b.svg",
      title : "Engage & Sharet",
      subtitle : "Connect during the session to share your goals, challenges, and take notes on actionable advice."
    },
    colC : {
      img : "/flow/flow-ss-b.svg"
    }
  },
  {
    colA : "Flow 3",
    colB : {
      img : "/flow/flow-c.svg",
      title : "Get Feedback",
      subtitle : "Receive detailed feedback and additional insights over email after your session."
    },
    colC : {
      img : "/flow/flow-ss-c.svg"
    }
  },
  {
    colA : "Flow 4",
    colB : {
      img : "/flow/flow-d.svg",
      title : "Implement & Reflect",
      subtitle : "Connect during the session to share your goals, challenges, and take notes on actionable advice."
    },
    colC : {
      img : "/flow/flow-ss-d.svg"
    }
  },
  {
    colA : "Flow 5",
    colB : {
      img : "/flow/flow-e.svg",
      title : "Stay connected",
      subtitle : "Receive detailed feedback and additional insights over email after your session."
    },
    colC : {
      img : "/flow/flow-ss-e.svg"
    }
  }
]

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
            <FlowSection 
            flowItems={FLOW_CONTENT}
            />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
