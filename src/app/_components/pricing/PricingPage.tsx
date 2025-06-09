// PricingPage.tsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
// import { Comparison } from "./Comparison";
import {
  headerSpacing,
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { Footer } from "../global/footer";
import ContactUs from "./ContactUs";
import Image from "next/image";
import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import ComparisonNew from "./ComparisonNew";
// import StickyTest from "./StickyTest";
// import Comparison from "./Comparison";
import { rippleAnimation } from "../mentor-application/styled";
import { PricingTick } from "@/app/_assets/icons";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import VideoLoadingScreen from "../global/loading";
import {
  badge_mapper,
  BADGES,
  useMentorshipContext,
} from "@/app/_contexts/MentorshipContext";
import Comparison from "./Comparison";

// Register ScrollTrigger plugin
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  ${headerSpacing()};
  padding-top: 53px;
  position: relative;

  @media (min-width: 1950px) {
    padding-top: 171px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 53px;
  ${sectionResponsivePadding()};
  ${maxWidthContainer};
  opacity: 0; /* Start invisible for animation */
  transform: translateY(20px); /* Start slightly below for animation */

  @media (min-width: 1950px) {
    margin-bottom: 48px;
  }
`;

const Title = styled.h1`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 34.05px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:after {
    content: "good stuff";
    color: #ff2626;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 34.05px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    white-space: nowrap;
  }

  @media (min-width: 992px) {
    font-size: 64.28px;
    white-space: nowrap;
    &:after {
      font-size: 64.28px;
    }
  }

  @media (min-width: 1950px) {
    font-size: 90px;
    &:after {
      font-size: 90px;
    }
  }
`;

const Subtitle = styled.p`
  color: #000;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 auto;
  margin-top: 17px;

  @media (min-width: 992px) {
    margin-top: 17px;
    font-size: 20.6px;
  }

  @media (min-width: 1950px) {
    font-size: 29.324px;
  }
`;

const PlansContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 61px;
  ${sectionResponsivePadding()};
  ${maxWidthContainer};
  margin: 55px 0;
  opacity: 0; /* Start invisible for animation */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  @media (min-width: 992px) {
    margin: 71px auto;
  }
`;

// Create a interface for the props we want to use for styling only
interface StyledPlanCardProps {
  $isPrimary?: boolean;
}

const PlanCard = styled.div<StyledPlanCardProps>`
  box-shadow: ${(props) =>
    props.$isPrimary
      ? "0 10px 15px -3px rgba(66, 153, 225, 0.1)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"};

  padding: 59px 34px 29px;
  width: 100%;
  max-width: 476px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  align-items: center;
  opacity: 0; /* Start invisible for staggered animation */
  transform: translateY(30px); /* Start below for animation */

  border-radius: 11.813px;
  border: 1.39px solid #000;
  background: transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) =>
      props.$isPrimary
        ? "0 15px 20px -5px rgba(66, 153, 225, 0.2)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.15)"};
  }

  @media (min-width: 992px) {
    padding: 54px 40px 35px;
    border-radius: 5.6px;
    border: 1px solid ${(props) => (props.$isPrimary ? "#4299e1" : "#000")};
    background: ${(props) => (props.$isPrimary ? "#f7fafc" : "#ffffff")};
  }

  @media (min-width: 1950px) {
    border-radius: 11.9px;
    padding: 77px 55px 51px;
  }
`;

const PlanName = styled.h3`
  margin-bottom: 16px;
  color: #1a202c;
  text-align: center;
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 27.79px;
  font-style: normal;
  font-weight: 600;
  width: 70%;
  line-height: 125%; /* 125% */

  @media (min-width: 992px) {
    font-size: 28.12px;
    margin-bottom: 30px;
  }

  @media (min-width: 1950px) {
    font-size: 40px;
    margin-bottom: 3.1rem;
  }
`;

const PlanPrice = styled.div`
  margin: 45px 0 16px;
  display: flex;
  align-items: baseline;
  justify-content: center;

  @media (min-width: 992px) {
    margin: 44px 0 17px;
  }

  @media (min-width: 1950px) {
    margin: 81px 0 34px;
  }
`;

const Price = styled.h2`
  font-size: 37.09px;
  font-weight: 600;
  color: #000;
  font-family: var(--font-exo);

  @media (min-width: 992px) {
    color: #1a202c;
    font-size: 37px;
    font-weight: 600;
  }

  @media (min-width: 1950px) {
    font-size: 53px;
  }
`;

const Period = styled.span`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 16.6px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 2px;

  @media (min-width: 992px) {
    margin-left: 0.5rem;
  }

  @media (min-width: 1950px) {
    font-size: 24px;
  }
`;

const PlanDescription = styled.p`
  margin-bottom: 1.5rem;
  margin: 0 auto;
  color: #757575;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  max-width: 85%;

  @media (min-width: 992px) {
    max-width: 25ch;
    font-size: 16px;
  }

  @media (min-width: 1950px) {
    font-size: 24px;
  }
`;

const BenefitsList = styled.div`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
  padding-top: 67px;
  width: 100%;

  @media (min-width: 992px) {
    padding-top: 59px;
  }

  @media (min-width: 1950px) {
    padding-top: 100px;
  }
`;

const BenefitItem = styled.div`
  position: relative;
  border-bottom: 1px solid #d2d2d2;
  color: #4a5568;
  font-family: var(--font-fustat);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  gap: 7px;
  opacity: 0.8; /* Start slightly faded for animation */
  transform: translateX(5px); /* Slight offset for animation */
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.benefit-visible {
    opacity: 1;
    transform: translateX(0);
  }

  span {
    margin-right: 0.75rem;
    position: relative;
    top: 2px;
    align-self: flex-start;

    @media (min-width: 1950px) {
      top: 8px;
    }
  }

  p {
    position: relative;
    font-size: 0.95rem;

    @media (min-width: 1950px) {
      font-size: 24px;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

// Interface for styled button props
interface StyledButtonProps {
  $isPrimary?: boolean;
  $subscribed?: boolean;
  $addOn?: boolean;
}

const CTAContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CtaButton = styled.button<StyledButtonProps>`
  position: relative;
  background: ${(props) =>
    props.$isPrimary ? "#fff" : props.$addOn ? "#D3A662" : "#FF2626"};
  color: ${(props) => (props.$isPrimary ? "#000" : "#FFF")};
  border-radius: 8px;
  border: ${(props) =>
    props.$isPrimary
      ? "1.013px solid #000"
      : props.$addOn
      ? "2.013px solid #D3A662"
      : "2.013px solid #ff2626"};
  padding: 11px 33px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: auto;
  font-family: var(--font-fustat);
  transform: scale(1);
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 2.5px + 5px);
    left: calc(50% - 2.5px);
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.4);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &:hover {
    background: ${(props) =>
      props.$isPrimary ? "#ebf8ff" : props.$addOn ? "#D3A662" : "#e01f1f"};
    color: ${(props) => (props.$isPrimary ? "#000" : "#FFF")};

    &::after {
      animation: ${rippleAnimation} 0.6s ease-out;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${(props) => (props.$subscribed ? "transparent" : "#aeaeae")};
    border: 1px solid ${(props) => (props.$subscribed ? "#FF2626" : "#aeaeae")};
    color: ${(props) => (props.$subscribed ? "#FF2626" : "#fff")};
    transform: scale(1);
    animation: unset;
    cursor: ${(props) => (props.$subscribed ? "grab" : "not-allowed")};

    &::after {
      animation: unset;
    }
  }

  @media (min-width: 992px) {
    padding: 10px 40px;
    font-size: 16.5px;
    width: 275px;
  }

  @media (min-width: 1950px) {
    padding: 13px 58px;
    font-size: 21.521px;
    width: 375px;
  }
`;

const SeeAllNavigator = styled.button<StyledButtonProps>`
  border: none;
  background: transparent;
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  font-family: var(--font-fustat);
  margin-top: 56px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ff2626;
    // transform: translateY(-2px);
  }

  @media (min-width: 1950px) {
    margin-top: 25px;
  }

  @media (min-width: 1950px) {
    margin-top: 33px;
    font-size: 24px;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const DialogueBox = styled.div`
  position: relative;
  width: 80vw;
  height: 65.5px;
  background: #ff2626;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15.2px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 2rem;
  border-radius: 5.5px;
  z-index: -1;
  top: -115px;
  left: -58vw;

  @media (min-width: 992px) {
    border-radius: 8px;
    position: absolute;
    width: 278px;
    top: -118px;
    left: -195px;
  }
`;

const ImageContainer = styled.button`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 25px;
  height: 25px;
  bottom: 50px;
  left: 107px;

  > div {
    opacity: 0;
    transform: scale(0.2);
    transition: opacity 0.1s linear, transform 0.2s linear;
  }

  @media (min-width: 992px) {
    bottom: unset;
    left: unset;
    align-self: flex-end;
    right: -24px;
    top: 0;
    position: absolute;
  }

  &:hover {
    > div {
      z-index: 50;
      opacity: 1;
      transform: scale(1);
      transition: opacity 0.2s linear, transform 0.2s linear;
    }
  }

  img {
    filter: invert(0.3);
  }
`;

// Loading overlay component
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const TestCompatibility = ({
  badge,
  id,
}: {
  badge: string;
  id: number;
}) => {
  if (!badge) return null;
  if (badge == BADGES.MARSHALL || badge == BADGES.TACTICAL_ACE) {
    if (id == 3) return false;
    return true;
  } else if (id == 1 || id == 2) {
    if (badge == BADGES.TOP_GUN) return false;
    return true;
  }
  return true;
};

export const CheckForAddOn = ({ badge, id }: { badge: string; id: number }) => {
  if (!badge) return false;
  if (badge == BADGES.MARSHALL && id == 2) {
    return true;
  } else if (badge == BADGES.TACTICAL_ACE && id == 1) {
    return true;
  }
  return false;
};

// Types
interface Benefit {
  id: number;
  text: string;
}

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  benefits: Benefit[];
  isPrimary?: boolean;
  buttonText: string;
  productType: string | string[];
  compatible?: boolean;
  subscribed?: boolean;
  addOnCTa?: string;
  subscribedCta: string;
  addOn?: boolean;
}

interface PricingPageProps {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

// Plan Component
const Plan: React.FC<PricingPlan> = ({
  name,
  price,
  period,
  description,
  benefits,
  isPrimary,
  buttonText,
  addOnCTa,
  productType,
  compatible,
  subscribed,
  addOn,
  subscribedCta,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const planRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const { width = 1024 } = useWindowSize();

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    try {
      router.push(`/checkout/${productType}`);
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to element function for navigation
  const scrollToElement = (id: string): void => {
    const container = document.getElementById(id);
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <PlanCard $isPrimary={isPrimary} ref={planRef} className="plan-card">
      <PlanName>
        {name.split(" ")[0]} <br />
        Access Plan
      </PlanName>

      <PlanDescription>{description}</PlanDescription>
      <PlanPrice>
        <Price>₹{price}</Price>
        <Period>/ {period}</Period>
      </PlanPrice>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <CTAContainer>
        <CtaButton
          $isPrimary={isPrimary}
          onClick={handleSubscribe}
          disabled={isLoading || !compatible || subscribed}
          $subscribed={subscribed}
          $addOn={addOn}
          className="cta-button"
        >
          {!compatible
            ? "Not Compatible"
            : isLoading
            ? "Processing..."
            : subscribed
            ? subscribedCta
            : addOn
            ? addOnCTa
            : buttonText}
        </CtaButton>
        {!(width < 992) && !compatible ? (
          <ImageContainer>
            <DialogueBox>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="svg-triangle"
                width="100"
                height="100"
                fill="#FF2626"
                style={{
                  position: "absolute",
                  bottom: "-80%",
                  left: "60%",
                  transform: "scale(0.2) rotate(180deg)",
                }}
              >
                <path
                  stroke="#FF2626"
                  scale={0.2}
                  d="M 50,5 95,97.5 5,97.5 z"
                />
              </svg>
              <p>Unavailable with current plan</p>
            </DialogueBox>

            <Image
              src="/info-icon.svg"
              alt="info icon"
              fill
              className="info-icon"
            />
          </ImageContainer>
        ) : !(width < 992) && addOn ? (
          <ImageContainer>
            <DialogueBox>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="svg-triangle"
                width="100"
                height="100"
                fill="#FF2626"
                style={{
                  position: "absolute",
                  bottom: "-80%",
                  left: "60%",
                  transform: "scale(0.2) rotate(180deg)",
                }}
              >
                <path
                  stroke="#FF2626"
                  scale={0.2}
                  d="M 50,5 95,97.5 5,97.5 z"
                />
              </svg>
              <p>Add on and get upgraded to membership badge</p>
            </DialogueBox>

            <Image
              src="/info-icon.svg"
              alt="info icon"
              fill
              className="info-icon"
            />
          </ImageContainer>
        ) : null}
      </CTAContainer>
      {width < 992 && !compatible ? (
        <ImageContainer>
          <DialogueBox>
            <p>Unavailable with current plan</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="svg-triangle"
              width="100"
              height="100"
              fill="#FF2626"
              style={{
                position: "absolute",
                bottom: "-80%",
                  left: "60%",
                transform: "scale(0.2) rotate(180deg)",
              }}
            >
              <path stroke="#FF2626" scale={0.2} d="M 50,5 95,97.5 5,97.5 z" />
            </svg>
          </DialogueBox>

          <Image
            src="/info-icon.svg"
            alt="info icon"
            fill
            className="info-icon"
          />
        </ImageContainer>
      ) : width < 992 && addOn ? (
        <ImageContainer>
          <DialogueBox>
            <p>Add on and get upgraded to membership badge</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              className="svg-triangle"
              width="100"
              height="100"
              fill="#FF2626"
              style={{
                position: "absolute",
                top: "-52px",
                left: "45%",
                transform: "scale(0.2)",
              }}
            >
              <path stroke="#FF2626" scale={0.2} d="M 50,5 95,97.5 5,97.5 z" />
            </svg>
          </DialogueBox>
          <Image
            src="/info-icon.svg"
            alt="info icon"
            fill
            className="info-icon"
          />
        </ImageContainer>
      ) : null}
      <BenefitsList ref={benefitsRef}>
        {benefits.map((benefit) => (
          <BenefitItem key={benefit.id} className="benefit-item">
            <span>
              <PricingTick
                width={width < 1950 ? 16 : 24}
                height={width < 1950 ? 12 : 21}
              />
            </span>
            <p>{benefit.text}</p>
          </BenefitItem>
        ))}
      </BenefitsList>
      <SeeAllNavigator onClick={() => scrollToElement("product-comparision")}>
        See All Benefits{" "}
      </SeeAllNavigator>
    </PlanCard>
  );
};

// Main Pricing Page Component
const PricingPage: React.FC<PricingPageProps> = ({
  title,
  subtitle,
  plans,
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const plansContainerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const { badge, isLoading: contextLoading } = useMentorshipContext();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (badge !== undefined) {
      console.log("Display badge:", badge);
    }
  }, [badge]);

  // Handle loading state - wait for badge data
  useEffect(() => {
    // Check if badge data is loaded (badge is either a string or null, not undefined)
    if (badge !== undefined && !contextLoading) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowLoading(false);
        setContentReady(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [badge, contextLoading]);

  // Set up animations after content is ready
  useEffect(() => {
    if (
      !contentReady ||
      !headerRef.current ||
      !plansContainerRef.current ||
      !pageRef.current
    ) {
      return;
    }

    // Scroll to top when content is ready
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    // Animate header
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    });

    // Animate plans container
    tl.to(
      plansContainerRef.current,
      {
        opacity: 1,
        duration: 0.8,
      },
      "-=0.4"
    );

    // Animate each plan card with stagger
    tl.to(
      ".plan-card",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
      },
      "-=0.4"
    );

    // Set up scroll animations for components further down the page
    // gsap.utils
    //   .toArray<HTMLElement>(".comparison-section, .contact-section")
    //   .forEach((section) => {
    //     gsap.from(section, {
    //       opacity: 0,
    //       y: 30,
    //       duration: 0.8,
    //       scrollTrigger: {
    //         trigger: section,
    //         start: "top 80%",
    //         end: "top 60%",
    //         toggleActions: "play none none none",
    //         scrub: 1,
    //       },
    //     });
    //   });

    // return () => {
    //   // Clean up animations
    //   if (tl) tl.kill();
    //   ScrollTrigger.getAll().forEach((trigger) => {
    //     trigger.kill();
    //   });
    // };
  }, [contentReady]);

  // Show loading screen while waiting for badge data
  if (!showLoading) {
    return (
      <LoadingOverlay>
        <VideoLoadingScreen videoSrc="/loading.mp4" loop={true} />
      </LoadingOverlay>
    );
  }

  return (
    <PageContainer ref={pageRef}>
      <Header ref={headerRef} id="pricing-header">
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>
      <PlansContainer ref={plansContainerRef}>
        {plans.map((plan, idx) => (
          <Plan
            key={plan.id + String(idx)}
            {...plan}
            compatible={
              TestCompatibility({ badge: badge || "", id: plan.id }) as boolean
            }
            subscribed={
              badge_mapper[plan.id as keyof typeof badge_mapper] == badge
            }
            addOn={
              CheckForAddOn({ badge: badge || "", id: plan.id }) as boolean
            }
          />
        ))}
      </PlansContainer>
      {/* <Comparison htmlId="product-comparision" /> */}
      <Comparison htmlId="product-comparision" />
      {/* <div className="comparison-section">
        
      </div> */}
      {/* <StickyTest />
      <ComparisonNew /> */}
            {/* <ComparisonSection /> */}
      <div className="contact-section">
        <ContactUs />
      </div>
      <Footer />
    </PageContainer>
  );
};

export default PricingPage;
