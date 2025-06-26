import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import {
  FormGroup,
  HalfWidthFormGroup,
  Input,
  Label,
  LoadingSpinner,
  Option,
  PayButton,
  Select,
} from "./styled";
import Image from "next/image";

import * as Yup from "yup";
import { CaretUp } from "@/app/_assets/icons";
import {  ErrorText } from "../mentor-application/styled";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/hooks/useAuth";
import { CheckoutPlanProps } from "../data/productData";

const IN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

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

interface FormValues {
  name: string;
  grade: string;
  board: string;
  phone: string;
  state: string;
}

const initialValues: FormValues = {
  name: "",
  grade: "",
  board: "",
  phone: "",
  state: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  grade: Yup.string().required("Grade is required"),
  board: Yup.string().required("Board is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Enter 10 digits"),
  state: Yup.string().required("State is required"),
});

const CheckoutForm = ({ product }: { product: CheckoutPlanProps }) => {
  const [isLoading, setIsLoading] = useState({
    submit: false,
    detailsStored: false,
  });
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const router = useRouter();

  const { token } = useAuth();

  // Cleanup effect to reset payment state on unmount
  useEffect(() => {
    return () => {
      setIsPaymentInProgress(false);
      setIsLoading({ submit: false, detailsStored: false });
    };
  }, []);

  // Check for existing payment success state on mount
  useEffect(() => {
    const recentPaymentSuccess = sessionStorage.getItem('recent-payment-success');
    const paymentTimestamp = sessionStorage.getItem('payment-timestamp');
    
    // If there's a recent payment success, disable the button
    if (recentPaymentSuccess === 'true' && paymentTimestamp) {
      const isRecent = (Date.now() - parseInt(paymentTimestamp)) < 5 * 60 * 1000;
      if (isRecent) {
        setIsPaymentInProgress(true);
      }
    }
  }, []);

  // Function to touch all fields on form submit attempt
  const validateAndTouchFields = (formik: FormikProps<FormValues>) => {
    // Touching all fields to trigger error messages
    Object.keys(formik.values).forEach((field) => {
      formik.setFieldTouched(field, true, false);
    });

    // Then validate the form
    formik.validateForm().then(() => {
      if (Object.keys(formik.errors).length > 0) {
        // Scroll to the first error field
        const firstErrorField = document.getElementById(
          Object.keys(formik.errors)[0]
        );
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          firstErrorField.focus();
        }
      }
    });
  };

  // Function to create order
  const createOrder = async (values: FormValues): Promise<void> => {
    if (!product) return;

    try {
      setIsLoading({ ...isLoading, detailsStored: true });

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
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      if (data.orderId) {
        // Pass the values to initiatePayment
        initiatePayment(data.orderId, values);
      }
    } catch (err) {
      console.error("Error creating order:", err);
      // Reset payment state on order creation failure
      setIsPaymentInProgress(false);
    } finally {
      setIsLoading({ ...isLoading, submit: false });
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Promise<void> => {
    try {
      // Verify payment using your Next.js API route
      const verifyResponse = await fetch("/api/payments/verify", {
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
        // Parse response as JSON (works for both success and error cases)
        data = await verifyResponse.json();
      } catch (parseError) {
        // If JSON parsing fails, response as text instead
        const errorText = await verifyResponse.text();
        console.error("Failed to parse response:", errorText, parseError);
        throw new Error("Invalid response from server: " + errorText);
      }

      if (!verifyResponse.ok) {
        // Handle non-200 responses with the error message from the JSON
        throw new Error(
          data.message ||
            `Error ${verifyResponse.status}: Payment verification failed`
        );
      }

      if (data.success) {
        console.log("Payment verification successful, triggering mentorship update");
        
        // Trigger the mentorship-update event to refresh the context
        // This will be handled by ThankyouScreen with a delay to ensure backend processing
        if (window) {
          window.dispatchEvent(new Event("mentorship-update"));
        }

        // Dispatch custom event to immediately show ThankyouScreen
        if (window) {
          window.dispatchEvent(new Event("payment-success"));
          // Also set sessionStorage flag for page reload scenarios
          sessionStorage.setItem('recent-payment-success', 'true');
          sessionStorage.setItem('payment-timestamp', Date.now().toString());
        }

        // Keep button disabled as ThankyouScreen will be shown
        // Don't reset isPaymentInProgress here

        // Redirect back to checkout page with payment success parameters
        const currentUrl = window.location.pathname;
        const successUrl = `${currentUrl}?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`;
        router.push(successUrl);
      } else {
        // Handle case where response is 200 but success is false
        console.log(
          "Payment verification failed: " + (data.message || "Unknown error")
        );
        // Reset payment state on verification failure
        setIsPaymentInProgress(false);
        setIsLoading({ submit: false, detailsStored: false });
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      // Reset payment state on error
      setIsPaymentInProgress(false);
      setIsLoading({ submit: false, detailsStored: false });
      //   setError(`Error verifying payment: ${(err as Error).message}`);
    }
  };

  // Function to initialize Razorpay
  const initiatePayment = (orderIdValue: string, values: FormValues): void => {
    if (typeof window === "undefined" || !window.Razorpay) {
      console.log("Razorpay SDK failed to load");
      return;
    }

    // Set payment in progress when popup opens
    setIsPaymentInProgress(true);

    // Creating options for Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      amount: product!.price * 100,
      currency: "INR",
      name: product!.name,
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
        name: values.name,
        contact: values.phone,
      },
      notes: {
        product_id: product!.id.toString(),
        product_type: product!.productType,
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
        console.log(`Payment failed: ${response.error.description}`);
        // Reset payment in progress state on failure
        setIsPaymentInProgress(false);
        setIsLoading({ submit: false, detailsStored: false });
      }
    );

    // Listen for popup close event
    razorpayInstance.on("close", function() {
      // Reset payment in progress state when popup is closed
      setIsPaymentInProgress(false);
      setIsLoading({ submit: false, detailsStored: false });
    });
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const { setSubmitting } = formikHelpers;

    try {
      // Step 1: Validate form
      setIsLoading({ ...isLoading, submit: true });
      console.log("Form values:", values);

      // Step 2: Store user data
      const menteeData = {
        fullName: values.name,
        class: values.grade,
        board: values.board,
        phoneNumber: values.phone,
        state: values.state,
      };

      const token = localStorage.getItem("authToken") || "";

      const response = await fetch("/api/user/details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(menteeData),
      });

      if (!response.ok) {
        throw new Error("Failed to store user data");
      }

      const data = await response.json();
      console.log("User data stored successfully:", data);

      // Step 3: Only after successful data storage, create the order
      await createOrder(values);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading({ submit: false, detailsStored: false });
      setIsPaymentInProgress(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount={true} // This will validate when the form mounts
      validateOnChange={true} // This will validate on every change
    >
      {(formik) => (
        <Form
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
              name="name"
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Full Name"
            />
            {formik.touched.name && formik.errors.name && (
              <ErrorText>{formik.errors.name}</ErrorText>
            )}
          </FormGroup>
          <HalfWidthFormGroup>
            <Label htmlFor="name">Class/Grade</Label>
            <Select
              id="grade"
              name="grade"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.grade}
              required
            >
              <option
                value=""
                disabled
               
              >
                Class/Grade
              </option>
              <Option value="9">Class 9</Option>
              <Option value="10">Class 10</Option>
              <Option value="11">Class 11</Option>
              <Option value="12">Class 12</Option>
              <Option value="Passout">Passout</Option>
            </Select>
            <CaretUp
              className="svg"
              width={(width ?? 0) > 1950 ? 15 : 12}
              height={(width ?? 0) > 1950 ? 11 : 8}
            />
            {formik.touched.grade && formik.errors.grade && (
              <ErrorText>{formik.errors.grade}</ErrorText>
            )}
          </HalfWidthFormGroup>
          <HalfWidthFormGroup>
            <Label htmlFor="board">Class/Grade</Label>
            <Select
              id="board"
              name="board"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.board}
              required
            >
               <option
                value=""
                disabled
               
              >
                Board
              </option>
              <Option value="CBSE">CBSE</Option>
              <Option value="ICSE">ICSE</Option>
              <Option value="Other">State Board</Option>
            </Select>
            <CaretUp
              className="svg"
              width={(width ?? 0) > 1950 ? 15 : 12}
              height={(width ?? 0) > 1950 ? 11 : 8}
            />
            {formik.touched.board && formik.errors.board && (
              <ErrorText>{formik.errors.board}</ErrorText>
            )}
          </HalfWidthFormGroup>
          <HalfWidthFormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Phone Number"
            />
            {formik.touched.phone && formik.errors.phone && (
              <ErrorText>{formik.errors.phone}</ErrorText>
            )}
          </HalfWidthFormGroup>

          <HalfWidthFormGroup>
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              name="state"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.state}
              required
            >
               <option
                value=""
                disabled
               
              >
                State
              </option>
              {IN_STATES.map((state) => (
                <Option key={state} value={state}>
                  {state}
                </Option>
              ))}
            </Select>
            <CaretUp
              className="svg"
              width={(width ?? 0) > 1950 ? 15 : 12}
              height={(width ?? 0) > 1950 ? 11 : 8}
            />
            {formik.touched.state && formik.errors.state && (
              <ErrorText>{formik.errors.state}</ErrorText>
            )}
          </HalfWidthFormGroup>

          <PayButton
            type="submit"
            onClick={() => {
              if (Object.keys(formik.errors).length > 0) {
                validateAndTouchFields(formik);
              }
            }}
            disabled={formik.isSubmitting || isPaymentInProgress}
          >
            {isLoading.submit ||
            formik.isSubmitting ||
            isLoading.detailsStored ||
            isPaymentInProgress ? (
              <>
                <LoadingSpinner /> Processing...
              </>
            ) : (
              <>
                <div
                  className="pay-img-container"
                  style={{
                    width: isMobile ? 18.72 : 24.48,
                    height: isMobile ? 18.46 : 24.14,
                    position: "relative",
                  }}
                >
                  <Image src="/paybtnL.png" alt="pay-bg" fill />
                </div>
                Pay Now - ₹ {product.price}
              </>
            )}
          </PayButton>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;

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
  
  interface WindowEventMap {
    'payment-success': Event;
  }
}
