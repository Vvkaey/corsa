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

// import ThankyouScreen, { GridType } from "@/app/_components/pricing/success/ThankyouScreen";
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
  // Removed unused orderId state

  // Form state
  // const [name, setName] = useState<string>("");
  // const [grade, setGrade] = useState<string>("");
  // const [board, setBoard] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");
  // const [state, setState] = useState<string>("");

  // const { token } = useAuth();

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
  // const createOrder = async (): Promise<void> => {
  //   if (!product) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // Call your Next.js API route instead of external API directly
  //     const response = await fetch("/api/payments/create-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         productType: product.productType,
  //       }),
  //     });

  //     if (!response.ok) {
  //       // For 500 errors, try to get more details
  //       if (response.status === 500) {
  //         const errorText = await response.text();
  //         console.error("Server error details:", errorText);
  //         throw new Error("Server error: " + errorText);
  //       }

  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to create order");
  //     }

  //     const data = await response.json();

  //     if (data.orderId) {
  //       initiatePayment(data.orderId);
  //     } else {
  //       throw new Error(data.message || "Failed to create order");
  //     }
  //   } catch (err) {
  //     console.error("Error creating order:", err);
  //     setError((err as Error).message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Function to handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (!name.trim()) {
  //     setError("Please enter your name");
  //     return;
  //   }

  //   if (!phone.trim() || !/^\d{10}$/.test(phone)) {
  //     setError("Please enter a valid 10-digit phone number");
  //     return;
  //   }

  //   // Create the order
  //   createOrder();
  // };

  // Function to initialize Razorpay
  // const initiatePayment = (orderIdValue: string): void => {
  //   if (typeof window === "undefined" || !window.Razorpay) {
  //     setError("Razorpay SDK failed to load");
  //     return;
  //   }

  //   // Create options for Razorpay
  //   const options = {
  //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  //     amount: product!.price * 100,
  //     currency: "INR",
  //     name: "Mentorship Platform",
  //     description: `${product!.name} Subscription`,
  //     order_id: orderIdValue,
  //     handler: function (response: {
  //       razorpay_payment_id: string;
  //       razorpay_order_id: string;
  //       razorpay_signature: string;
  //     }) {
  //       handlePaymentSuccess(response);
  //     },
  //     prefill: {
  //       name: name,
  //       contact: phone,
  //     },
  //     notes: {
  //       product_id: product!.id.toString(),
  //       product_type: product!.productType,
  //       // goals: goals.substring(0, 100), // Limiting the size for notes
  //     },
  //     theme: {
  //       color: "#3b82f6",
  //     },
  //   };

  //   const razorpayInstance = new window.Razorpay(options);
  //   razorpayInstance.open();

  //   razorpayInstance.on(
  //     "payment.failed",
  //     function (response: {
  //       error: {
  //         code: string;
  //         description: string;
  //         source: string;
  //         step: string;
  //         reason: string;
  //         metadata: { order_id: string; payment_id: string };
  //       };
  //     }) {
  //       setError(`Payment failed: ${response.error.description}`);
  //     }
  //   );
  // };

  const toggleBenefitslistDisplay = useCallback(() => {
    setShowFeatures((prev) => !prev);
  }, []);

  // Handle successful payment
  // Handle successful payment
  // const handlePaymentSuccess = async (response: {
  //   razorpay_payment_id: string;
  //   razorpay_order_id: string;
  //   razorpay_signature: string;
  // }): Promise<void> => {
  //   try {
  //     // Verify payment using your Next.js API route
  //     const verifyResponse = await fetch("/api/payments/verify", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         paymentId: response.razorpay_payment_id,
  //         orderId: response.razorpay_order_id,
  //         signature: response.razorpay_signature,
  //       }),
  //     });

  //     let data;
  //     try {
  //       // Try to parse response as JSON (works for both success and error cases)
  //       data = await verifyResponse.json();
  //     } catch (parseError) {
  //       // If JSON parsing fails, get the response as text instead
  //       const errorText = await verifyResponse.text();
  //       console.error("Failed to parse response:", errorText, parseError);
  //       throw new Error("Invalid response from server: " + errorText);
  //     }

  //     if (!verifyResponse.ok) {
  //       // Handle non-200 responses with the error message from the JSON
  //       throw new Error(
  //         data.message ||
  //           `Error ${verifyResponse.status}: Payment verification failed`
  //       );
  //     }

  //     if (data.success) {
  //       if (window) {
  //         // Trigger the mentorship-update event to refresh the context
  //         window.dispatchEvent(new Event("mentorship-update"));
  //       }

  //       // Redirect to success page
  //       router.push(`/dashboard?order_id=${response.razorpay_order_id}`);
  //     } else {
  //       // Handle case where response is 200 but success is false
  //       setError(
  //         "Payment verification failed: " + (data.message || "Unknown error")
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Error verifying payment:", err);
  //     setError(`Error verifying payment: ${(err as Error).message}`);
  //   }
  // };

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
