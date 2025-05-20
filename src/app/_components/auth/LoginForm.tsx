"use client";

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Add useSearchParams
import { useAuth } from "../../_contexts/AuthContext";
import Link from "next/link";
import styled from "styled-components";

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  // max-width: 400px;
  margin: 0 auto;
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// const FormTitle = styled.h2`
//   text-align: center;
//   font-size: 1.5rem;
//   font-weight: 700;
//   margin-bottom: 1.5rem;
//   color: #333;
// `;

const FormGroup = styled.div`
  margin-bottom: 12px;

  @media (min-width: 992px) {
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4b5563;
  position: absolute;
  visibility: hidden;
`;

const Input = styled.input<{ disabled?: boolean }>`
  width: 100%;
  padding: 11px 19px;
  border-radius: 8px;
  border: 2px solid #e6e6e6;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: transparent;

  color: rgb(244, 239, 239);
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:selected {
    background-color: transparent;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-color: transparent;
  }

  &:focus,
  &:active {
    border-color: #818181;
    background-color: transparent;
  }

  @media (min-width: 992px) {
    padding: 12px 26px;
    font-size: 16px;
  }

  @media (min-width: 1950px) {
    padding: 15px 35px;
    font-size: 19.91px;
  }
`;

// const ErrorMessage = styled.div`
//   padding: 0.75rem 1rem;
//   margin-bottom: 1rem;
//   border: 1px solid #f87171;
//   border-radius: 0.375rem;
//   background-color: #fee2e2;
//   color: #b91c1c;
// `;

// const HelperText = styled.p`
//   font-size: 0.875rem;
//   color: #6b7280;
//   margin-top: 0.25rem;
// `;

const PrimaryButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 11px 19px;
  border: none;
  border-radius: 8px;
  border: 2.014px solid #fff;
  background: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#93c5fd" : "#2563eb")};
  }

  @media (min-width: 992px) {
    padding: 11px;
    font-size: 16px;
  }

  @media (min-width: 1950px) {
    padding: 19px;
    font-size: 22.754px;
  }
`;

// const SecondaryButton = styled.button<{ disabled?: boolean }>`
//   width: 100%;
//   padding: 11px 19px;
//   border: none;
//   border-radius: 8px;
//   border: 2.014px solid #fff;
//   color: #000;
//   leading-trim: both;
//   text-edge: cap;
//   font-family: var(--font-fustat);
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
//   transition: background-color 0.2s, opacity 0.2s;
//   opacity: ${(props) => (props.disabled ? "0.5" : "1")};

//   &:hover {
//     background-color: ${(props) => (props.disabled ? "white" : "#eff6ff")};
//   }

//   @media (min-width: 992px) {
//     padding: 11px;
//     font-size: 16px;
//   }

//   @media (min-width: 1950px) {
//     padding: 19px;
//     font-size: 22.754px;
//   }
// `;

const FlatButton = styled.button`
  margin-bottom: 9px;
  color: #c4c4c4;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Fustat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
  background: transparent;
  width: 100%;

  @media (min-width: 992px) {
    font-size: 16px;
  }

  @media (min-width: 1950px) {
    font-size: 20px;
  }

  &:hover {
    color: #eff6ff;
  }
`;

const SuccessMessage = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  color: #c4c4c4;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Fustat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (min-width: 992px) {
    font-size: 16px;
  }

  @media (min-width: 1950px) {
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TncContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TncText = styled.p`
  color: #858585;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 10px auto;

  a {
    text-decoration: underline;
  }

  @media (min-width: 992px) {
    font-size: 12.8px;
  }

  @media (min-width: 1500px) {
    font-size: 15.8px;
  }
`;

export const TnC = () => {
  return (
    <TncContainer>
      <TncText>
        By continuing, you agree to our{" "}
        <Link href="/terms-and-conditions" target="_blank">
          Terms of Service
        </Link>
      </TncText>
    </TncContainer>
  );
};
// Login Form Component
export default function LoginForm({
  setIsOTPRequested,
}: {
  setIsOTPRequested: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { requestOTP, verifyOTP, loading, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpRequested, setOtpRequested] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the redirect path from URL parameters if it exists
  const redirectPath = searchParams.get("redirect") || "/";

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormError(null);
  };

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
    setFormError(null);
  };

  // Handle request OTP submission
  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }

    // Send OTP request
    const success = await requestOTP(email);
    if (success) {
      setOtpRequested(true);
      setIsOTPRequested(true);
      setOtpSent(true);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate OTP
    if (!otp || otp.length < 6) {
      setFormError("Please enter a valid 6-digit OTP");
      return;
    }

    const verified = await verifyOTP(email, otp);
    if (verified) {
      // router.push("/");
      // Redirect to the path stored in the redirectPath variable
      router.push(redirectPath);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (loading) return;

    setFormError(null);
    const success = await requestOTP(email);
    if (success) {
      setOtpSent(true);
    }
  };

  return (
    <FormContainer>
      {/* <FormTitle>
        {otpRequested ? "Verify OTP" : "Login to Your Account"}
      </FormTitle> */}

      {/* {error && <ErrorMessage>{error}</ErrorMessage>}
      {formError && <ErrorMessage>{formError}</ErrorMessage>} */}
      {otpRequested && otpSent && !error && !formError && (
        <SuccessMessage>
          We sent a temporary login code to {email}
        </SuccessMessage>
      )}

      {otpRequested && otpSent && !error && !formError && (
        <FlatButton type="button" onClick={handleResendOTP} disabled={loading}>
          Resend Login code
        </FlatButton>
      )}

      {!otpRequested ? (
        // Email form
        <form onSubmit={handleRequestOTP}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email address"
              disabled={loading}
              required
            />
          </FormGroup>

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Continue"}
          </PrimaryButton>
          <TncContainer>
            <TncText>
              By continuing, you agree to our{" "}
              <Link href="/terms-and-conditions" target="_blank">
                Terms of Service
              </Link>
            </TncText>
          </TncContainer>
        </form>
      ) : (
        // OTP verification form
        <form onSubmit={handleVerifyOTP}>
          {/* <FormGroup>
            <Label htmlFor="email-display">Email Address</Label>
            <Input type="email" id="email-display" value={email} disabled />
          </FormGroup> */}

          <FormGroup>
            <Label htmlFor="otp">OTP</Label>
            <Input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit OTP"
              disabled={loading}
              maxLength={6}
              required
            />
            {/* <HelperText>
              {otpSent
                ? "Enter the 6-digit code sent to your email"
                : "Please request a new OTP by clicking 'Resend OTP'"}
            </HelperText> */}
          </FormGroup>

          <ButtonContainer>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </PrimaryButton>

            {/* <SecondaryButton
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
            >
              Resend OTP
            </SecondaryButton> */}

            {/* <SecondaryButton
              type="button"
              onClick={() => setOtpRequested(false)}
              disabled={loading}
            >
              Change Email
            </SecondaryButton> */}
            <TncContainer>
              <TncText>
                By continuing, you agree to our{" "}
                <Link href="/terms-and-conditions" target="_blank">
                  Terms of Service
                </Link>
              </TncText>
            </TncContainer>
          </ButtonContainer>
        </form>
      )}
    </FormContainer>
  );
}
