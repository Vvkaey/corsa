"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import TitleSubtitle from "./TitleSubtitle";
import gsap from "gsap";

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
  ({
    className,
    flowItems,
  }: StepsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [animatedSteps, setAnimatedSteps] = useState<Set<number>>(new Set());
    const [titleAnimated, setTitleAnimated] = useState(false);
    
    // Reset refs array
    stepRefs.current = [];
    
    // Add to refs array
    const addToStepRefs = (el: HTMLDivElement | null) => {
      if (el && !stepRefs.current.includes(el)) {
        stepRefs.current.push(el);
      }
    };
    
    // Function to check if element is in viewport
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };
    
    useEffect(() => {
      // Set initial state to prevent flashing
      if (titleRef.current) {
        gsap.set(titleRef.current, { 
          opacity: 0,
          y: 30
        });
      }
      
      stepRefs.current.forEach((step) => {
        if (step) {
          const textContainer = step.querySelector('.text-container');
          const mediaContainer = step.querySelector('.media-container');
          const mobileDesc = step.querySelector('.mbl-description');
          
          if (textContainer) gsap.set(textContainer, { opacity: 0, x: -40 });
          if (mediaContainer) gsap.set(mediaContainer, { opacity: 0, x: 40, scale: 0.95 });
          if (mobileDesc) gsap.set(mobileDesc, { opacity: 0, y: 20 });
        }
      });
      
      // Create title animation
      const titleTimeline = gsap.timeline({ paused: true });
      if (titleRef.current) {
        titleTimeline.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        });
      }
      
      // Handle scroll event
      const handleScroll = () => {
        // Animate title if in viewport and not already animated
        if (titleRef.current && !titleAnimated) {
          if (isInViewport(titleRef.current)) {
            titleTimeline.play();
            setTitleAnimated(true);
          }
        }
        
        // Animate steps that come into viewport
        stepRefs.current.forEach((step, index) => {
          if (step && !animatedSteps.has(index)) {
            if (isInViewport(step)) {
              // Create a new set with the updated value
              setAnimatedSteps(prev => new Set(prev).add(index));
              
              // For even-indexed steps, animate from right
              // For odd-indexed steps, animate from left
              // const direction = index % 2 === 0 ? 40 : -40;
              
              // Get elements
              const textContainer = step.querySelector('.text-container');
              const mediaContainer = step.querySelector('.media-container');
              const mobileDesc = step.querySelector('.mbl-description');
              
              // Create animation for this step
              const stepTimeline = gsap.timeline();
              
              // Add animations to the timeline with proper direction
              if (textContainer) {
                stepTimeline.to(textContainer, { 
                  opacity: 1, 
                  x: 0, 
                  duration: 0.8,
                  ease: "power3.out",
                });
              }
              
              if (mediaContainer) {
                stepTimeline.to(mediaContainer, { 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out",
                  clearProps: "scale"
                }, "-=0.5");
              }
              
              if (mobileDesc) {
                stepTimeline.to(mobileDesc, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out"
                }, "-=0.3");
              }
            }
          }
        });
      };
      
      // Check initial visibility
      handleScroll();
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll);
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [animatedSteps, titleAnimated]);

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
          <div className="steps">
            {flowItems?.map((item, idx) => (
              <div 
                className="step" 
                key={idx} 
                ref={addToStepRefs}
              >
                <div className="text-container">
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
                <div className="media-container">
                  <div className="img-container">
                    {" "}
                    <Image 
                      src={item?.colC?.img} 
                      alt={`Step ${idx + 1}: ${typeof item?.colB?.title === 'string' ? item.colB.title : 'Step illustration'}`} 
                      fill 
                    />
                  </div>
                </div>
                <p className="mbl-description">{item?.colB?.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
)`
  /* Rest of the styling remains the same */
  position: relative;
  font-family: var(--font-exo);
  padding: 70px 0 0 0;
  margin: auto;
  background: #fff;
  overflow: hidden; /* Prevent animations from causing horizontal scroll */

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
      gap: 120px;
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
        transform: translateZ(0); /* Force GPU acceleration */

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
                max-width: 70%;
                font-size: 20px;
              }
            }
          }
        }

        .media-container {
          display: flex;
          width: 100%;
          height: 258px;
          border-radius: 8px;
          position: relative;
          background: #fff;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          will-change: transform, opacity; /* Performance optimization */

          @media (min-width: 992px) {
            border-radius: 25px;
            width: calc(639px + 58px);
            height: calc(512px + 62px);
            justify-self: flex-end;
          }

          .img-container {
            background: #fff;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
            position: relative;
            overflow: hidden;

            @media (min-width: 992px) {
              max-width: 639px;
              height: 100%;
              max-height: 512px;
            }

            img {
              position: absolute;
              object-fit: contain;
              width: 100%;
              height: auto;
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