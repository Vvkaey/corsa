"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import Head from "next/head";
import {
  pricingData,
  PropertyMapper,
} from "@/app/_components/data/productData";
import { CaretUp, Tick } from "@/app/_assets/icons";
// import Image from "next/image";
// import { useAuth } from "@/app/_contexts/AuthContext";
// import FailureScreen from "@/app/_components/pricing/failure/FailureScreen";
// import ThankyouScreen from "@/app/_components/pricing/success/ThankyouScreen";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { TnC } from "@/app/_components/auth/LoginForm";
import VideoLoadingScreen from "@/app/_components/global/loading";
import {
  BackLink,
  BenefitItem,
  BenefitsList,
  CheckoutContainer,
  CheckoutGrid,
  Divider,
  ErrorMessage,
  MobileBenefitsList,
  OrderSummary,
  PaymentSection,
  ProductDetailsCard,
  ProductTitle,
  SectionTitle,
  SeeAllBtn,
  SummaryRow,
  SummaryTotal,
} from "@/app/_components/checkout/styled";
import CheckoutForm from "@/app/_components/checkout/CheckoutForm";
// import ThankyouScreen, {
//   GridType,
// } from "@/app/_components/pricing/success/ThankyouScreen";
import styled from "styled-components";

// Types

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

interface Benefit {
  id: number;
  text: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  benefits: Benefit[];
  buttonText: string;
  productType: string;
}

const getActiveBenefits = (planId: number) => {
  // Find the plan by its ID
  const plan = pricingData.plans.find((p) => p.id === planId);
  if (!plan) return [];

  // Filter the `comparisonData` to find all keys with `value: true`
  const activeIds = Object.keys(plan.comparisonData).filter(
    (key) =>
      (plan.comparisonData as Record<string, { value: boolean | string }>)[key]
        .value !== false
  );

  // Map the active IDs to their corresponding title and subtitle from PropertyMapper
  const benefits = activeIds.map((id) => {
    const { title, subtitle } =
      PropertyMapper[id as keyof typeof PropertyMapper];
    return { title, subtitle };
  });

  return benefits;
};

// Data for our products (in an ideal case, fetch this from an API)
const PRODUCTS: Product[] = pricingData.plans;

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

// The Checkout Page Component
const CheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState<boolean>(false);

  // Load product details
  useEffect(() => {
    if (productId) {
      const selectedProduct = PRODUCTS.find((p) => p.productType === productId);
      if (selectedProduct) {
        setProduct(selectedProduct);
        // Add a small delay to ensure smooth transition
        const timer = setTimeout(() => {
          setShowLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      } else {
        setError("Product not found");
        setShowLoading(false);
      }
    }
  }, [productId]);

  const toggleBenefitslistDisplay = useCallback(() => {
    setShowFeatures((prev) => !prev);
  }, []);

  // Show loading screen while content is loading
  if (showLoading) {
    return (
      <LoadingOverlay>
        <VideoLoadingScreen videoSrc="/loading.mp4" loop={true} />
      </LoadingOverlay>
    );
  }

  // If product is loading or not found, show appropriate message
  if (!product) {
    return (
      <CheckoutContainer>
        <BackLink onClick={() => router.push("/pricing")}>
          ← Back to pricing
        </BackLink>
        <h1>{error || "Product not found"}</h1>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <Head>
        <title>Checkout - {product.name}</title>
      </Head>

      {/* Load Razorpay script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <CheckoutGrid >
        {/* Product details */}
        <ProductDetailsCard>
          <ProductTitle>{product.name}</ProductTitle>
          <SeeAllBtn onClick={toggleBenefitslistDisplay}>
            <CaretUp style={{ transform: showFeatures ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.3s ease-in-out" }} />
          </SeeAllBtn>
          <BenefitsList>
            {getActiveBenefits(product.id).length > 0
              ? getActiveBenefits(product.id).map((benefit, index) => (
                  <BenefitItem key={index}>
                    <Tick
                      width={isMobile ? 16 : width && width > 1950 ? 29 : 21}
                      height={isMobile ? 10.5 : width && width > 1950 ? 17 : 12}
                    />
                    {benefit.title}
                  </BenefitItem>
                ))
              : null}
          </BenefitsList>
        </ProductDetailsCard>
        {/* {showFeatures ? ( */}
        <MobileBenefitsList data-showfeatures={showFeatures}>
          {getActiveBenefits(product.id).length > 0
            ? getActiveBenefits(product.id).map((benefit, index) => (
                <BenefitItem key={index}>
                  <Tick
                    width={29}
                    height={17}
                    style={{
                      flexShrink: 0,
                    }}
                  />
                  {benefit.title}
                </BenefitItem>
              ))
            : null}
        </MobileBenefitsList>
        {/* ) : null} */}

        {/* Payment form */}
        <PaymentSection>
          <SectionTitle>Complete your purchase</SectionTitle>

          <OrderSummary>
            <SummaryRow>
              <span>Plan</span>
              <span>{product.name}</span>
            </SummaryRow>
            {isMobile ? <Divider pixelpadding={"16px"} /> : <Divider />}
            <SummaryRow>
              <span>Duration</span>
              <span>{product.period}</span>
            </SummaryRow>
            {isMobile ? <Divider pixelpadding={"16px"} /> : <Divider />}
            <SummaryTotal>
              <span>Total</span>
              <span>₹{product.price}</span>
            </SummaryTotal>
          </OrderSummary>
          <CheckoutForm product={product} />
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <TnC />
        </PaymentSection>
      </CheckoutGrid>

      {/* <ThankyouScreen
        title="That's it! You're all set."
        subtitle="You have successfully subscribed"
        descriptionTop="Check your email. Did't receive? Make sure to check your spam
            folder, just in case."
        descriptionBottom="Feel free to contact us at connect@stroda.club. If you have any
            questions"
        ctaGrid={GridType.DOUBLE}
      /> */}
      {/* <FailureScreen /> */}
    </CheckoutContainer>
  );
};

export default CheckoutPage;

// Declare Razorpay as a global type
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: {
          error: {
            code: string;
            description: string;
            source: string;
            step: string;
            reason: string;
            metadata: { order_id: string; payment_id: string };
          };
        }) => void
      ) => void;
    };
  }
}
