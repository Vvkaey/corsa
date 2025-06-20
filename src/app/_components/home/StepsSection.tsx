"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import TitleSubtitle from "./TitleSubtitle";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    const gsapContext = useGsapContext();
    const sectionRootRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);
    
    // Individual step refs - with proper typing
    const stepRefs = useRef<HTMLDivElement[]>([]);
    
    const { width } = useWindowSize();
    const isMobile = width && width < 992;

    useIsomorphicLayoutEffect(() => {
      if (!sectionRootRef.current || !titleRef.current || !stepsRef.current)
        return;

      gsapContext.add(() => {
        // Get all steps
        const steps = stepRefs.current;
        const mediaContainers = steps.map(step => step?.querySelector('.media-container'));
        const textContainers = steps.map(step => step?.querySelector('.text-container'));
        const mobileDescriptions = steps.map(step => step?.querySelector('.mbl-description'));
        
        // Set initial state for content elements
        gsap.set(titleRef.current, {
          autoAlpha: 0,
          y: 75,
        });
        
        // Set initial state for steps
        steps.forEach((step, index) => {
          if (!step) return;
          
          // Different initial states based on even/odd index
          const isEven = index % 2 === 0;
          const direction = isEven ? -1 : 1;
          
          // Set initial states for media containers
          if (mediaContainers[index]) {
            gsap.set(mediaContainers[index], {
              autoAlpha: 0,
              x: isMobile ? 0 : (direction * 50),
              y: isMobile ? 50 : 0,
              scale: 0.95,
            });
          }
          
          // Set initial states for text containers
          if (textContainers[index]) {
            gsap.set(textContainers[index], {
              autoAlpha: 0,
              x: isMobile ? 0 : (direction * -50), // Opposite direction
              y: isMobile ? 30 : 0,
            });
          }
          
          // Set initial states for mobile descriptions
          if (mobileDescriptions[index] && isMobile) {
            gsap.set(mobileDescriptions[index], {
              autoAlpha: 0,
              y: 20,
            });
          }
        });

        // Main timeline for intro title animation
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRootRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1.2,
            // markers: false,
          },
        });

        mainTl.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
        
        // Create separate timelines for each step
        steps.forEach((step, index) => {
          if (!step) return;
          
          const stepTl = gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 75%", // Start animation when step is 75% in viewport
              end: "center center", // End when step is centered
              scrub: 1,
              // markers: false,
            },
          });
          
          // Different animation sequences based on mobile/desktop
          if (isMobile) {
            // Mobile animations - vertical sequence
            if (textContainers[index]) {
              stepTl.to(textContainers[index], {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              });
            }
            
            if (mediaContainers[index]) {
              stepTl.to(mediaContainers[index], {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "power2.out",
              }, ">-0.3"); // Slight overlap
            }
            
            if (mobileDescriptions[index]) {
              stepTl.to(mobileDescriptions[index], {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              }, ">-0.2");
            }
          } else {
            // Desktop animations - horizontal sequence
            const isEven = index % 2 === 0;
            
            // For even items, animate image first
            if (isEven) {
              if (mediaContainers[index]) {
                stepTl.to(mediaContainers[index], {
                  autoAlpha: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "power2.out",
                });
              }
              
              if (textContainers[index]) {
                stepTl.to(textContainers[index], {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.7,
                  ease: "power2.out",
                }, ">-0.4");
              }
            } else {
              // For odd items, animate text first
              if (textContainers[index]) {
                stepTl.to(textContainers[index], {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.7,
                  ease: "power2.out",
                });
              }
              
              if (mediaContainers[index]) {
                stepTl.to(mediaContainers[index], {
                  autoAlpha: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "power2.out",
                }, ">-0.4");
              }
            }
          }
        });

        return () => {
          // Clean up ScrollTriggers properly
          if (mainTl.scrollTrigger) {
            mainTl.scrollTrigger.kill();
          }
          
          // Kill all scroll triggers for step timelines
          ScrollTrigger.getAll().forEach(trigger => {
            trigger.kill();
          });
        };
      });

    }, [width, gsapContext, isMobile]);

    return (
      <section className={className} ref={sectionRootRef}>
        <div className="steps-container">
          <div ref={titleRef}>
            <TitleSubtitle
              title={<>&quot;We&apos;ve got your back, <br/></>}
              redspan={`Let's Make it happen."`}
              subtitle={`No fluff. No big promises. Just real conversations 
with mentors who get things done. Here's how we help you step up.`}
            />
          </div>
          
          <div className="steps" ref={stepsRef}>
            {flowItems && flowItems.length > 0 ? (
              flowItems.map((item, idx) => (
                <div 
                  className="step" 
                  key={idx}
                  ref={el => {
                    if (el) stepRefs.current[idx] = el;
                  }}
                >
                  <div className="text-container">
                    <div className="text-a">
                      <div className="icon-container">
                        {/* <Image src={item?.colB?.img} alt={item?.colB?.img} fill /> */}
                      </div>
                    </div>
                    <div className="text-b">
                      <h2 className="title">
                        {item?.colB?.title}
                      </h2>
                      <p className="description">{item?.colB?.subtitle}</p>
                    </div>
                  </div>
                  <div className="media-container">
                    <div className="img-container">
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
                  <p className="mbl-description">{item?.colB?.subtitle}</p>
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

    .titleSubWr {
      overflow: hidden;
      will-change: transform, opacity;
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
        will-change: transform, opacity; /* Performance optimization */

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
                max-width: 18ch;
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
          will-change: transform, opacity, scale; /* Performance optimization */

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