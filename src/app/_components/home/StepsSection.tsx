"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import TitleSubtitle from "./TitleSubtitle";

// Define proper types
interface FlowColAProps {
  img: string;
  title?: string;
  width?: number;
  height?: number;
  top?: string;
  right?: string;
  transform?: string;
}

interface FlowColBProps {
  img: string;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

interface FlowColCProps {
  img: string;
}

interface FlowProps {
  colA: FlowColAProps;
  colB: FlowColBProps;
  colC: FlowColCProps;
}

interface StepsSectionProps {
  className?: string;
  flowItems?: FlowProps[];
}

export const StepsSection = styled(
  ({ className, flowItems }: StepsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    // Ensure initial visibility - this guarantees the section will be visible
    useEffect(() => {
      // Make everything visible immediately for debugging
      // Remove this when the issue is fixed
      console.log("Steps section mounted, flowItems:", flowItems?.length);

      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
      }

      // Ensure all steps are visible in case of any animation issues
      if (stepsRef.current) {
        const allElements = stepsRef.current.querySelectorAll(
          ".step, .text-container, .media-container, .mbl-description"
        );
        allElements.forEach((el) => {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "none";
        });
      }
    }, [flowItems]);

    // Actual animation logic
    useEffect(() => {
      // For SSR safety
      if (typeof window === "undefined") return;

      // Debugging log
      console.log("Running animation effect, window width:", window.innerWidth);

      // Store current refs
      const currentTitleRef = titleRef.current;
      const currentStepsRef = stepsRef.current;

      try {
        // Desktop animations (skip mobile check to ensure it works)
        if (currentTitleRef) {
          // Title should already be visible from the first effect
          currentTitleRef.style.opacity = "1";
          currentTitleRef.style.transform = "none";
        }

        if (currentStepsRef) {
          // Get all steps
          const steps = currentStepsRef.querySelectorAll(".step");
          console.log("Steps found:", steps.length);

          // Make all step containers visible immediately
          steps.forEach((step) => {
            (step as HTMLElement).style.opacity = "1";
          });

          // Set up animations for inner elements
          steps.forEach((step, index) => {
            const textContainer = step.querySelector(".text-container");
            const mediaContainer = step.querySelector(".media-container");
            const mobileDesc = step.querySelector(".mbl-description");

            // Ensure inner elements are visible first
            if (textContainer)
              (textContainer as HTMLElement).style.opacity = "1";
            if (mediaContainer)
              (mediaContainer as HTMLElement).style.opacity = "1";
            if (mobileDesc) (mobileDesc as HTMLElement).style.opacity = "1";

            // Then apply simple animations with setTimeout
            setTimeout(() => {
              if (textContainer) {
                (textContainer as HTMLElement).style.transition =
                  "opacity 0.3s ease, transform 0.3s ease";
                (textContainer as HTMLElement).style.transform =
                  "translateX(-10px)";

                setTimeout(() => {
                  (textContainer as HTMLElement).style.transform =
                    "translateX(0)";
                }, 100);
              }

              if (mediaContainer) {
                (mediaContainer as HTMLElement).style.transition =
                  "opacity 0.3s ease, transform 0.3s ease";
                (mediaContainer as HTMLElement).style.transform =
                  "translateX(10px) scale(0.98)";

                setTimeout(() => {
                  (mediaContainer as HTMLElement).style.transform =
                    "translateX(0) scale(1)";
                }, 100);
              }
            }, 500 + index * 200); // Staggered delay
          });
        }
      } catch (error) {
        console.error("Animation error in StepsSection:", error);

        // Fallback: ensure content is visible even if animation fails
        if (currentTitleRef) currentTitleRef.style.opacity = "1";

        if (currentStepsRef) {
          const elements = currentStepsRef.querySelectorAll(
            ".step, .text-container, .media-container, .mbl-description"
          );
          elements.forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "none";
          });
        }
      }
    }, []);

    // Debugging check
    console.log("Rendering StepsSection with items:", flowItems?.length);

    return (
      <section className={className} ref={sectionRef}>
        <div className="steps-container">
          <div ref={titleRef}>
            <TitleSubtitle
              title={`"We've got your back, 
Let's `}
              redspan={`Make it happen."`}
              subtitle={`"No fluff. No big promises. Just real conversations 
with mentors who get things done. Here's how we help you step up."`}
            />
          </div>
          <div className="steps" ref={stepsRef}>
            {flowItems && flowItems.length > 0 ? (
              flowItems.map((item, idx) => (
                <div
                  className="step"
                  key={idx}
                  style={{ opacity: 1 }} // Force initial visibility
                >
                  <div className="text-container" style={{ opacity: 1 }}>
                    <div className="text-a">
                      <div className="icon-container">
                        {/* <Image src={item?.colB?.img} alt={item?.colB?.img} fill /> */}
                      </div>
                    </div>
                    <div className="text-b">
                      <h2 className="title">{item?.colB?.title}</h2>
                      <p className="description">{item?.colB?.subtitle}</p>
                    </div>
                  </div>
                  <div className="media-container" style={{ opacity: 1 }}>
                    <div className="img-container">
                      {" "}
                      <Image
                        src={item?.colC?.img}
                        alt={`Step ${idx + 1}: ${
                          typeof item?.colB?.title === "string"
                            ? item.colB.title
                            : "Step illustration"
                        }`}
                        fill
                      />
                    </div>
                  </div>
                  <p className="mbl-description" style={{ opacity: 1 }}>
                    {item?.colB?.subtitle}
                  </p>
                </div>
              ))
            ) : (
              <div className="error-message">
                No steps to display. Check your data.
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
)`
  position: relative;
  font-family: var(--font-exo);
  padding: 70px 0 0 0;
  margin: auto;
  background: #fff;
  overflow: hidden; /* Prevent animations from causing horizontal scroll */

  .error-message {
    color: white;
    padding: 20px;
    text-align: center;
  }

  @media (min-width: 992px) {
    width: 100%;
  }

  .steps-container {
    border-radius: 18px 18px 0 0;
    background: #000;
    width: 100%;
    margin: auto;
    padding: 73.5px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 22px;

    @media (min-width: 992px) {
      border-radius: 20.987px 20.987px 0 0;
      padding: 150px 0 152px 0;
      gap: 130px;
    }
    .steps {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      ${maxWidthContainer};
      ${sectionResponsivePadding()};
      gap: 20px;

      @media (min-width: 992px) {
        gap: unset;
      }

      .step {
        position: relative;
        display: flex;
        padding: 39.5px 0;
        align-items: center;
        flex-direction: column;
        gap: 13px;

        @media (min-width: 992px) {
          flex-direction: row;
          padding: 52.5px 0;
          min-height: calc(512px + (2 * 52.5px));
          gap: unset;
          justify-content: space-between;
        }

        &:nth-child(even) {
          @media (min-width: 992px) {
            flex-direction: row-reverse;
          }
        }

        /* Rest of the CSS remains the same */
        &:nth-child(1) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "🚀";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);
                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "🚀";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(2) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "⏳";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);

                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "⏳";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(3) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "🛸";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);

                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "🛸";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(4) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "☕";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);

                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "☕";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(2),
        &:nth-child(4) {
          .text-container {
            @media (min-width: 992px) and (max-width: 1950px) {
              padding-left: 72px;
            }
          }
        }

        .text-container {
          position: relative;
          width: 100%;
          display: flex;
          gap: 8px;
          justify-content: flex-start;
          will-change: transform, opacity; /* Performance optimization */

          @media (min-width: 992px) {
            justify-content: center;
            width: 50%;
            flex-direction: column;
            gap: 19px;
            max-width: 400px;
          }

          @media (min-width: 1290px) {
            width: 50%;
            max-width: 50%;
            padding-left: 45px;
          }

          @media (min-width: 1592px) {
            max-width: 700px;
          }

          .text-a {
            .icon-container {
              position: relative;
              width: 80px;
              height: 83px;
              top: 7px;
              display: none;
              @media (min-width: 992px) {
                display: block;
                width: 56px;
                height: 58px;
                top: unset;
                bottom: 38px;
              }

              @media (min-width: 1950px) {
                display: block;
                width: 80px;
                height: 83px;
                top: 7px;
                bottom: unset;
              }
            }
          }

          .text-b {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            color: #fff;
            gap: 8px;
            width: 90%;
            flex-shrink: 0;
            margin: 0 auto;

            @media (min-width: 992px) {
              width: unset;
              flex-direction: column;
              justify-content: unset;
              align-items: unset;
              gap: 20px;
            }

            @media (min-width: 1950px) {
              gap: 40px;
            }

            .title {
              position: relative;
              margin: 0;
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-transform: capitalize;
              text-align: center;
              max-width: 18ch;

              @media (min-width: 992px) {
                text-align: left;
                font-size: 36px;
                max-width: 16ch;
              }

              @media (min-width: 1320px) {
                font-size: 47.64px;
              }
            }

            .description {
              font-family: var(--font-fustat);
              margin: 0;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 141.979%; /* 25.556px */
              display: none;
              @media (min-width: 992px) {
                display: unset;
                max-width: 90%;
                font-size: 20px;
              }
            }
          }
        }

        .media-container {
          display: flex;
          width: 100%;
          height: 288px;
          border-radius: 8px;
          position: relative;
          background: #fff;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          will-change: transform, opacity; /* Performance optimization */

          @media (min-width: 992px) {
            border-radius: 18px;
            width: 639px;
            height: 512px;
            justify-self: flex-end;
          }

          @media (min-width: 1950px) {
            border-radius: 25px;
            width: 908px;
            height: 727px;
          }

          .img-container {
            background: #fff;
            width: 360px;
            height: 288px;
            position: relative;
            overflow: hidden;

            @media (min-width: 992px) {
              width: 92%;
              height: 100%;
            }

            @media (min-width: 1950px) {
              max-width: 908px;
              max-height: 727px;
            }

            img {
              position: absolute;
              object-fit: contain;
              width: 95% !important;
              margin: auto;
              height: 95% !important;

              @media (min-width: 992px) {
                width: 100% !important;
              height: auto !important;
              }
            }
          }
        }

        .mbl-description {
          font-family: var(--font-fustat);
          margin: 0;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          color: #d4d4d4;
          text-align: center;
          line-height: 141.979%; /* 25.556px */
          max-width: 85%;
          will-change: opacity, transform; /* Performance optimization */

          @media (min-width: 992px) {
            display: none;
          }
        }
      }
    }
  }
`;

export default StepsSection;
