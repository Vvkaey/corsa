"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import styled from "styled-components";
import Head from "next/head";
import { pricingData } from "@/app/_components/data/productData";
import { Tick } from "@/app/_assets/icons";
import Image from "next/image";
import { useAuth } from "@/app/_contexts/AuthContext";
// import FailureScreen from "@/app/_components/pricing/failure/FailureScreen";
import ThankyouScreen from "@/app/_components/pricing/success/ThankyouScreen";
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
  max-width: 1500px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 100vh;
  padding-top: 5rem;
  width: fit-content;
`;

const CheckoutGrid = styled.div`
  display: flex;
  justify-content: center;

  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductDetailsCard = styled.div`
  background-color: #f5f5f5;
  padding: 68px 49px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 2px solid #000;
  width: 579px;
`;

const ProductTitle = styled.h1`
  margin-bottom: 50px;
  padding-left: 15px;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 35.425px;
  font-style: normal;
  font-weight: 700;
  line-height: 44.281px; /* 125% */
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
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 25px 15px;
  border-bottom: 1px solid #c2c2c2;
  gap: 30px;

  &:last-child {
    border-bottom: none;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #cbd5e1;
  margin: 22px 0;
`;

const PaymentSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 68px 49px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid #000;
  width: 579px;
`;

const SectionTitle = styled.h2`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 44.281px; /* 158.147% */
  margin-bottom: 31px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;

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
  padding: 18px 21px;
  transition: border-color 0.2s;

  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 8px;
  border: 2px solid #969696;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 18px 21px;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 8px;
  border: 2px solid #969696;

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
  padding: 24px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 1rem;

  border-radius: 8px;
  background: #ff2626;

  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 23.521px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

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
  border-radius: 8px;
  border: 2px solid #000;
  background: #eef2f7;
  padding: 28px 0;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #646464;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0 40px;
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryTotal = styled(SummaryRow)`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 32px;

  span {
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &:first-child {
      color: #646464;
      leading-trim: both;
      text-edge: cap;
      font-family: var(--font-exo);
      font-size: 26px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
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
        font-size: 22px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
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
`;

// The Checkout Page Component
const CheckoutPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const productId = params.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
      // Call your API to create an order
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productType: product.productType,
          }),
        }
      );

      if (!response.ok) {
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

  // Handle successful payment
  const handlePaymentSuccess = async (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Promise<void> => {
    try {

      // Verify payment on your backend
      const verifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            // product_id: product!.id,
            // customer_info: {
            //   name,
            //   email,
            //   phone,
            //   goals,
            // },
          }),
        }
      );

      const data = await verifyResponse.json();

      if (data.success) {
        // Redirect to success page
        router.push(`/dashboard?order_id=${response.razorpay_order_id}`);
      } else {
        setError("Payment verification failed");
      }
    } catch (err) {
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
                <Tick width={29} height={17} />
                {benefit.text}
              </BenefitItem>
            ))}
          </BenefitsList>
        </ProductDetailsCard>

        {/* Payment form */}
        <PaymentSection>
          <SectionTitle>Complete your purchase</SectionTitle>

          <OrderSummary>
            <SummaryRow>
              <span>Plan</span>
              <span>{product.name}</span>
            </SummaryRow>
            <Divider />
            <SummaryRow>
              <span>Duration</span>
              <span>{product.period}</span>
            </SummaryRow>
            <Divider />
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
                    width={25}
                    height={25}
                  />
                  Pay Now - ₹ {product.price}
                </>
              )}
            </PayButton>
          </form>
        </PaymentSection>
      </CheckoutGrid>
      <ThankyouScreen />
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
