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
  SubmitButton,
} from "./styled";
import { Formik, Form, FormikProps, FormikHelpers, FormikErrors } from "formik";
import TitleSubtitle from "./TitleSubtitle";
import { useState, useRef, useEffect } from "react";
import * as Yup from "yup";
import { CaretUp } from "@/app/_assets/icons";
import ThankyouScreen, { GridType } from "../pricing/success/ThankyouScreen";
import { useRouter } from "next/navigation";
import gsap from "gsap";

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

// Define proper type for event handler
type InputEvent = React.FocusEvent<HTMLInputElement | HTMLSelectElement>;

const MentorApplication = () => {
  const router = useRouter();
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
  const [isMobile, setIsMobile] = useState(false);
  // Add a state to track initial render
  const [initialRender, setInitialRender] = useState(true);

  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if mobile on component mount and set visibility immediately to prevent flashing
  useEffect(() => {
    // Handle mobile detection
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Set content to be visible immediately when component mounts
    // This prevents the "flash of unstyled content" on mobile
    const setInitialVisibility = () => {
      // Apply inline styles directly to DOM elements
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.visibility = "visible";
      }

      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.visibility = "visible";
        titleRef.current.style.transform = "translateY(0px)";
      }

      if (formRef.current) {
        formRef.current.style.opacity = "1";
        formRef.current.style.visibility = "visible";
        formRef.current.style.transform = "translateY(0px)";
      }

      // Form groups should also be immediately visible
      formGroupRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.opacity = "1";
          ref.style.visibility = "visible";
          ref.style.transform = "translateY(0px)";
        }
      });
    };

    // Set items to be visible immediately on first render to prevent flash
    setInitialVisibility();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Initialize animations - run after first render
  useEffect(() => {
    // Skip if still in initial render to prevent flashing on mobile
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    // On mobile, do not animate after the initial render
    if (isMobile) {
      return;
    }

    // For non-mobile, create entry animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Animate container
    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 }
      );
    }

    // Animate title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }

    // Animate form
    if (formRef.current) {
      tl.fromTo(
        formRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        "-=0.4"
      );
    }

    // Stagger form groups
    if (formGroupRefs.current.length > 0) {
      tl.fromTo(
        formGroupRefs.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07, // Stagger with a small delay
          ease: "power1.out",
        },
        "-=0.5"
      );
    }
  }, [initialRender, isMobile]);

  // Animation for form field focus
  const handleFieldFocus = (index: number) => {
    if (isMobile) return; // Skip animations on mobile

    const formGroup = formGroupRefs.current[index];
    if (formGroup) {
      gsap.to(formGroup, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      });
    }
  };

  // Animation for form field blur
  const handleFieldBlur = (
    index: number,
    formikBlur: (e: InputEvent) => void,
    e: InputEvent
  ) => {
    if (isMobile) {
      // On mobile, just call the Formik blur handler
      formikBlur(e);
      return;
    }

    const formGroup = formGroupRefs.current[index];
    if (formGroup) {
      gsap.to(formGroup, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "none",
      });
    }

    // Call the Formik blur handler
    formikBlur(e);
  };

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
    mentoringSessions: Yup.string().required(
      "Mentoring session availability is required"
    ),
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

      if (response.ok) {
        setMessage({
          text: "Application submitted successfully!",
          type: "success",
        });

        // Animate form out before showing success
        if (formRef.current && !isMobile) {
          gsap.to(formRef.current, {
            y: 30,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              setShowSuccessModal(true);
              localStorage.removeItem("authToken");
            },
          });
        } else {
          setShowSuccessModal(true);
          localStorage.removeItem("authToken");
        }
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

    // Animate OTP button
    const otpButton = document.querySelector(".otp-button");
    if (otpButton && !isMobile) {
      gsap.to(otpButton, {
        scale: 0.95,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
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

        // Animate the OTP field to highlight it
        const otpInput = document.getElementById("otp");
        if (otpInput && !isMobile) {
          gsap.fromTo(
            otpInput,
            { borderColor: "rgba(0, 128, 0, 0.5)" },
            {
              borderColor: "green",
              duration: 1,
              repeat: 2,
              yoyo: true,
              ease: "power1.inOut",
            }
          );
        }
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

        // Animate success verification
        const emailGroup = formGroupRefs.current[1]; // Email is the second form group (index 1)
        if (emailGroup && !isMobile) {
          gsap.fromTo(
            emailGroup,
            { backgroundColor: "rgba(0, 128, 0, 0.05)" },
            {
              backgroundColor: "transparent",
              duration: 1.5,
              ease: "power2.out",
            }
          );
        }
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

  // Function to touch all fields on form submit attempt
  const validateAndTouchFields = (formik: FormikProps<FormValues>) => {
    // Touch all fields to trigger error messages
    Object.keys(formik.values).forEach((field) => {
      formik.setFieldTouched(field as keyof FormValues, true, false);
    });

    // Then validate the form
    formik.validateForm().then((errors: FormikErrors<FormValues>) => {
      if (Object.keys(errors).length > 0) {
        // Scroll to the first error field
        const firstErrorField = document.getElementById(Object.keys(errors)[0]);
        if (firstErrorField) {
          // Animate scroll
          const scrollOptions = {
            behavior: isMobile ? "auto" : ("smooth" as ScrollBehavior), // Use instant scroll on mobile
            block: "center" as ScrollLogicalPosition,
          };

          firstErrorField.scrollIntoView(scrollOptions);

          // Highlight the field with error
          if (!isMobile) {
            gsap.fromTo(
              firstErrorField,
              { borderColor: "rgba(255, 0, 0, 0.5)" },
              {
                borderColor: "red",
                duration: 0.5,
                repeat: 3,
                yoyo: true,
                ease: "sine.inOut",
              }
            );
          }

          firstErrorField.focus();
        }
      }
    });
  };

  // Add effect to handle failure modal redirect
  useEffect(() => {
    if (showFailureModal) {
      router.push("/error");
    }
  }, [showFailureModal, router]);



  return (
    <MentorApplicationContainer
      ref={containerRef}
      style={{ opacity: 1, visibility: "visible" }}
    >
      {showSuccessModal ? (
        <ThankyouScreen
          title="Thanks for stepping up!"
          subtitle="We're elated to have you interested"
          descriptionTop="We'll get back to you shortly after going through the details."
          descriptionBottom="Feel free to contact us at connect@stroda.club If you have any questions"
          ctaGrid={GridType.SOLO}
          isMentorApplication={true}
        />
      ) : null}
      <div
        ref={titleRef}
        style={{
          opacity: 1,
          visibility: "visible",
          transform: "translateY(0px)",
        }}
      >
        <TitleSubtitle />
      </div>
      <ApplicationForm
        ref={formRef}
        style={{
          opacity: 1,
          visibility: "visible",
          transform: "translateY(0px)",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount={true} // This will validate when the form mounts
          validateOnChange={true} // This will validate on every change
        >
          {(formik) => (
            <Form autoComplete="new-password">
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[0] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  onFocus={() => handleFieldFocus(0)}
                  onBlur={(e) => handleFieldBlur(0, formik.handleBlur, e)}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  placeholder="Full Name"
                  autoComplete="new-password"
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <ErrorText>{formik.errors.fullName}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[1] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onFocus={() => handleFieldFocus(1)}
                    onBlur={(e) => handleFieldBlur(1, formik.handleBlur, e)}
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
                    autoComplete="new-password"
                  />
                  <OtpButton
                    type="button"
                    className="otp-button"
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
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[2] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="otp">OTP</Label>
                <InputGroup>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength={6} // Limit to 6 characters
                    onFocus={() => handleFieldFocus(2)}
                    onBlur={(e) => handleFieldBlur(2, formik.handleBlur, e)}
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
                    value={formik.values.otp}
                    placeholder="Enter 6-digit OTP"
                    disabled={emailVerified} // Disable when verified
                    autoComplete="one-time-code"
                  />
                  {!emailVerified && otpSent && (
                    <OtpButton
                      type="button"
                      className="otp-button"
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
                  {/* {isLoading.verifyOtp && (
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
                  )} */}
                </InputGroup>
                {message.type == "error" &&
                message.text &&
                message.text === "Failed to verify OTP" ? (
                  <ErrorText $right={true}>Invalid OTP</ErrorText>
                ) : null}
                {formik.touched.otp && formik.errors.otp ? (
                  <ErrorText>{formik.errors.otp}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[3] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  onFocus={() => handleFieldFocus(3)}
                  onBlur={(e) => handleFieldBlur(3, formik.handleBlur, e)}
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  placeholder="Phone No"
                  autoComplete="new-password"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <ErrorText>{formik.errors.phone}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[4] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  onFocus={() => handleFieldFocus(4)}
                  onBlur={(e) => handleFieldBlur(4, formik.handleBlur, e)}
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  onChange={formik.handleChange}
                  value={formik.values.linkedin}
                  placeholder="Linkedin Profile"
                  autoComplete="new-password"
                />
                {formik.touched.linkedin && formik.errors.linkedin ? (
                  <ErrorText>{formik.errors.linkedin}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[5] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="college">College Name</Label>
                <Input
                  onFocus={() => handleFieldFocus(5)}
                  onBlur={(e) => handleFieldBlur(5, formik.handleBlur, e)}
                  id="college"
                  name="college"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.college}
                  placeholder="College Name"
                  autoComplete="new-password"
                />
                {formik.touched.college && formik.errors.college ? (
                  <ErrorText>{formik.errors.college}</ErrorText>
                ) : null}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[6] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="currentlyWorking">Currently Working</Label>
                <Select
                  onFocus={() => handleFieldFocus(6)}
                  onBlur={(e) => handleFieldBlur(6, formik.handleBlur, e)}
                  id="currentlyWorking"
                  name="currentlyWorking"
                  onChange={formik.handleChange}
                  value={formik.values.currentlyWorking}
                  autoComplete="new-password"
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

              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[7] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input
                  onFocus={() => handleFieldFocus(7)}
                  onBlur={(e) => handleFieldBlur(7, formik.handleBlur, e)}
                  id="currentCompany"
                  name="currentCompany"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.currentCompany}
                  placeholder="Current Company"
                  autoComplete="new-password"
                />
                {formik.touched.currentCompany &&
                  formik.errors.currentCompany && (
                    <ErrorText>{formik.errors.currentCompany}</ErrorText>
                  )}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[8] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="currentCity">Current City</Label>
                <Input
                  onFocus={() => handleFieldFocus(8)}
                  onBlur={(e) => handleFieldBlur(8, formik.handleBlur, e)}
                  id="currentCity"
                  name="currentCity"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.currentCity}
                  placeholder="Current City"
                  autoComplete="new-password"
                />
                {formik.touched.currentCity && formik.errors.currentCity && (
                  <ErrorText>{formik.errors.currentCity}</ErrorText>
                )}
              </FormGroup>
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[9] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="mentoringExperience">
                  Mentoring Experience
                </Label>
                <Select
                  onFocus={() => handleFieldFocus(9)}
                  onBlur={(e) => handleFieldBlur(9, formik.handleBlur, e)}
                  id="mentoringExperience"
                  name="mentoringExperience"
                  onChange={formik.handleChange}
                  value={formik.values.mentoringExperience}
                  autoComplete="new-password"
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
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[10] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="mentoringSessions">
                  Mentoring Session Availability
                </Label>
                <Select
                  onFocus={() => handleFieldFocus(10)}
                  onBlur={(e) => handleFieldBlur(10, formik.handleBlur, e)}
                  id="mentoringSessions"
                  name="mentoringSessions"
                  onChange={formik.handleChange}
                  value={formik.values.mentoringSessions}
                  autoComplete="new-password"
                >
                  <option value="">Mentoring Session Availability</option>
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
              <FormGroup
                ref={(el) => {
                  formGroupRefs.current[11] = el;
                }}
                className="form-group"
                style={{
                  opacity: 1,
                  visibility: "visible",
                  transform: "translateY(0px)",
                }}
              >
                <Label htmlFor="mentoringApproach">Mentoring Approach</Label>
                <Select
                  onFocus={() => handleFieldFocus(11)}
                  onBlur={(e) => handleFieldBlur(11, formik.handleBlur, e)}
                  id="mentoringApproach"
                  name="mentoringApproach"
                  onChange={formik.handleChange}
                  value={formik.values.mentoringApproach}
                  autoComplete="new-password"
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

              {/* {message.text && (
                <StatusMessage 
                  type={message.type}
                  ref={(el: HTMLDivElement | null) => {
                    if (el && !isMobile) {
                      // Animate message appearance
                      gsap.fromTo(
                        el,
                        { autoAlpha: 0, y: -10 },
                        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }
                      );
                    }
                  }}
                >
                  {message.text}
                </StatusMessage>
              )} */}

              <SubmitButton
                type="submit"
                onClick={() => {
                  if (!emailVerified || Object.keys(formik.errors).length > 0) {
                    validateAndTouchFields(formik);
                  }
                }}
                disabled={isLoading.submit || formik.isSubmitting}
                className={isLoading.submit ? "loading" : ""}
              >
                {isLoading.submit ? "Processing..." : "Submit"}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </ApplicationForm>
    </MentorApplicationContainer>
  );
};

export default MentorApplication;
