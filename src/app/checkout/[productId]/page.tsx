"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import styled from "styled-components";
import Head from "next/head";
import { pricingData } from "@/app/_components/data/productData";


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
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 5vh;
  padding: 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  @media (min-width: 992px) {
    margin-top: 15vh;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductDetailsCard = styled.div`
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const ProductTitle = styled.h1`
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const ProductDescription = styled.p`
  color: #64748b;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const PriceTag = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const Period = styled.span`
  font-size: 1rem;
  color: #64748b;
  margin-left: 0.5rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #334155;
  font-size: 1rem;

  &:before {
    content: "✓";
    color: #10b981;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e2e8f0;
  margin: 1.5rem 0;
`;

const PaymentSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const PayButton = styled.button`
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const OrderSummary = styled.div`
  background-color: #f1f5f9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
`;

const SummaryTotal = styled(SummaryRow)`
  font-weight: 600;
  font-size: 1rem;
  color: #1e293b;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #cbd5e1;
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
  margin-bottom: 1.5rem;
  cursor: pointer;
  text-decoration: none;

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
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [goals, setGoals] = useState<string>("");

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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWFmYWQxYzIzMzIyYzRmNzRkNjJlZSIsImlhdCI6MTc0MzYxOTk2MH0.daBGRJx1QLglK1PauJdCIAKf2PEPzJ3FDH1S7dEFIKs";
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

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
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
        email: email,
        contact: phone,
      },
      notes: {
        product_id: product!.id.toString(),
        product_type: product!.productType,
        goals: goals.substring(0, 100), // Limiting the size for notes
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
      const verifyResponse = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          product_id: product!.id,
          customer_info: {
            name,
            email,
            phone,
            goals,
          },
        }),
      });

      const data = await verifyResponse.json();

      if (data.success) {
        // Redirect to success page
        router.push(`/thank-you?order_id=${response.razorpay_order_id}`);
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
          <ProductDescription>{product.description}</ProductDescription>

          <PriceTag>
            <Price>₹{product.price}</Price>
            <Period>/{product.period}</Period>
          </PriceTag>

          <Divider />

          <SectionTitle>What&apos;s included:</SectionTitle>
          <BenefitsList>
            {product.benefits.map((benefit) => (
              <BenefitItem key={benefit.id}>{benefit.text}</BenefitItem>
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
            <SummaryRow>
              <span>Duration</span>
              <span>{product.period}</span>
            </SummaryRow>
            <SummaryTotal>
              <span>Total</span>
              <span>₹{product.price}</span>
            </SummaryTotal>
          </OrderSummary>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit number"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="goals">
                What do you want to achieve with mentorship?
              </Label>
              <TextArea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Tell us your goals and expectations..."
              />
            </FormGroup>

            <PayButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner /> Processing...
                </>
              ) : (
                `Pay Now - ₹${product.price}`
              )}
            </PayButton>
          </form>
        </PaymentSection>
      </CheckoutGrid>
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
