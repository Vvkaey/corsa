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
import { ErrorText } from "../mentor-application/styled";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_utils/hooks/useAuth";
import { CheckoutPlanProps } from "../data/productData";

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
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  state: Yup.string().required("State is required"),
});

const CheckoutForm = ({ product }: { product: CheckoutPlanProps }) => {
  const [isLoading, setIsLoading] = useState({
    submit: false,
    detailsStored: false,
  });

  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const router = useRouter();

  // Add a function to touch all fields on form submit attempt
  const validateAndTouchFields = (formik: FormikProps<FormValues>) => {
    // Touch all fields to trigger error messages
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

  const { token } = useAuth();

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
        // Now, pass the values to initiatePayment
        initiatePayment(data.orderId, values);
      }
    } catch (err) {
      console.error("Error creating order:", err);
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
        throw new Error(
          data.message ||
            `Error ${verifyResponse.status}: Payment verification failed`
        );
      }

      if (data.success) {
        if (window) {
          // Trigger the mentorship-update event to refresh the context
          window.dispatchEvent(new Event("mentorship-update"));
        }

        // Redirect to success page
        router.push(`/dashboard?order_id=${response.razorpay_order_id}`);
      } else {
        // Handle case where response is 200 but success is false
        // setError(
        //   "Payment verification failed: " + (data.message || "Unknown error")
        // );
        console.log(
          "Payment verification failed: " + (data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      //   setError(`Error verifying payment: ${(err as Error).message}`);
    }
  };

  // Function to initialize Razorpay
  const initiatePayment = (orderIdValue: string, values: FormValues): void => {
    if (typeof window === "undefined" || !window.Razorpay) {
      console.log("Razorpay SDK failed to load");
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
      }
    );
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
        // Make sure this is the correct endpoint
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
        //   <form
        //     onSubmit={handleSubmit}
        //     style={{
        //       display: "flex",
        //       flexWrap: "wrap",
        //       justifyContent: "space-between",
        //     }}
        //   >
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
              <Option value="10th">10th</Option>
              <Option value="11th">11th</Option>
              <Option value="12th">12th</Option>
            </Select>
            <CaretUp className="svg" />
            {formik.touched.board && formik.errors.board && (
              <ErrorText>{formik.errors.board}</ErrorText>
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
              <Option value="CBSE">CBSE</Option>
              <Option value="ICSE">ICSE</Option>
              <Option value="Other">Other</Option>
            </Select>
            <CaretUp className="svg" />
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
              <Option value="Haryana">Haryana</Option>
              <Option value="Uttar Pradesh">Uttar Pradesh</Option>
              <Option value="Karnataka">Karnataka</Option>
              <Option value="Delhi NCR">Delhi NCR</Option>
            </Select>
            <CaretUp className="svg" />
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
            disabled={formik.isSubmitting}
          >
            {isLoading.submit ||
            formik.isSubmitting ||
            isLoading.detailsStored ? (
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
}
