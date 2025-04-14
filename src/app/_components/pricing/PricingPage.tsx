// PricingPage.tsx
import React, { useState } from "react";
import styled from "styled-components";

import { useRouter } from "next/navigation";
import { Comparison } from "./Comparison";
// import { Comparison } from "./Comparison";

// Styled Components
const PageContainer = styled.div`
  padding: 150px 0;
  max-width: 1500px;
  margin: 0 auto;

  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  @media (min-width: 992px) {
    padding: 150px 0 250px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 90px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;

  &:after {
    content: "good stuff";
    color: #ff2626;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 90px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    white-space: nowrap;
  }
`;

const Subtitle = styled.p`
  color: #000;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 29.324px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 auto;
`;

const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Create a interface for the props we want to use for styling only
interface StyledPlanCardProps {
  $isPrimary?: boolean;
}

const PlanCard = styled.div<StyledPlanCardProps>`
  background: ${(props) => (props.$isPrimary ? "#f7fafc" : "#ffffff")};
  border: 1px solid ${(props) => (props.$isPrimary ? "#4299e1" : "#e2e8f0")};
  box-shadow: ${(props) =>
    props.$isPrimary
      ? "0 10px 15px -3px rgba(66, 153, 225, 0.1)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"};
  border-radius: 8px;
  padding: 77px 55px 51px;
  width: 100%;
  max-width: 476px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanName = styled.h3`
  margin-bottom: 4rem;
  color: #1a202c;
  text-align: center;
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px; /* 125% */
  white-space: nowrap;
`;

const PlanPrice = styled.div`
  margin: 81px 0 34px;
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const Price = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  font-family: var(--font-exo);
`;

const Period = styled.span`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 0.5rem;
`;

const PlanDescription = styled.p`
  margin-bottom: 1.5rem;
  margin: 0 auto;
  color: #757575;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
  padding-top: 100px;
`;

const BenefitItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #4a5568;
  font-family: var(--font-fustat);
  &:before {
    content: "✓";
    color: #ff2626;
    font-weight: bold;
    margin-right: 0.75rem;
  }

  &:after {
    position: absolute;
    bottom: -6px;
    content: "";
    height: 6px;
    border-bottom: 1px solid #d2d2d2;
    width: 100%;
    font-weight: bold;
    margin-right: 0.75rem;
  }

  &:last-child {
    &:after {
      border-bottom: none;
    }
  }
`;

// Interface for styled button props
interface StyledButtonProps {
  $isPrimary?: boolean;
}

const CtaButton = styled.button<StyledButtonProps>`
  background: ${(props) => (props.$isPrimary ? "#fff" : "#FF2626")};
  color: ${(props) => (props.$isPrimary ? "#000" : "#FFF")};
  border-radius: 8px;
  border: ${(props) =>
    props.$isPrimary ? "1.013px solid #000" : "2.013px solid #ff2626"};
  padding: 0.75rem 1.5rem;
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
`;

const SeeAllNavigator = styled.button<StyledButtonProps>`
  border: none;
  background: transparent;
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-size: 24px;
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
  margin-top: 33px;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

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

  return (
    <PlanCard $isPrimary={isPrimary}>
      <PlanName>{name}</PlanName>
      <PlanDescription>{description}</PlanDescription>
      <PlanPrice>
        <Price>₹{price}</Price>
        <Period>/ {period}</Period>
      </PlanPrice>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <CtaButton
        $isPrimary={isPrimary}
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : buttonText}
      </CtaButton>
      <BenefitsList>
        {benefits.map((benefit) => (
          <BenefitItem key={benefit.id}>{benefit.text}</BenefitItem>
        ))}
      </BenefitsList>
      <SeeAllNavigator>See All Benefits </SeeAllNavigator>
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
        {plans.map((plan) => (
          <Plan key={plan.id} {...plan} />
        ))}
      </PlansContainer>
      <Comparison htmlId="product-comparision" />
      {/* <ProductComparisonTable /> */}
    </PageContainer>
  );
};

export default PricingPage;
