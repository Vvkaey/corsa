"use client";

import styled from "styled-components";
import { BlankOptionCircle, FillOptionCircle } from "@/app/_assets/icons";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useState, useRef, useEffect } from "react";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RedSpan } from "../dashboard/styled";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define the question data structure
interface QuestionOption {
  text: string;
  selected: boolean;
}

interface Question {
  question: string;
  options: QuestionOption[];
}

export const RewardsSection = styled(
  ({ className }: { className?: string }) => {
    const { width } = useWindowSize();
    const isMobile = width && width < 992;
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const questionRef = useRef<HTMLParagraphElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const completionRef = useRef<HTMLDivElement>(null);

    const gsapContext = useGsapContext();

    // Initialize questions
    const [questions, setQuestions] = useState<Question[]>([
      {
        question: " What do you feel is missing in your learning experience?",
        options: [
          { text: "Clear explanations of concepts.", selected: false },
          { text: "A structured study plan.", selected: false },
          { text: "More practice problems and tests.", selected: false },
          { text: "Motivation and guidance.", selected: false },
        ],
      },
      {
        question:
          "How often do you feel stuck on a topic but don't know whom to ask?",
        options: [
          { text: "Rarely", selected: false },
          { text: "Sometimes", selected: false },
          { text: "Often", selected: false },
          { text: "Almost every day", selected: false },
        ],
      },
      {
        question: "What do you think makes a great mentor?",
        options: [
          {
            text: "Someone who explains things in a simple way.",
            selected: false,
          },
          { text: "Someone who motivates me.", selected: false },
          { text: "Someone who helps me plan better.", selected: false },
          { text: "Someone who just listens to my problems.", selected: false },
        ],
      },
      {
        question: "How do you feel about your current routine?",
        options: [
          {
            text: "It's well structured, and I follow it consistently.",
            selected: false,
          },
          {
            text: "It's okay, but I could improve my time management.",
            selected: false,
          },
          { text: "I don't have a proper routine.", selected: false },
          {
            text: "I don't know where to start, so I just delay.",
            selected: false,
          },
        ],
      },
      {
        question: "If you could instantly master one skill, what would it be?",
        options: [
          { text: "Self discipline.", selected: false },
          { text: "Handling stress", selected: false },
          { text: "Time management.", selected: false },
          { text: "Decision making", selected: false },
        ],
      },
    ]);

    const progress = isCompleted
      ? 100
      : (currentStep / (questions.length - 1)) * 100;

    // Initialize animation for section entry
    useIsomorphicLayoutEffect(() => {
      if (!sectionRef.current || !headingRef.current) return;

      gsapContext.add(() => {
        // Set initial states
        gsap.set(headingRef.current, {
          autoAlpha: 0,
          y: 50,
        });

        // Initial animation for section
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        });

        sectionTl.to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        });

        return () => {
          if (sectionTl.scrollTrigger) {
            sectionTl.scrollTrigger.kill();
          }
        };
      });
    }, [gsapContext]);

    // Handle option selection
    const handleOptionSelect = (optionIndex: number) => {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        const currentQuestion = { ...updatedQuestions[currentStep] };

        // Update selected state for all options in the current question
        currentQuestion.options = currentQuestion.options.map(
          (option, idx) => ({
            ...option,
            selected: idx === optionIndex,
          })
        );

        updatedQuestions[currentStep] = currentQuestion;
        return updatedQuestions;
      });
    };

    // Animate content when questions change
    useEffect(() => {
      if (!questionRef.current || !optionsRef.current) return;

      // Create animation for question change
      const contentTl = gsap.timeline();

      // Subtle fade out - less vertical movement
      contentTl.to([questionRef.current, optionsRef.current], {
        autoAlpha: 0.8, // Don't fade completely out for a subtler effect
        // Reduced movement
        duration: 0.25,
        ease: "power1.out", // Gentler easing
      });

      // Update content (happens between animations)
      contentTl.call(() => {}, [], "+=0.05"); // Shorter pause

      // Fade in with subtle movement
      contentTl.to([questionRef.current, optionsRef.current], {
        autoAlpha: 1,

        duration: 0.35,
        ease: "power1.out", // Gentler easing
      });
    }, [currentStep, questions]);

    // Animate progress bar when step changes
    useEffect(() => {
      if (!progressRef.current) return;

      // Create a smoother animation for progress bar
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.4, // Slightly faster
        ease: "power1.inOut", // Gentler easing for smoother motion
        overwrite: true, // Prevent animation buildup
      });
    }, [progress]);

    // Show/hide completion message
    useEffect(() => {
      if (!completionRef.current || !contentRef.current) return;

      if (isCompleted) {
        // Animate to completion state with subtler transitions
        const completionTl = gsap.timeline();

        // Subtle fade out for question elements
        completionTl.to([questionRef.current, optionsRef.current], {
          autoAlpha: 0,

          duration: 0.35,
          ease: "power1.out",
        });

        // Fade out CTA more quickly
        completionTl.to(
          ctaRef.current,
          {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power1.out",
          },
          "<"
        ); // Start at same time

        // Show completion message with subtle animation
        completionTl.to(
          completionRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.inOut", // Gentler easing
          },
          ">-0.15"
        ); // Slight overlap
      } else {
        // Initially hide completion message
        gsap.set(completionRef.current, {
          autoAlpha: 0,
          y: 10, // Reduced initial offset
        });
      }
    }, [isCompleted]);

    // Handle next button click
    const handleNext = () => {
      // Check if any option is selected
      const hasSelection = questions[currentStep].options.some(
        (option) => option.selected
      );

      if (!hasSelection) return; // Don't proceed if no option is selected

      if (currentStep < questions.length - 1) {
        // Move to next step
        setCurrentStep((prev) => prev + 1);
      } else {
        // Complete the survey
        setIsCompleted(true);
      }
    };

    const currentQuestion = questions[currentStep];

    return (
      <section className={className} ref={sectionRef}>
        <div className="wrapper">
          <div className="container">
            <div className="left-block" ref={headingRef}>
              <div className="head-container">
                <h3 className="head">
                  {isCompleted ? "All done!" : "Let's Make It Rewarding"}
                  {isCompleted ? (
                    <>
                      <br />
                      <span className="red-text">Boxes checked.</span>
                    </>
                  ) : null}
                </h3>
                <h3 className="subhead">
                  {isCompleted ? null : (
                    <>
                      Take a minute and get{" "}
                      <span className="red-text">extended time</span> on first
                      mentor session. Deal?
                    </>
                  )}
                </h3>
              </div>
            </div>
            <div className="right-block">
              <div
                className="tracker"
                style={{ visibility: isCompleted ? "hidden" : "visible" }}
              >
                <div className="line">
                  <div className="progress" ref={progressRef} />
                </div>
                <div className="dots">
                  {questions.map((_, index) =>
                    index <= currentStep ? (
                      <FillOptionCircle
                        key={index}
                        width={isMobile ? 15 : 22}
                        height={isMobile ? 15 : 22}
                      />
                    ) : (
                      <BlankOptionCircle
                        key={index}
                        width={isMobile ? 15 : 22}
                        height={isMobile ? 15 : 22}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="content" ref={contentRef}>
                <div
                  className="completion-message"
                  ref={completionRef}
                  style={{ opacity: 0 }}
                >
                  <p>
                    Subscribe Mentor Access plan to avail
                    <br />
                    <br />
                    <span className="completion-sub">
                      You&apos;ve unlocked <RedSpan>extended time</RedSpan> on
                      your <br /> first mentor session!
                    </span>
                  </p>
                </div>

                <p className="question" ref={questionRef}>
                  {currentQuestion.question}
                </p>
                <div className="options" ref={optionsRef}>
                  {currentQuestion.options.map((option, optionIndex) => (
                    <div
                      className={`option-element ${
                        option.selected ? "selected" : ""
                      }`}
                      key={optionIndex}
                      onClick={() => handleOptionSelect(optionIndex)}
                    >
                      {option.selected ? (
                        <FillOptionCircle
                          width={isMobile ? 15 : 22}
                          height={isMobile ? 15 : 22}
                        />
                      ) : (
                        <BlankOptionCircle
                          width={isMobile ? 15 : 22}
                          height={isMobile ? 15 : 22}
                        />
                      )}
                      <p className="option">{option.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={
                  !isCompleted ? "cta-container" : "cta-container hide"
                }
                ref={ctaRef}
              >
                <button
                  className={`primary-cta ${
                    !questions[currentStep].options.some((o) => o.selected)
                      ? "disabled"
                      : ""
                  }`}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
)`
  position: relative;
  width: 100%;
  font-family: var(--font-exo);
  padding: 40px 0;
  margin: auto;
  background: #fff;

  @media (min-width: 992px) {
    height: 100vh;
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${sectionResponsivePadding()};
  }

  .wrapper {
    background: #000;
    position: relative;
    width: 100%;
    font-family: var(--font-exo);
    margin: auto;
    padding-bottom: 0;
    border-radius: none;
    padding: 68px 0px 84px 0px;
    ${maxWidthContainer};
    will-change: transform, opacity;

    @media (min-width: 992px) {
      border-radius: 30.016px;
      padding: 45px 0px 45px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-height: 1100px;
    }

    @media (min-width: 1950px) {
      padding: 71px 0px 57px 69px;
    }

    h2,
    p,
    h3 {
      margin: 0;
    }

    .red-text {
      color: #ff2626;
    }

    .container {
      background: #000;
      display: flex;
      flex-direction: column;
      gap: 58px;

      @media (min-width: 992px) {
        padding: 0;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        gap: unset;
      }

      .left-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 55px;
        padding-right: 24px;
        will-change: transform, opacity;

        @media (max-width: 992px) {
          ${sectionResponsivePadding()};
        }

        @media (min-width: 992px) {
          padding-right: unset;
          width: 40%;
          padding: 58px 0 32px 0;
          gap: unset;
        }

        .head-container {
          display: flex;
          flex-direction: column;
          gap: 10px;

          @media (min-width: 992px) {
            padding-top: 50px;
            gap: 20px;
          }

          .head {
            text-align: center;
            color: #fff;
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            @media (min-width: 992px) {
              font-size: 36px;
              text-align: unset;
            }

            @media (min-width: 1950px) {
              font-size: 51px;
            }
          }

          .subhead {
            font-family: var(--font-fustat);
            color: #fff;
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;

            @media (min-width: 992px) {
              font-size: 20px;
              text-align: unset;
              max-width: 39ch;
            }

            @media (min-width: 1950px) {
              font-size: 28px;
              text-align: unset;
              max-width: 39ch;
            }
          }
        }
      }

      .right-block {
        border-radius: 19.506px 0px 0px 19.506px;
        padding: 36px 34px 30px 34px;
        background: #fff;
        display: flex;
        flex-direction: column;
        gap: 25px;

        @media (max-width: 992px) {
          margin-left: 16px;
        }

        @media (min-width: 992px) {
          // padding: 58px 77px 32px 100px;
          padding: 50px 77px 31px 100px;
          gap: 0px;
          width: 56%;
        }

        @media (min-width: 1950px) {
          padding: 71px 109px 45px 140px;
        }

        .tracker {
          width: 90%;
          height: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          @media (min-width: 992px) {
            margin-bottom: 20px;
          }

          .line {
            height: 1px;
            width: 100%;
            background: #c7c7c7;
            position: relative;

            .progress {
              position: absolute;
              left: 0;
              top: -0.5px; /* Align with the center of the line */
              height: 2px;
              background: #ff2626;
              width: 0;
              will-change: width;
            }
          }

          .dots {
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 0;
            top: 1px;
            width: 100%;
            z-index: 2; /* Ensure dots are above the line */

            @media (min-width: 992px) {
              top: -2px;
              left: 0px;
            }
          }
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center content vertically */
          gap: 14px;
          height: 260px; /* Fixed height */
          overflow: hidden; /* Prevent content overflow */
          position: relative;

          @media (min-width: 395px) {
            gap: 18px;
          }

          @media (min-width: 992px) {
            gap: 23px;
            margin: 13px 0 30px 0;
          }

          @media (min-width: 1500px) {
            height: 277px;
          }

          @media (min-width: 1950px) {
            margin: 20px 0 40px 0;
            gap: 40px;
            height: 334px;
          }

          .completion-message {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 5;
            will-change: transform, opacity;

            @media (min-width: 992px) {
              padding: 20px;
            }

            p {
              color: #000;
              font-size: 24px;
              font-weight: 600;
              line-height: normal;

              @media (min-width: 992px) {
                font-size: 36px;
              }

              @media (min-width: 1950px) {
                font-size: 51px;
              }
            }

            .completion-sub {
              font-size: 20px;
              line-height: 110%;
              @media (min-width: 992px) {
                font-size: 20px;
                line-height: 110%;
                max-width: 15ch;
              }

              @media (min-width: 1950px) {
                margin-top: 10px;
                font-size: 32px;
              }
            }
          }

          .question {
            color: #000;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            will-change: transform, opacity;

            @media (min-width: 992px) {
              font-size: 16px;
            }

            @media (min-width: 1950px) {
              font-size: 23px;
            }
          }

          .options {
            display: flex;
            flex-direction: column;
            gap: 18px;
            will-change: transform, opacity;

            @media (min-width: 992px) {
              gap: 22px; /* Adjusted for more consistent spacing */
              margin-top: 5px;
            }

            @media (min-width: 1500px) {
              gap: 30px; /* Adjusted for more consistent spacing */
              margin-top: 7px;
            }

            @media (min-width: 1950px) {
              gap: 38px;
            }

            .option-element {
              display: flex;
              gap: 12px;
              align-items: center;
              cursor: pointer;
              padding: 5px 0;
              position: relative;
              transition: transform 0.3s ease-out, opacity 0.2s ease;

              &:hover {
                transform: translateX(3px); /* Subtler movement */

                &::after {
                  opacity: 1;
                }
              }

              &.selected {
                opacity: 1;

                &::after {
                  background-color: rgba(255, 38, 38, 0.08);
                  opacity: 1;
                }
              }

              @media (min-width: 992px) {
                gap: 6.7px;
              }

              @media (min-width: 992px) {
                gap: 10px;
              }

              .option {
                color: #000;
                font-size: 15px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;

                @media (min-width: 992px) {
                  font-size: 16px;
                }

                @media (min-width: 1950px) {
                  font-size: 23px;
                }
              }

              svg {
                @media (min-width: 992px) {
                  position: relative;
                  top: 2px;
                }
              }
            }
          }
        }

        .hide {
          visibility: hidden;
          opacity: 0;
        }

        .cta-container {
          opacity: 1;
          will-change: transform, opacity;

          .primary-cta {
            width: 100%;
            display: flex;
            padding: 11px 33px;
            gap: 3.491px;
            justify-content: center;
            align-items: center;
            gap: 6.73px;
            flex-shrink: 0;
            border-radius: 9px;
            border: 0.349px solid #ff2626;
            background: #ff2626;
            margin-top: 10px;
            color: #fff;
           font-family: var(--font-exo);
            font-size: 16px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: background-color 0.3s ease, transform 0.2s ease,
              opacity 0.3s ease;
            min-width: 185px;

            /* Add subtle ripple effect */
            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 5px;
              height: 5px;
              background: rgba(255, 255, 255, 0.4);
              opacity: 0;
              border-radius: 100%;
              transform: scale(1, 1) translate(-50%, -50%);
              transform-origin: 50% 50%;
            }

            &:hover:not(.disabled) {
              background-color: #e61e1e;
              // transform: translateY(-1px); /* Subtler lift */

              &::after {
                animation: ripple 0.6s ease-out;
              }
            }

            &:active:not(.disabled) {
              transform: translateY(0);
            }

            &.disabled {
              background-color: #ff9999;
              cursor: not-allowed;
              opacity: 0.7;
              transform: none;
            }

            @keyframes ripple {
              0% {
                opacity: 1;
                transform: scale(0, 0);
              }
              20% {
                opacity: 1;
                transform: scale(25, 25);
              }
              100% {
                opacity: 0;
                transform: scale(40, 40);
              }
            }

            @media (min-width: 992px) {
              border-radius: 8.076px;
              border: 0.673px solid #ff2626;
              padding: 10px 40px;
              font-size: 16.5px;
              gap: 6.73px;
              line-height: normal;
              margin: 0 auto;
              margin-top: 10px;
              width: 100%
            }

            @media (min-width: 1950px) {
              margin-top: 23px;
              padding: 13px 58px;
              font-size: 23.521px;
            }
          }
        }
      }
    }
  }
`;
