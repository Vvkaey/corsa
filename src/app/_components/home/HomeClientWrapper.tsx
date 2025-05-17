"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/navigation";
import { theme } from "../theme";

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

  // const [showStickyCta, setShowStickyCta] = useState(false);

  // useEffect(() => {
  //   // Create an intersection observer to monitor the hero banner
  //   const heroElement = document.getElementById("hero-banner");
    
  //   if (heroElement) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         // When hero banner is NOT in viewport, show the sticky CTA
  //         setShowStickyCta(!entries[0].isIntersecting);
  //       },
  //       {
  //         // Adjust threshold as needed - 0.1 means when 10% of the element is visible
  //         threshold: 0.1,
  //         // Use a small rootMargin to trigger slightly before the element leaves viewport
  //         rootMargin: "-10px 0px 0px 0px"
  //       }
  //     );
      
  //     observer.observe(heroElement);
      
  //     // Clean up observer on component unmount
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }
  // }, []);

  // Scroll to element function for navigation
  // const scrollToElement = (id: string): void => {
  //   const container = document.getElementById(id);
  //   if (container) {
  //     container.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  useEffect(() => {
    console.log("flowContent:", flowContent);
  });

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
