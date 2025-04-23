"use client";

import { ThemeProvider } from "styled-components";
import { HeroSection } from "./_components/home/HeroSection";
import { theme } from "./_components/theme";
import Script from "next/script";
// import { FlowSection } from "./_components/home/FlowSection";
import { QuotationSection } from "./_components/home/QuotationSection";
import { BannerSection } from "./_components/home/BannerSection";
import { StepsSection } from "./_components/home/StepsSection";
import { FAQSection } from "./_components/home/FAQSection";
import { BehindTheScenes } from "./_components/home/BehindTheScenes";
import { CardRows } from "./_components/home/CardRows";
import { TimerSection } from "./_components/home/TimerSection";
// import { MembershipSection } from "./_components/home/MembershipSection";
import { PowerfulInsights } from "./_components/home/PowerfulInsights";
import { BrownBgTick } from "./_assets/icons";
import { RewardsSection } from "./_components/home/RewardsSection";
import { Footer } from "./_components/global/footer";
import { useRouter } from "next/navigation";

const INSIGHTS_DATA = {
  colA: [
    {
      icon: <BrownBgTick />,
      title: `Data-Backed Insights`,
      description: `Just real data and analytics to 
drive smarter decisions.
`,
    },
    {
      icon: <BrownBgTick />,
      title: `Trend-Driven Updates`,
      description: `Stay ahead with insights into emerging practices.`,
    },
  ],
  colB: [
    {
      icon: <BrownBgTick />,
      title: `Action-Oriented Guidance`,
      description: `Clear steps to help you achieve tangible progress.`,
    },
    {
      icon: <BrownBgTick />,
      title: `Curated Resources`,
      description: `Handpicked tools and guides to make your life easier.

`,
    },
  ],
};

const FAQ_DATA = [
  {
    ques: `Who is this platform for?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `Do we need to pay for mentor sessions?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `What happens during a mentorship session?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `Can I choose my mentor?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `How long are mentorship sessions?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `Will I get feedback after my mentorship session?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `What else can I access besides mentorship?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
  {
    ques: `What if I face issues or need help?`,
    ans: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil id impedit accusamus enim dolores cupiditate accusantium repellat laboriosam corrupti quisquam placeat, quas cumque doloremque ipsam blanditiis, omnis natus ipsa sed.`,
  },
];

const ICONS = [
  {
    name: "IIT Patna",
    icon: "/iconA.svg",
  },
  {
    name: "IIT Delhi",
    icon: "/iconB.svg",
  },
  {
    name: "IIT Madras",
    icon: "/iconC.svg",
  },
  {
    name: "IIT Kanpur",
    icon: "/iconD.svg",
  },
  {
    name: "IIT Guwahati",
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
      img: "/flow/flow-a.png",
      title: "Subscribe for Clarity, Not Chaos",
      subtitle:
        "Pick a plan that fits your goals. Built for candidates planning for IIT-JEE or similar engineering exams.",
    },
    colC: {
      img: "/steps/step-a.png",
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
      img: "/flow/flow-b.png",
      title: "Access Only What Matters",
      subtitle:
        "Once signed up, You'll receive updates directly in your mail, tailored to your selected plan.",
    },
    colC: {
      img: "/steps/step-b.png",
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
      img: "/flow/flow-c.png",
      title: "1-on-1 Mentorship, No Guesswork",
      subtitle:
        "Connect to share your exam prep goals and challenges, and take notes on actionable advice.",
    },
    colC: {
      img: "/steps/step-c.png",
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
      img: "/flow/flow-d.png",
      title: "Weekly Wrap, Strategy and Analysis",
      subtitle:
        "Mentor insights, weekly, to help you plan a structured approach for your competitive engineering exam.",
    },
    colC: {
      img: "/steps/step-d.png",
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
      name: "Corsa",
    },
  };

  const router = useRouter();

  interface ScrollToElementProps {
    id: string;
  }

  const scrollToElement = (id: ScrollToElementProps["id"]): void => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Script id="blog-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <ThemeProvider theme={theme}>
        <div>
          <main>
            <HeroSection
              head={
                <>
                  Your Mentorship <br /> Network.
                </>
              }
              subHead="Community that leads together."
              primaryCta="Subscribe Plan"
              onPrimaryCtaClick={() => router.push("/pricing")}
              secondaryCta="Why Stodaclub"
              onSecondaryCTAClick={() => scrollToElement("behind-the-scenes")}
              // headB="Gain exclusive insights and access an unparalleled tribe of
              // mentors."
              subHeadB="Learnings from Scholars at"
              icons={ICONS}
            />
            <StepsSection flowItems={FLOW_CONTENT} />
            {/* <FlowSection flowItems={FLOW_CONTENT} /> */}
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
            <RewardsSection />
            <PowerfulInsights insights={INSIGHTS_DATA} />

            {/* <MembershipSection traits={MEMBERSHIP_TRAITS} /> */}

            <TimerSection />
            <CardRows />
            <BehindTheScenes htmlId={"behind-the-scenes"} />
            <FAQSection title={"Know It All"} data={FAQ_DATA} />
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
