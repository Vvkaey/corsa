"use client";

import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../_contexts/AuthContext";
import { useRouter } from "next/navigation";

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
  margin-bottom: 1rem;
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
  padding: 15px 35px;
  border-radius: 8px;
  border: 2px solid #e6e6e6;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: transparent;

  color: #818181;
  font-family: var(--font-fustat);
  font-size: 19.91px;
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
`;

const ErrorMessage = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #f87171;
  border-radius: 0.375rem;
  background-color: #fee2e2;
  color: #b91c1c;
`;

const HelperText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const PrimaryButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 21px;
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
  font-size: 22.754px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#93c5fd" : "#2563eb")};
  }
`;

const SecondaryButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 21px;
  border: none;
  border-radius: 8px;
  border: 2.014px solid #fff;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 22.754px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s, opacity 0.2s;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "white" : "#eff6ff")};
  }
`;

const SuccessMessage = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #10b981;
  border-radius: 0.375rem;
  background-color: #d1fae5;
  color: #065f46;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// Login Form Component
export default function LoginForm() {
  const { requestOTP, verifyOTP, loading, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpRequested, setOtpRequested] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useRouter();
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
      router.push("/");
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

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      {otpRequested && otpSent && !error && !formError && (
        <SuccessMessage>OTP sent successfully to {email}</SuccessMessage>
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
        </form>
      ) : (
        // OTP verification form
        <form onSubmit={handleVerifyOTP}>
          <FormGroup>
            <Label htmlFor="email-display">Email Address</Label>
            <Input type="email" id="email-display" value={email} disabled />
          </FormGroup>

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
            <HelperText>
              {otpSent
                ? "Enter the 6-digit code sent to your email"
                : "Please request a new OTP by clicking 'Resend OTP'"}
            </HelperText>
          </FormGroup>

          <ButtonContainer>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </PrimaryButton>

            <SecondaryButton
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
            >
              Resend OTP
            </SecondaryButton>

            <SecondaryButton
              type="button"
              onClick={() => setOtpRequested(false)}
              disabled={loading}
            >
              Change Email
            </SecondaryButton>
          </ButtonContainer>
        </form>
      )}
    </FormContainer>
  );
}
