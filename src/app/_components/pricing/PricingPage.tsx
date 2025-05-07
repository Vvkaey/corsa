// PricingPage.tsx
import React, { useState } from "react";
import styled from "styled-components";

import { useRouter } from "next/navigation";
import { Comparison } from "./Comparison";
import {
  headerSpacing,
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { Footer } from "../global/footer";
import ContactUs from "./ContactUs";
import Image from "next/image";
// import { Comparison } from "./Comparison";

// Styled Components
const PageContainer = styled.div`
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  ${headerSpacing()};
  padding-top: 53px;

  @media (min-width: 1950px) {
    padding-top: 171px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 53px;
  ${sectionResponsivePadding()};
  ${maxWidthContainer};

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
  // flex-wrap: wrap;
  justify-content: center;
  gap: 61px;
  ${sectionResponsivePadding()};
  ${maxWidthContainer};
  margin: 55px 0;

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
  transition: transform 0.2s ease-in-out;
  align-items: center;

  border-radius: 11.813px;
  border: 1.39px solid #000;
  background: #f5f5f5;

  &:hover {
    transform: translateY(-5px);
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
    max-width: 23ch;
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
  // display: flex;
  // align-items: center;
  border-bottom: 1px solid #d2d2d2;
  color: #4a5568;
  font-family: var(--font-fustat);
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  gap: 7px;

  span {
    content: "✓";
    color: #ff2626;
    font-weight: bold;
    margin-right: 0.75rem;

    @media (min-width: 1950px) {
      font-size: 24px;
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
}

const CTAContainer = styled.div`
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CtaButton = styled.button<StyledButtonProps>`
  position: relative;
  background: ${(props) => (props.$isPrimary ? "#fff" : "#FF2626")};
  color: ${(props) => (props.$isPrimary ? "#000" : "#FFF")};
  border-radius: 8px;
  border: ${(props) =>
    props.$isPrimary ? "1.013px solid #000" : "2.013px solid #ff2626"};
  padding: 10px 43px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: auto;
  font-family: var(--font-fustat);

  &:hover {
    background: #ebf8ff;
    color: ${(props) => (props.$isPrimary ? "#000" : "#FF2626")};
  }

  &:disabled {
    background: ${(props) => (props.$subscribed ? "transparent" : "#aeaeae")};
    border: 1px solid ${(props) => (props.$subscribed ? "#FF2626" : "#aeaeae")};
    cursor: not-allowed;
    color: ${(props) => (props.$subscribed ? "#FF2626" : "#fff")};
  }

  @media (min-width: 992px) {
    padding: 0.75rem 1.5rem;
  }

  @media (min-width: 1950px) {
    font-size: 23.5px;
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

const ImageContainer = styled.button`
right : -22px;
top : 0;
position: absolute;
background: transparent;
border : none;
cursor: pointer;
align-self: flex-end;

`

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
  subscribedCta: string;
  addOnCTa: string;
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
  productType,
  compatible,
  subscribed,
  subscribedCta,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    // Token to use until login functionality is implemented
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWFmYWQxYzIzMzIyYzRmNzRkNjJlZSIsImlhdCI6MTc0MzUxNDU4NX0.ml3wjGCEjjXwPppJoj-kzhYklwbAWpxmgMbnKe5cpok";

    try {
      //   const response = await fetch('https://corsa-backend-seven.vercel.app/api/payments/create-order', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}`
      //     },
      //     body: JSON.stringify({ productType }),
      //   });

      //   const data = await response.json();

      //   if (!response.ok) {
      //     throw new Error(data.message || 'Failed to create order');
      //   }

      //   // Handle successful response
      //   console.log('Order created:', data);

      //   // If the API returns a URL to redirect to for payment, redirect the user
      //   if (data.url) {
      //     window.location.href = data.url;
      //   }
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
    <PlanCard $isPrimary={isPrimary}>
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
      >
        {!compatible
          ? "Not Compatible"
          : isLoading
          ? "Processing..."
          : subscribed
          ? subscribedCta
          : buttonText}
      </CtaButton>
     {!compatible ?  <ImageContainer>
        <Image
          src="/info_icon.png"
          alt="info icon"
          width={20}
          height={20}
          className="info-icon"
        />
      </ImageContainer> : null}
      </CTAContainer>
      <BenefitsList>
        {benefits.map((benefit) => (
          <BenefitItem key={benefit.id}>
            <span>✓</span>
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
  return (
    <PageContainer>
      <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>
      <PlansContainer>
        {plans.map((plan, idx) => (
          <Plan
            key={plan.id}
            {...plan}
            compatible={idx !== 2}
            subscribed={idx === 1}
          />
        ))}
      </PlansContainer>
      <Comparison htmlId="product-comparision" />
      <ContactUs />
      {/* <ProductComparisonTable /> */}
      <Footer />
    </PageContainer>
  );
};

export default PricingPage;
