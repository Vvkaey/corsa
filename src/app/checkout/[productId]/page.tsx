"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import styled from "styled-components";
import Head from "next/head";
import { pricingData } from "@/app/_components/data/productData";
import { CaretUp, Tick } from "@/app/_assets/icons";
import Image from "next/image";
import { useAuth } from "@/app/_contexts/AuthContext";
// import FailureScreen from "@/app/_components/pricing/failure/FailureScreen";
// import ThankyouScreen from "@/app/_components/pricing/success/ThankyouScreen";
import {
  headerSpacing,
  maxWidthContainer,
  sectionResponsivePadding,
} from "@/app/_components/new_mixins/mixins";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { TnC } from "@/app/_components/auth/LoginForm";
// import FailureScreen from "@/app/_components/pricing/failure/FailureScreen";
// import ThankyouScreen from "@/app/_components/pricing/success/ThankyouScreen";

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

// Mock data for our products (in an ideal case, fetch this from an API)
const PRODUCTS: Product[] = pricingData.plans;

// Styled Components
const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // max-width: 1500px;
  position: relative;
  margin: 0 auto;
  width: fit-content;
  ${maxWidthContainer};
  ${headerSpacing()};
  ${sectionResponsivePadding()};

  @media (max-width: 992px) {
    margin-top: 40px;
  }

  @media (min-width: 992px) {
    padding-top: 5rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
  }
`;

const CheckoutGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    flex-direction: column;
    margin-top: 90px;
  }
`;

const ProductDetailsCard = styled.div`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 0.5px solid #000;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 47px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;

  @media (min-width: 992px) {
    display: unset;
    border-radius: 8px;
    border: 2px solid #000;
    margin-top: unset;
    position: unset;
    width: 579px;
    padding: 68px 49px;
  }
`;

const ProductTitle = styled.h1`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 22px;
  line-height: 34.7px; /* 125% */
  font-style: normal;
  font-weight: 600;
  padding: 16px 0;

  @media (min-width: 992px) {
    margin-bottom: 50px;
    padding: unset;
    padding-left: 15px;
    font-weight: 700;
    font-size: 35.425px;
    line-height: 44.281px; /* 125% */
  }
`;

const SeeAllBtn = styled.button`
  border: none;
  background: transparent;
  display: flex;

  svg {
    transform: rotate(180deg);
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

// const ProductDescription = styled.p`
//   color: #64748b;
//   margin-bottom: 1.5rem;
//   font-size: 1rem;
// `;

// const PriceTag = styled.div`
//   display: flex;
//   align-items: baseline;
//   margin-bottom: 1.5rem;
// `;

// const Price = styled.span`
//   font-size: 2rem;
//   font-weight: 700;
//   color: #1e293b;
// `;

// const Period = styled.span`
//   font-size: 1rem;
//   color: #64748b;
//   margin-left: 0.5rem;
// `;

const BenefitsList = styled.ul`
  display: none;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;

  @media (min-width: 992px) {
    display: flex;
  }
`;

const MobileBenefitsList = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #f5f5f5;
  list-style: none;
  padding: 12px 30px 32px;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 15px 25px;
  border-bottom: 1px solid #c2c2c2;
  gap: 30px;

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 992px) {
    font-size: 25px;
    padding: 25px 15px;
  }
`;

const Divider = styled.hr<{ pixelpadding?: string }>`
  border: 0;
  height: 1px;
  background-color: #cbd5e1;
  margin: ${({ pixelpadding }) =>
    pixelpadding ? `${pixelpadding} 0` : "22px 0"};
`;

const PaymentSection = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #000;
  padding: 23px 9px 35px;
  margin-bottom: 110px;

  @media (min-width: 992px) {
    border: 2px solid #000;
    margin-bottom: unset;
    width: 579px;
    padding: 68px 49px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h2`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 17.2px;
  font-style: normal;
  font-weight: 700;
  line-height: 27.2px; /* 158.147% */
  margin-bottom: 23px;
  text-align: center;

  @media (min-width: 992px) {
    text-align: unset;
    font-size: 28px;
    line-height: 44.281px; /* 158.147% */
    margin-bottom: 31px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 9px;

  @media (min-width: 992px) {
    margin-bottom: 1.25rem;
  }

  &:first-child {
    width: 100%;
  }
`;
const HalfWidthFormGroup = styled(FormGroup)`
  width: 49%;
  display: inline-block;
`;

const Label = styled.label`
  position: absolute;
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  visibility: hidden;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  transition: border-color 0.2s;

  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 5px;
  border: 1px solid #000;

  @media (min-width: 992px) {
    padding: 18px 21px;
    font-size: 20px;
    border-radius: 8px;
    border: 2px solid #969696;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  transition: border-color 0.2s;
  appearance: none; /* Hides default arrow */
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox */
  background-image: url("/chevron-down.png"); /* Custom arrow image */
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 14px;

  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 5px;
  border: 1px solid #000;

  @media (min-width: 992px) {
    padding: 18px 21px;
    font-size: 20px;
    border-radius: 8px;
    border: 2px solid #969696;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Option = styled.option`
  color: #000;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid #cbd5e1;
//   border-radius: 6px;
//   font-size: 1rem;
//   min-height: 100px;
//   resize: vertical;
//   transition: border-color 0.2s;

//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
// `;

const PayButton = styled.button`
  position: relative;
  color: white;
  padding: 13px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 26px;

  border-radius: 5px;
  background: #ff2626;

  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14.5px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media (min-width: 992px) {
    padding: 24px;
    font-size: 23.521px;
    border-radius: 8px;
    margin-top: 1rem;
  }

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #000;
  background: #f5f5f5;
  padding: 24px 0 14px;
  margin-bottom: 36px;

  @media (min-width: 992px) {
    padding: 28px 0;
    background: #eef2f7;
    border: 2px solid #000;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #646464;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 16.95px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0 28px 0 22px;

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 992px) {
    font-size: 26px;
    padding: 0 40px;
  }
`;

const SummaryTotal = styled(SummaryRow)`
  padding-top: 2px;
  padding-bottom: 18px;

  @media (min-width: 992px) {
    padding-bottom: 32px;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }

  span {
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 20.725px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media (min-width: 992px) {
      font-size: 32px;
    }

    &:first-child {
      color: #646464;
      leading-trim: both;
      text-edge: cap;
      font-family: var(--font-exo);
      font-size: 16.8px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      @media (min-width: 992px) {
        font-size: 26px;
      }
    }

    &:last-child {
      position: relative;
      &:after {
        position: absolute;
        top: 100%;
        left: -25%;
        white-space: nowrap;
        content: " Including GST";
        color: #646464;
        leading-trim: both;
        text-edge: cap;
        font-family: var(--font-exo);
        font-size: 14.2px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        @media (min-width: 992px) {
          font-size: 22px;
        }
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background-color: #fee2e2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const BackLink = styled.a`
  display: inline-block;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  text-decoration: none;
  font-family: var(--font-fustat);
  width: 100%;
  &:hover {
    color: #1e293b;
    text-decoration: underline;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

// The Checkout Page Component
const CheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showFeatures, setShowFeatures] = useState<boolean>(false);
  // Removed unused orderId state

  // Form state
  const [name, setName] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [board, setBoard] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [state, setState] = useState<string>("");

  const { token } = useAuth();

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

  // Function to create order
  const createOrder = async (): Promise<void> => {
    if (!product) return;

    setLoading(true);
    setError(null);

    try {
      // Call your Next.js API route instead of external API directly
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productType: product.productType,
        }),
      });

      if (!response.ok) {
        // For 500 errors, try to get more details
        if (response.status === 500) {
          const errorText = await response.text();
          console.error("Server error details:", errorText);
          throw new Error("Server error: " + errorText);
        }

        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const data = await response.json();

      if (data.orderId) {
        initiatePayment(data.orderId);
      } else {
        throw new Error(data.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // Create the order
    createOrder();
  };

  // Function to initialize Razorpay
  const initiatePayment = (orderIdValue: string): void => {
    if (typeof window === "undefined" || !window.Razorpay) {
      setError("Razorpay SDK failed to load");
      return;
    }

    // Create options for Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount: product!.price * 100,
      currency: "INR",
      name: "Mentorship Platform",
      description: `${product!.name} Subscription`,
      order_id: orderIdValue,
      handler: function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: name,
        contact: phone,
      },
      notes: {
        product_id: product!.id.toString(),
        product_type: product!.productType,
        // goals: goals.substring(0, 100), // Limiting the size for notes
      },
      theme: {
        color: "#3b82f6",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

    razorpayInstance.on(
      "payment.failed",
      function (response: {
        error: {
          code: string;
          description: string;
          source: string;
          step: string;
          reason: string;
          metadata: { order_id: string; payment_id: string };
        };
      }) {
        setError(`Payment failed: ${response.error.description}`);
      }
    );
  };

  const toggleBenefitslistDisplay = useCallback(() => {
    setShowFeatures((prev) => !prev);
  }, []);

  // Handle successful payment
// Handle successful payment
const handlePaymentSuccess = async (response: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}): Promise<void> => {
  try {
    // Verify payment using your Next.js API route
    const verifyResponse = await fetch('/api/payments/verify', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
      }),
    });

    let data;
    try {
      // Try to parse response as JSON (works for both success and error cases)
      data = await verifyResponse.json();
    } catch (parseError) {
      // If JSON parsing fails, get the response as text instead
      const errorText = await verifyResponse.text();
      console.error("Failed to parse response:", errorText, parseError);
      throw new Error("Invalid response from server: " + errorText);
    }

    if (!verifyResponse.ok) {
      // Handle non-200 responses with the error message from the JSON
      throw new Error(data.message || `Error ${verifyResponse.status}: Payment verification failed`);
    }

    if (data.success) {
      // Redirect to success page
      router.push(`/dashboard?order_id=${response.razorpay_order_id}`);
    } else {
      // Handle case where response is 200 but success is false
      setError("Payment verification failed: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    setError(`Error verifying payment: ${(err as Error).message}`);
  }
};

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

      <BackLink onClick={() => router.push("/pricing")}>
        ← Back to pricing
      </BackLink>

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

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </FormGroup>
            <HalfWidthFormGroup>
              <Label htmlFor="name">Class/Grade</Label>
              <Select
                id="class"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              >
                <Option value="10th">10th</Option>
                <Option value="11th">11th</Option>
                <Option value="12th">12th</Option>
              </Select>
            </HalfWidthFormGroup>
            <HalfWidthFormGroup>
              <Label htmlFor="board">Class/Grade</Label>
              <Select
                id="board"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                required
              >
                <Option value="CBSE">CBSE</Option>
                <Option value="ICSE">ICSE</Option>
                <Option value="Other">Other</Option>
              </Select>
            </HalfWidthFormGroup>

            {/* <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </FormGroup> */}

            <HalfWidthFormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
              />
            </HalfWidthFormGroup>

            <HalfWidthFormGroup>
              <Label htmlFor="state">State</Label>
              <Select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <Option value="Haryana">Haryana</Option>
                <Option value="Uttar Pradesh">Uttar Pradesh</Option>
                <Option value="Karnataka">Karnataka</Option>
                <Option value="Delhi NCR">Delhi NCR</Option>
              </Select>
            </HalfWidthFormGroup>

            <PayButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner /> Processing...
                </>
              ) : (
                <>
                  <Image
                    src="/paybtn.svg"
                    alt="pay-bg"
                    width={isMobile ? 15 : 25}
                    height={isMobile ? 15 : 25}
                  />
                  Pay Now - ₹ {product.price}
                </>
              )}
            </PayButton>
          </form>
          <TnC />
        </PaymentSection>
      </CheckoutGrid>

      {/* <ThankyouScreen /> */}
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
