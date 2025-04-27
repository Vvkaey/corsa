import {
  ApplicationForm,
  ErrorText,
  FormGroup,
  Input,
  InputGroup,
  Label,
  MentorApplicationContainer,
  OtpButton,
  Select,
  StatusMessage,
  SubmitButton,
} from "./styled";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import TitleSubtitle from "./TitleSubtitle";
import { useState } from "react";
import * as Yup from "yup";
import { CaretUp } from "@/app/_assets/icons";
import ThankyouScreen, { GridType } from "../pricing/success/ThankyouScreen";
import FailureScreen from "../pricing/failure/FailureScreen";

// Interface for form values
interface FormValues {
  fullName: string;
  email: string;
  otp: string;
  phone: string;
  linkedin: string;
  college: string;
  currentlyWorking: string;
  currentCompany: string;
  currentCity: string;
  mentoringExperience: string;
  mentoringSessions: string;
  mentoringApproach: string;
}

const MentorApplication = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    type: "info" as "success" | "error" | "info",
  });
  const [isLoading, setIsLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    submit: false,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  // Form validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    otp: Yup.string(),
    phone: Yup.string().required("Phone number is required"),
    linkedin: Yup.string().required("LinkedIn profile is required"),
    college: Yup.string().required("College name is required"),
    currentlyWorking: Yup.string().required(
      "Please select if you're currently working"
    ),
    currentCompany: Yup.string().when("currentlyWorking", {
      is: (val: string) => val === "yes",
      then: (schema) => schema.required("Current company is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    currentCity: Yup.string().required("Current city is required"),
    mentoringExperience: Yup.string().required(
      "Mentoring experience is required"
    ),
    mentoringSessions: Yup.string().required("Mentoring sessions are required"),
    mentoringApproach: Yup.string().required("Mentoring approach is required"),
  });

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    otp: "",
    phone: "",
    linkedin: "",
    college: "",
    currentlyWorking: "",
    currentCompany: "",
    currentCity: "",
    mentoringExperience: "",
    mentoringSessions: "",
    mentoringApproach: "",
  };

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    console.log("Form submitting:", values);
    const { setSubmitting, validateForm } = formikHelpers;

    // Check if email is verified before submitting the form
    if (!emailVerified) {
      setMessage({ text: "Please verify your email first", type: "error" });
      setSubmitting?.(false);
      return;
    }

    // If there are any errors, don't proceed with submission
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      setSubmitting?.(false);
      return;
    }

    try {
      setIsLoading({ ...isLoading, submit: true });
      console.log("Form values:", values);

      // Format the data to match the expected API format
      const mentorData = {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        linkedin_profile: values.linkedin,
        college_name: values.college,
        currently_working: values.currentlyWorking === "yes",
        current_company: values.currentCompany,
        current_city: values.currentCity,
        mentoring_experience: values.mentoringExperience,
        mentoring_sessions: values.mentoringSessions,
        mentoring_approach: values.mentoringApproach,
      };

      // Get the token from localStorage if available
      const token = localStorage.getItem("authToken") || "";

      // Call the Next.js API route
      const response = await fetch("/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(mentorData),
      });

      const data = await response.json();

      if (response.ok && response.status === 201) {
        setMessage({
          text: "Application submitted successfully!",
          type: "success",
        });
        setShowSuccessModal(true);
        localStorage.removeItem("authToken");
        // Optional: Redirect to a success page
        // window.location.href = '/mentor-application-success';
      } else {
        setMessage({
          text:
            data.message || "Failed to submit application. Please try again.",
          type: "error",
        });
        setShowFailureModal(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({
        text: "An error occurred while submitting your application. Please try again.",
        type: "error",
      });
      setShowFailureModal(true);
    } finally {
      setIsLoading({ ...isLoading, submit: false });
      setSubmitting?.(false);
    }
  };

  // Function to send OTP
  const sendOtp = async (email: string) => {
    if (!email) {
      setMessage({ text: "Please enter an email address", type: "error" });
      return;
    }

    try {
      setIsLoading({ ...isLoading, sendOtp: true });
      setMessage({ text: "Sending OTP...", type: "info" });

      // Calling Next.js API route, which will forward to the actual backend
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        setMessage({
          text: "OTP sent successfully! Check your email",
          type: "success",
        });
      } else {
        setMessage({
          text: data.message || "Failed to send OTP",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage({
        text: "Failed to send OTP. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading({ ...isLoading, sendOtp: false });
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    if (!otp) {
      setMessage({ text: "Please enter the OTP", type: "error" });
      return;
    }

    try {
      setIsLoading({ ...isLoading, verifyOtp: true });
      setMessage({ text: "Verifying OTP...", type: "info" });

      // Calling Next.js API route, which will forward to the actual backend
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.success) {
        setEmailVerified(true);
        setMessage({ text: "Email verified successfully!", type: "success" });
        localStorage.setItem("authToken", data.data.token);
      } else {
        setMessage({ text: data.message || "Invalid OTP", type: "error" });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage({
        text: "Failed to verify OTP. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading({ ...isLoading, verifyOtp: false });
    }
  };

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

  return (
    <MentorApplicationContainer>
      {showSuccessModal ? (
        <ThankyouScreen
          title="Thanks for stepping up!"
          subtitle="We're elated to have you interested"
          descriptionTop="We'll get back to you shortly after going through the details."
          descriptionBottom="Feel free to contact us at connect@stroda.club If you have any questions"
          ctaGrid={GridType.SOLO}
        />
      ) : null}
      {showFailureModal ? <FailureScreen /> : null}
      <TitleSubtitle />{" "}
      <ApplicationForm>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount={true} // This will validate when the form mounts
          validateOnChange={true} // This will validate on every change
        >
          {(formik) => (
            <Form>
              <FormGroup>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  placeholder="Full Name"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <ErrorText>{formik.errors.fullName}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      // Reset verification when email changes
                      if (formik.values.email !== e.target.value) {
                        setOtpSent(false);
                        setEmailVerified(false);
                      }
                      formik.handleChange(e);
                    }}
                    value={formik.values.email}
                    placeholder="Email"
                    disabled={emailVerified} // Disable when verified
                  />
                  <OtpButton
                    type="button"
                    onClick={() => sendOtp(formik.values.email)}
                    disabled={
                      isLoading.sendOtp ||
                      emailVerified ||
                      !formik.values.email ||
                      !!formik.errors.email
                    }
                  >
                    {emailVerified
                      ? "Verified"
                      : isLoading.sendOtp
                      ? "Sending..."
                      : otpSent
                      ? "OTP Sent"
                      : "Verify"}
                  </OtpButton>
                </InputGroup>
                {formik.touched.email && formik.errors.email ? (
                  <ErrorText>{formik.errors.email}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="otp">OTP</Label>
                <InputGroup>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength={6} // Limit to 6 characters
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow digits
                      const digitsOnly = value.replace(/\D/g, "");

                      // Update formik value
                      formik.setFieldValue("otp", digitsOnly);

                      // Automatically verify when length is 6 and OTP was sent
                      if (
                        digitsOnly.length === 6 &&
                        otpSent &&
                        !emailVerified &&
                        !isLoading.verifyOtp
                      ) {
                        verifyOtp(formik.values.email, digitsOnly);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                    placeholder="Enter 6-digit OTP"
                    disabled={emailVerified} // Disable when verified
                  />
                  {!emailVerified && otpSent && (
                    <OtpButton
                      type="button"
                      onClick={() => sendOtp(formik.values.email)}
                      disabled={
                        isLoading.sendOtp ||
                        !formik.values.email ||
                        !!formik.errors.email
                      }
                    >
                      {isLoading.sendOtp ? "Sending..." : "Resend"}
                    </OtpButton>
                  )}
                  {isLoading.verifyOtp && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                        color: "#8A8A8A",
                        fontSize: "14px",
                      }}
                    >
                      Verifying...
                    </span>
                  )}
                </InputGroup>
                {formik.touched.otp && formik.errors.otp ? (
                  <ErrorText>{formik.errors.otp}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Full Name</Label>
                <Input
                  onBlur={formik.handleBlur}
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  placeholder="Phone No"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <ErrorText>{formik.errors.phone}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="linkedin">Full Name</Label>
                <Input
                  onBlur={formik.handleBlur}
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.linkedin}
                  placeholder="Linkedin Profile"
                />
                {formik.touched.linkedin && formik.errors.linkedin ? (
                  <ErrorText>{formik.errors.linkedin}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="college">Full Name</Label>
                <Input
                  onBlur={formik.handleBlur}
                  id="college"
                  name="college"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.college}
                  placeholder="College Name"
                />
                {formik.touched.college && formik.errors.college ? (
                  <ErrorText>{formik.errors.college}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="currentlyWorking">Currently Working</Label>
                <Select
                  onBlur={formik.handleBlur}
                  id="currentlyWorking"
                  name="currentlyWorking"
                  onChange={formik.handleChange}
                  value={formik.values.currentlyWorking}
                >
                  <option value="">Currently Working</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
                <CaretUp className="svg" />
                {formik.touched.currentlyWorking &&
                  formik.errors.currentlyWorking && (
                    <ErrorText>{formik.errors.currentlyWorking}</ErrorText>
                  )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input
                  onBlur={formik.handleBlur}
                  id="currentCompany"
                  name="currentCompany"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.currentCompany}
                  placeholder="Current Company"
                />
                {formik.touched.currentCompany &&
                  formik.errors.currentCompany && (
                    <ErrorText>{formik.errors.currentCompany}</ErrorText>
                  )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="currentCity">Current Company</Label>
                <Input
                  onBlur={formik.handleBlur}
                  id="currentCity"
                  name="currentCity"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.currentCity}
                  placeholder="Current City"
                />
                {formik.touched.currentCity && formik.errors.currentCity && (
                  <ErrorText>{formik.errors.currentCity}</ErrorText>
                )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="mentoringExperience">
                  Mentoring Experience
                </Label>
                <Select
                  onBlur={formik.handleBlur}
                  id="mentoringExperience"
                  name="mentoringExperience"
                  onChange={formik.handleChange}
                  value={formik.values.mentoringExperience}
                >
                  <option value="">Mentoring Experience</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
                <CaretUp className="svg" />
                {formik.touched.mentoringExperience &&
                  formik.errors.mentoringExperience && (
                    <ErrorText>{formik.errors.mentoringExperience}</ErrorText>
                  )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="mentoringSessions">
                  Mentoring Sessions Availability
                </Label>
                <Select
                  onBlur={formik.handleBlur}
                  id="mentoringSessions"
                  name="mentoringSessions"
                  onChange={formik.handleChange}
                  value={formik.values.mentoringSessions}
                >
                  <option value="">Mentoring Sessions Availability</option>
                  <option value="20/month">20/month</option>
                  <option value="30/month">30/month</option>
                  <option value="40/month">40/month</option>
                </Select>
                <CaretUp className="svg" />
                {formik.touched.mentoringSessions &&
                  formik.errors.mentoringSessions && (
                    <ErrorText>{formik.errors.mentoringSessions}</ErrorText>
                  )}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="mentoringApproach">Mentoring Approach</Label>
                <Select
                  onBlur={formik.handleBlur}
                  id="mentoringApproach"
                  name="mentoringApproach"
                  onChange={formik.handleChange}
                  value={formik.values.mentoringApproach}
                >
                  <option value="">Mentoring Approach</option>
                  <option value="Structured Goal Oriented">
                    Structured Goal Oriented
                  </option>
                  <option value="Supportive Student Centered">
                    Supportive Student Centered
                  </option>
                  <option value="Concept Clarity Driven">
                    Concept Clarity Driven
                  </option>
                </Select>
                <CaretUp className="svg" />
                {formik.touched.mentoringApproach &&
                  formik.errors.mentoringApproach && (
                    <ErrorText>{formik.errors.mentoringApproach}</ErrorText>
                  )}
              </FormGroup>
              {message.text && (
                <StatusMessage type={message.type}>
                  {message.text}
                </StatusMessage>
              )}
              <SubmitButton
                type="submit"
                onClick={() => {
                  if (!emailVerified || Object.keys(formik.errors).length > 0) {
                    validateAndTouchFields(formik);
                  }
                }}
                disabled={isLoading.submit || formik.isSubmitting}
              >
                {isLoading.submit ? "Submitting..." : "Submit"}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </ApplicationForm>
    </MentorApplicationContainer>
  );
};

export default MentorApplication;
