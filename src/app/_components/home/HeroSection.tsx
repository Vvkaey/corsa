"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { JSX } from "react";
import {
  SectionPadding,
  headerSpacing,
  maxWidthContainer,
} from "../new_mixins/mixins";
import { IconShowcase } from "./IconShowcase";
import { useMentorshipContext } from "@/app/_contexts/MentorshipContext";

export const HeroSection = styled(
  ({
    className,
    head,
    secondaryHead = false,
    subHead,
    primaryCta,
    onPrimaryCtaClick,
    onSecondaryCTAClick,
    secondaryCta,
    headB,
    subHeadB,
    icons,
    compactContainerB = false,
  }: {
    className?: string;
    head?: string | JSX.Element;
    secondaryHead?: boolean;
    subHead?: string | JSX.Element;
    primaryCta?: string;
    onPrimaryCtaClick?: () => void;
    onSecondaryCTAClick?: () => void;
    secondaryCta?: string;
    headB?: string | JSX.Element;
    subHeadB?: string | JSX.Element;
    icons?: Record<string, string>[];
    compactContainerB?: boolean;
  }) => {
    // Create refs for animation
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subHeadingRef = useRef<HTMLHeadingElement>(null);
    const ctaContainerRef = useRef<HTMLDivElement>(null);
    const primaryCtaRef = useRef<HTMLButtonElement>(null);
    const secondaryCtaRef = useRef<HTMLButtonElement>(null);
    const rootContainerRef = useRef<HTMLDivElement>(null);

    const { subscription } = useMentorshipContext();

    useEffect(() => {
      // For SSR safety
      if (typeof window === "undefined") return;

      // Store ref values at the beginning of the effect
      const currentHeadingRef = headingRef.current;
      const currentSubHeadingRef = subHeadingRef.current;
      const currentCtaContainerRef = ctaContainerRef.current;
      const currentPrimaryCtaRef = primaryCtaRef.current;
      const currentSecondaryCtaRef = secondaryCtaRef.current;

      // Create event handlers with named functions for proper cleanup
      const primaryEnterHandler = currentPrimaryCtaRef
        ? () => {
            currentPrimaryCtaRef.style.transform = "translateY(-3px)";
            currentPrimaryCtaRef.style.boxShadow =
              "0 10px 20px rgba(255, 38, 38, 0.2)";
          }
        : undefined;

      const primaryLeaveHandler = currentPrimaryCtaRef
        ? () => {
            currentPrimaryCtaRef.style.transform = "translateY(0)";
            currentPrimaryCtaRef.style.boxShadow = "0 0 0 rgba(255, 38, 38, 0)";
          }
        : undefined;

      const secondaryEnterHandler = currentSecondaryCtaRef
        ? () => {
            currentSecondaryCtaRef.style.transform = "translateY(-3px)";
            currentSecondaryCtaRef.style.boxShadow =
              "0 10px 20px rgba(255, 38, 38, 0.1)";
          }
        : undefined;

      const secondaryLeaveHandler = currentSecondaryCtaRef
        ? () => {
            currentSecondaryCtaRef.style.transform = "translateY(0)";
            currentSecondaryCtaRef.style.boxShadow =
              "0 0 0 rgba(255, 38, 38, 0)";
          }
        : undefined;

      try {
        // Check if we're on mobile (screen width < 768px)
        const isMobile = window.innerWidth < 768;

        // Skip animations on mobile
        if (isMobile) {
          // Make all elements visible immediately without animations
          if (currentHeadingRef) {
            currentHeadingRef.style.opacity = "1";
            currentHeadingRef.style.transform = "none";
          }

          if (currentSubHeadingRef) {
            currentSubHeadingRef.style.opacity = "1";
            currentSubHeadingRef.style.transform = "none";
          }

          if (currentCtaContainerRef) {
            currentCtaContainerRef.style.opacity = "1";
            currentCtaContainerRef.style.transform = "none";
          }

          if (currentPrimaryCtaRef) {
            currentPrimaryCtaRef.style.opacity = "1";
            currentPrimaryCtaRef.style.transform = "none";
            currentPrimaryCtaRef.style.scale = "1";
          }

          if (currentSecondaryCtaRef) {
            currentSecondaryCtaRef.style.opacity = "1";
            currentSecondaryCtaRef.style.transform = "none";
            currentSecondaryCtaRef.style.scale = "1";
          }
          return;
        }

        // Desktop animations
        // Initial setup - set initial state
        if (currentHeadingRef) {
          currentHeadingRef.style.opacity = "0";
          currentHeadingRef.style.transform = "translateY(20px)";
          currentHeadingRef.style.transition =
            "opacity 0.9s ease, transform 0.9s ease";
        }

        if (currentSubHeadingRef) {
          currentSubHeadingRef.style.opacity = "0";
          currentSubHeadingRef.style.transform = "translateY(20px)";
          currentSubHeadingRef.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
        }

        if (currentCtaContainerRef) {
          currentCtaContainerRef.style.opacity = "0";
          currentCtaContainerRef.style.transition = "opacity 0.7s ease";
        }

        if (currentPrimaryCtaRef) {
          currentPrimaryCtaRef.style.opacity = "0";
          currentPrimaryCtaRef.style.transform = "translateY(15px)";
          currentPrimaryCtaRef.style.scale = "0.95";
          currentPrimaryCtaRef.style.transition =
            "opacity 0.7s ease, transform 0.7s ease, scale 0.7s ease";
        }

        if (currentSecondaryCtaRef) {
          currentSecondaryCtaRef.style.opacity = "0";
          currentSecondaryCtaRef.style.transform = "translateY(15px)";
          currentSecondaryCtaRef.style.scale = "0.95";
          currentSecondaryCtaRef.style.transition =
            "opacity 0.7s ease, transform 0.7s ease, scale 0.7s ease";
        }

        // Trigger animations with appropriate timing
        setTimeout(() => {
          if (currentHeadingRef) {
            currentHeadingRef.style.opacity = "1";
            currentHeadingRef.style.transform = "translateY(0)";
          }

          setTimeout(() => {
            if (currentSubHeadingRef) {
              currentSubHeadingRef.style.opacity = "1";
              currentSubHeadingRef.style.transform = "translateY(0)";
            }

            setTimeout(() => {
              if (currentCtaContainerRef) {
                currentCtaContainerRef.style.opacity = "1";
              }

              setTimeout(() => {
                if (currentPrimaryCtaRef) {
                  currentPrimaryCtaRef.style.opacity = "1";
                  currentPrimaryCtaRef.style.transform = "translateY(0)";
                  currentPrimaryCtaRef.style.scale = "1";
                }

                setTimeout(() => {
                  if (currentSecondaryCtaRef) {
                    currentSecondaryCtaRef.style.opacity = "1";
                    currentSecondaryCtaRef.style.transform = "translateY(0)";
                    currentSecondaryCtaRef.style.scale = "1";
                  }
                }, 250); // Delay between primary and secondary button
              }, 100); // Delay before buttons
            }, 200); // Delay before CTA container
          }, 300); // Delay before subheading
        }, 200); // Initial delay for heading

        // Add hover animations for buttons (desktop only)
        if (
          currentPrimaryCtaRef &&
          primaryEnterHandler &&
          primaryLeaveHandler
        ) {
          currentPrimaryCtaRef.addEventListener(
            "mouseenter",
            primaryEnterHandler
          );
          currentPrimaryCtaRef.addEventListener(
            "mouseleave",
            primaryLeaveHandler
          );
        }

        if (
          currentSecondaryCtaRef &&
          secondaryEnterHandler &&
          secondaryLeaveHandler
        ) {
          currentSecondaryCtaRef.addEventListener(
            "mouseenter",
            secondaryEnterHandler
          );
          currentSecondaryCtaRef.addEventListener(
            "mouseleave",
            secondaryLeaveHandler
          );
        }
      } catch (error) {
        console.error("Animation error in HeroSection:", error);

        // Fallback: ensure content is visible even if animation fails
        const elements = [
          currentHeadingRef,
          currentSubHeadingRef,
          currentCtaContainerRef,
          currentPrimaryCtaRef,
          currentSecondaryCtaRef,
        ];

        elements.forEach((el) => {
          if (el) {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
      }

      // Cleanup event listeners with proper references
      return () => {
        if (
          currentPrimaryCtaRef &&
          primaryEnterHandler &&
          primaryLeaveHandler
        ) {
          currentPrimaryCtaRef.removeEventListener(
            "mouseenter",
            primaryEnterHandler
          );
          currentPrimaryCtaRef.removeEventListener(
            "mouseleave",
            primaryLeaveHandler
          );
        }

        if (
          currentSecondaryCtaRef &&
          secondaryEnterHandler &&
          secondaryLeaveHandler
        ) {
          currentSecondaryCtaRef.removeEventListener(
            "mouseenter",
            secondaryEnterHandler
          );
          currentSecondaryCtaRef.removeEventListener(
            "mouseleave",
            secondaryLeaveHandler
          );
        }
      };
    }, []);

    return (
      <section className={className}>
        <SectionPadding>
          <div
            ref={rootContainerRef}
            className={`${
              compactContainerB
                ? "root-container compact-container"
                : "root-container"
            }`}
          >
            <div className="content">
              {head ? (
                <h2
                  ref={headingRef}
                  className={secondaryHead ? "secondary-head" : "head"}
                >
                  {head}
                </h2>
              ) : null}
              {subHead ? (
                <h3 ref={subHeadingRef} className="sub-head">
                  {subHead}
                </h3>
              ) : null}
              {primaryCta || secondaryCta ? (
                <div ref={ctaContainerRef} className="cta-container">
                  {!subscription && primaryCta ? (
                    <button
                      ref={primaryCtaRef}
                      className="primary-cta"
                      onClick={onPrimaryCtaClick}
                    >
                      {primaryCta}
                    </button>
                  ) : null}
                  {secondaryCta ? (
                    <button
                      ref={secondaryCtaRef}
                      className="secondary-cta"
                      onClick={onSecondaryCTAClick}
                    >
                      {secondaryCta}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>

            <IconShowcase head={headB} subHead={subHeadB} icons={icons} />
          </div>
        </SectionPadding>
      </section>
    );
  }
)`
  position: relative;
  width: 100%;
  background: #fff;
  ${headerSpacing()}

  .root-container {
    background: #fff;
    font-family: var(--font-exo);
    display: flex;
    flex-direction: column;
    gap: 37px;
    ${maxWidthContainer}

    @media (min-width: 992px) {
      gap: 56px;
      margin: auto;
    }

     @media (min-width: 1950px) {
      gap: 114px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;

      @media (min-width: 992px) {
        gap: 4px;
      }

      h2.head {
        margin: 0;
        color: #000c2d;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        text-align: center;
        max-width: 12ch;

        @media (min-width: 992px) {
          font-size: 69.512px;
          max-width: unset;
        }

        @media (min-width: 1950px) {
          font-size: 99.512px;
        }
      }

      .secondary-head {
        margin: 0;
        color: #000c2d;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        text-align: center;
        max-width: 32ch;

        @media (min-width: 992px) {
          font-size: 68px;
          max-width: unset;
        }
      }

      h3.sub-head {
        font-family: var(--font-fustat);
        margin: 0;
        color: #626161;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        @media (min-width: 992px) {
          font-size: 19.9px;
        }

        @media (min-width: 1950px) {
          font-size: 28.432px;
        }
      }

      .cta-container {
        padding-top: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 9px;
        width: 100%;

        @media (min-width: 992px) {
          width: unset;
          padding-top: 33px;
          flex-direction: row;
          gap: 16px;
        }

        @media (min-width: 1950px) {
          width: unset;
          padding-top: 49px;
          flex-direction: row;
          gap: 16px;
        }

        .primary-cta {
          border-radius: 8px;
          border: 1.699px solid transparent;
          background: #ff2626;
          padding: 11px 33px;
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          font-family: var(--font-fustat);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          width: 90%;

          @media (min-width: 992px) {
            width: unset;
            padding: 15px 40px;
            font-size: 16.5px;
            leading-trim: both;
            text-edge: cap;
            will-change: transform, opacity, box-shadow;
            transform: translateZ(0);
          }

          @media (min-width: 1950px) {
            padding: 21px 58px;
            font-size: 23.521px;
          }
        }

        .secondary-cta {
          border-radius: 8px;
          border: 1.699px solid #e03233;
          padding: 11px 33px;
          background: transparent;
          color: #ff2626;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          font-family: var(--font-fustat);
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          width: 90%;

         @media (min-width: 992px) {
            width: unset;
            padding: 15px 40px;
            font-size: 16.5px;
            leading-trim: both;
            text-edge: cap;
            will-change: transform, opacity, box-shadow;
            transform: translateZ(0);
          }

          @media (min-width: 1950px) {
            padding: 21px 58px;
            font-size: 23.521px;
          }
        }
      }
    }
  }

  .compact-container {
    gap: 12px;
    @media (min-width: 992px) {
      gap: 24px;
    }
  }
`;

export default HeroSection;
