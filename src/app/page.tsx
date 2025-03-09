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
import { MembershipSection } from "./_components/home/MembershipSection";
import { PowerfulInsights } from "./_components/home/PowerfulInsights";
import { BrownBgTick } from "./_assets/icons";
import { RewardsSection } from "./_components/home/RewardsSection";
import { Footer } from "./_components/global/footer";
import { useRouter } from "next/navigation";

const MEMBERSHIP_TRAITS = {
  colA: [
    {
      icon: `/membership/newsletter.svg`,
      title: `Newsletters`,
      description: `10 monthly newsletters packed with exclusive insights and updates.`,
    },
    {
      icon: `/membership/connect.svg`,
      title: `1-1 Connect`,
      description: `1 Mentor session included.`,
    },
    {
      icon: `/membership/masterclass.svg`,
      title: `Exclusive Masterclass`,
      description: `Group sessions by mentors that break down key topics every month.`,
    },
  ],
  colB: [
    {
      icon: `/membership/insider-circle.svg`,
      title: `Insider Circles`,
      description: `2 per year invite-only events with mentors.`,
    },
    {
      icon: `/membership/benefits.svg`,
      title: `Member Benefits`,
      description: `Special offers on tools and courses.`,
    },
    {
      icon: `/membership/polls.svg`,
      title: `Interactive Polls`,
      description: `Participate and see how you align with others.`,
    },
  ],
  colC: [
    {
      icon: `/membership/sessions.svg`,
      title: `AMA Sessions`,
      description: `2 group interactions per month with mentors from elite institutions.`,
    },
    {
      icon: `/membership/spotlight.svg`,
      title: `Community Spotlights`,
      description: `Get featured for your achievements.`,
    },
    {
      icon: `/membership/library.svg`,
      title: `Content Library`,
      description: `Unlock curated resources.`,
    },
  ],
};

const INSIGHTS_DATA = {
  colA: [
    {
      icon: <BrownBgTick />,
      title: `Data-Backed Insights`,
      description: `No guesswork. Just real data and analytics to drive smarter decisions.`,
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
      img: "/flow/step-a.svg",
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
      img: "/flow/step-b.svg",
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
      img: "/flow/step-d.svg",
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
      img: "/flow/step-a.svg",
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
      img: "/flow/step-b.svg",
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
                  Your Mentorship <br /> Network
                </>
              }
              subHead="Community that leads together."
              primaryCta="Connect with a mentor"
              onPrimaryCtaClick={()=> router.push('/login')}
              secondaryCta="Access newsletter"
              headB="Gain exclusive insights and access an unparalleled tribe of
              mentors."
              subHeadB="Learnings from Scholars at"
              icons={ICONS}
            />
            <HeroSection
              head={
                <>
                  &quot;We’ve got your back, <br />
                  Let’s{" "}
                  <span style={{ color: " #FF2626" }}>
                    make it happen.&quot;
                  </span>
                </>
              }
              secondaryHead={true}
              subHeadB={
                <>
                  &quot;No fluff, no big promises. Just real conversations with
                  mentors who get it done. Here&apos;s how we&apos;ll help you
                  step up.&quot;
                </>
              }
              compactContainerB={true}
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

            <MembershipSection traits={MEMBERSHIP_TRAITS} />

            <TimerSection />
            <CardRows />
            <BehindTheScenes />
            <FAQSection title={"Know It All"} data={FAQ_DATA} />
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}
