"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/navigation";
import { theme } from "../theme";
import VideoLoadingScreen from "../global/loading";

// Import all components
import HeroSection from "./HeroSection";
// import { StepsSection } from "./StepsSection";
import { BannerSection } from "./BannerSection";
import { FAQSection } from "./FAQSection";
import { BehindTheScenes } from "./BehindTheScenes";
import { CardRows } from "./CardRows";
import { TimerSection } from "./TimerSection";
import { PowerfulInsights } from "./PowerfulInsights";
import { RewardsSection } from "./RewardsSection";
import { Footer } from "../global/footer";
import StepsSection from "./StepsSection";
import { QuotationSection } from "./QuotationSection";

// Define proper types for the flow content
interface FlowColA {
  img: string;
  width?: number;
  height?: number;
  top?: string;
  right?: string;
  transform?: string;
}

interface FlowColB {
  img: string;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

interface FlowColC {
  img: string;
}

interface FlowItem {
  colA: FlowColA;
  colB: FlowColB;
  colC: FlowColC;
}

// Define prop types for the wrapper
interface HomeClientWrapperProps {
  icons: Array<{
    name: string;
    icon: string;
  }>;
  flowContent?: FlowItem[];
  bannerContent: {
    title: React.ReactNode;
    description: string;
    banners: Array<{
      head: string;
      description: string;
    }>;
  };
  insightsData: {
    colA: Array<{
      icon: React.ReactNode;
      title: string;
      description: string;
    }>;
    colB: Array<{
      icon: React.ReactNode;
      title: string;
      description: string;
    }>;
  };
  faqData: Array<{
    ques: string;
    ans: string;
  }>;
}

export default function HomeClientWrapper({
  icons,
  flowContent,
  bannerContent,
  insightsData,
  faqData,
}: HomeClientWrapperProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a minimum loading time to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds minimum loading time

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while content is loading
  if (isLoading) {
    return (
      <VideoLoadingScreen 
        videoSrc="/loading.mp4" 
        loop={true}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <main>
          {/* <SubscriptionStickyCta showStickyCta={showStickyCta} /> */}
          <HeroSection
            head={
              <>
                Your Mentorship <br /> Network.
              </>
            }
            subHead="Community that leads together."
            primaryCta="Subscribe a plan"
            onPrimaryCtaClick={() => router.push("/pricing")}
            secondaryCta="Dashboard"
            onSecondaryCTAClick={() => router.push("/dashboard")}
            subHeadB="Learnings from Scholars at"
            icons={icons}
            htmlId={"hero-banner"}
          />

          {/* StepsSection with animations */}
          <StepsSection flowItems={flowContent} />

          <QuotationSection
            description={
              <>
                &ldquo;Seek advice, but also be ready to put in the work. <br />{" "}
                Mentorship works both ways&ldquo;
              </>
            }
            author={<>—Sheryl Sandberg</>}
          />

          <BannerSection bannerContent={bannerContent} />

          <RewardsSection />

          <PowerfulInsights insights={insightsData} />

          <TimerSection />

          <CardRows />

          <BehindTheScenes htmlId={"behind-the-scenes"} />

          <FAQSection title={"Know It All"} data={faqData} />

          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}
