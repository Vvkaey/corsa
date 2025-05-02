"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import Head from "next/head";
import { pricingData } from "@/app/_components/data/productData";
import { CaretUp, Tick } from "@/app/_assets/icons";
// import Image from "next/image";
// import { useAuth } from "@/app/_contexts/AuthContext";
// import FailureScreen from "@/app/_components/pricing/failure/FailureScreen";
// import ThankyouScreen from "@/app/_components/pricing/success/ThankyouScreen";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { TnC } from "@/app/_components/auth/LoginForm";
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

// Data for our products (in an ideal case, fetch this from an API)
const PRODUCTS: Product[] = pricingData.plans;

// The Checkout Page Component
const CheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState<boolean>(false);


  // Load product details
  useEffect(() => {
    if (productId) {
      const selectedProduct = PRODUCTS.find((p) => p.productType === productId);
      if (selectedProduct) {
        setProduct(selectedProduct);
      } else {
        setError("Product not found");
      }
    }
  }, [productId]);

  const toggleBenefitslistDisplay = useCallback(() => {
    setShowFeatures((prev) => !prev);
  }, []);

  // If product is loading or not found, show appropriate message
  if (!product) {
    return (
      <CheckoutContainer>
        <BackLink onClick={() => router.push("/pricing")}>
          ← Back to pricing
        </BackLink>
        <h1>{error || "Loading product details..."}</h1>
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

      {/* <BackLink onClick={() => router.push("/pricing")}>
        ← Back to pricing
      </BackLink> */}

      <CheckoutGrid>
        {/* Product details */}
        <ProductDetailsCard>
          <ProductTitle>{product.name}</ProductTitle>
          <SeeAllBtn onClick={toggleBenefitslistDisplay}>
            <CaretUp />
          </SeeAllBtn>

          {/* <ProductDescription>{product.description}</ProductDescription> */}

          {/* <PriceTag>
            <Price>₹{product.price}</Price>
            <Period>/{product.period}</Period>
          </PriceTag> */}

          {/* <Divider /> */}

          {/* <SectionTitle>What&apos;s included:</SectionTitle> */}
          <BenefitsList>
            {product.benefits.map((benefit) => (
              <BenefitItem key={benefit.id}>
                <Tick
                  width={isMobile ? 16 : 29}
                  height={isMobile ? 10.5 : 17}
                />
                {benefit.text}
              </BenefitItem>
            ))}
          </BenefitsList>
        </ProductDetailsCard>
        {showFeatures ? (
          <MobileBenefitsList>
            {product.benefits.map((benefit) => (
              <BenefitItem key={benefit.id}>
                <Tick width={29} height={17} />
                {benefit.text}
              </BenefitItem>
            ))}
          </MobileBenefitsList>
        ) : null}

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
          <CheckoutForm
          product ={product}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}



          <TnC />
        </PaymentSection>
      </CheckoutGrid>

      {/* <ThankyouScreen 
      title="That&apos;s it! You&apos;re all set."
      subtitle="You have successfully subscribed"
      descriptionTop="Check your email. Did&apos;t receive? Make sure to check your spam
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
