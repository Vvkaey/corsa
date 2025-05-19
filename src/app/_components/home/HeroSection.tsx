"use client";

import React, { useRef } from "react";
import styled from "styled-components";
import { JSX } from "react";
import {
  SectionPadding,
  headerSpacing,
  maxWidthContainer,
} from "../new_mixins/mixins";
import { IconShowcase } from "./IconShowcase";
import {
  BADGES,
  useMentorshipContext,
} from "@/app/_contexts/MentorshipContext";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import gsap from "gsap";

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
    htmlId,
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
    htmlId?: string;
  }) => {
    // Create refs for animation
    const sectionRef = useRef<HTMLElement>(null);
    const rootContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subHeadingRef = useRef<HTMLHeadingElement>(null);
    const ctaContainerRef = useRef<HTMLDivElement>(null);
    const primaryCtaRef = useRef<HTMLButtonElement>(null);
    const secondaryCtaRef = useRef<HTMLButtonElement>(null);

    const { subscription, badge } = useMentorshipContext();
    const { width } = useWindowSize();
    const isMobile = (width ?? 0) < 768;
    const gsapContext = useGsapContext();

    useIsomorphicLayoutEffect(() => {
      if (!sectionRef.current || !rootContainerRef.current) return;

      gsapContext.add(() => {
        // Skip animations on mobile - immediately show everything
        if (isMobile) {
          // Make all elements visible immediately without animations
          gsap.set(
            [
              headingRef.current,
              subHeadingRef.current,
              ctaContainerRef.current,
              primaryCtaRef.current,
              secondaryCtaRef.current,
            ],
            {
              opacity: 1,
              clearProps: "transform",
            }
          );
          return;
        }

        // Set initial states for desktop animations
        // Heading
        gsap.set(headingRef.current, {
          opacity: 0,
          y: 10, // Smaller offset for faster animation
        });

        // Subheading
        gsap.set(subHeadingRef.current, {
          opacity: 0,
          y: 10, // Smaller offset for faster animation
        });

        // CTA container
        gsap.set(ctaContainerRef.current, {
          opacity: 0,
        });

        // Primary CTA
        if (primaryCtaRef.current && !subscription) {
          gsap.set(primaryCtaRef.current, {
            opacity: 1, // Make it visible from the start
            width: "10%", // Start with 0 width
            // Remove horizontal padding initially
            overflow: "hidden",
            x: -350,
            whiteSpace: "nowrap",
          });
        }

        // Secondary CTA
        if (secondaryCtaRef.current) {
          gsap.set(secondaryCtaRef.current, {
            opacity: 1, // Make it visible from the start
            width: "10%", // Start with 0 width
            // Remove horizontal padding initially
            overflow: "hidden",
            x: 350,
            whiteSpace: "nowrap",
          });
        }

        // Create animation timeline with faster, more synchronous timing
        const tl = gsap.timeline({
          defaults: {
            duration: 0.5, // Faster animations
            ease: "power2.out",
          },
        });

        // Heading animation
        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
        });

        // Subheading animation - start almost immediately
        tl.to(
          subHeadingRef.current,
          {
            opacity: 1,
            y: 0,
          },
          "-=0.3"
        ); // Overlap with the heading animation

        // CTA container - start almost immediately
        tl.to(
          ctaContainerRef.current,
          {
            opacity: 1,
          },
          "-=0.3"
        ); // Overlap with the subheading animation

        // Primary CTA button - start almost immediately
        if (primaryCtaRef.current && !subscription) {
          tl.to(
            primaryCtaRef.current,
            {
              width: "90%", // Expand to full width
              // padding: '11px 33px', // Restore full padding
              duration: 0.6, // Slightly longer duration for visibility
              x: 0,
              ease: "power1.out", // Different easing for better visibility
            },
            "-=0.5"
          ); // Overlap with CTA container animation
        }

        // Secondary CTA button - start with small delay
        if (secondaryCtaRef.current) {
          tl.to(
            secondaryCtaRef.current,
            {
              width: "90%", // Expand to full width
              // padding: '11px 33px', // Restore full padding
              duration: 0.6, // Slightly longer duration for visibility
              x: 0,
              ease: "power1.out", // Different easing for better visibility
            },
            "-=0.5"
          ); // Small overlap with primary button
        }

        // Setup ripple effect for hover (using existing CSS animation)
        // Implementation will use the ripple CSS animation already defined

        return () => {
          tl.kill();
        };
      });
    }, [subscription, width, isMobile, gsapContext]);

    return (
      <section className={className} id={htmlId} ref={sectionRef}>
        <SectionPadding>
          <div
            ref={rootContainerRef}
            className={`${
              compactContainerB
                ? "root-container compact-container"
                : "root-container"
            }`}
          >
            <div className="content" ref={contentRef}>
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
                    <div className="cta-wrapper">
                      <button
                        ref={primaryCtaRef}
                        className="primary-cta"
                        onClick={onPrimaryCtaClick}
                      >
                        {primaryCta}
                      </button>
                    </div>
                  ) : null}
                  {subscription && badge === BADGES.MARSHALL ? (
                    <div className="cta-wrapper">
                      <button
                        ref={secondaryCtaRef}
                        className={
                          subscription ? "primary-cta" : "secondary-cta"
                        }
                        onClick={onSecondaryCTAClick}
                      >
                        Add on Mentor Plan
                      </button>
                    </div>
                  ) : null}

                  {subscription && badge === BADGES.TACTICAL_ACE ? (
                    <div className="cta-wrapper">
                      <button
                        ref={secondaryCtaRef}
                        className={
                          subscription ? "primary-cta" : "secondary-cta"
                        }
                        onClick={onSecondaryCTAClick}
                      >
                        Add on Insight Plan
                      </button>
                    </div>
                  ) : null}
                  {secondaryCta ? (
                    <div
                      className={
                        (subscription && badge === BADGES.TOP_GUN) ? "cta-wrapper full" : "cta-wrapper"
                      }
                    >
                      <button
                        ref={secondaryCtaRef}
                        className={
                          subscription ? "primary-cta" : "secondary-cta"
                        }
                        onClick={onSecondaryCTAClick}
                      >
                        {secondaryCta}
                      </button>
                    </div>
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
          font-size: 20.9px;
        }

        @media (min-width: 1950px) {
          font-size: 28.432px;
        }
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

        .cta-wrapper {
          position: relative;
          overflow: hidden;
          width: 90%;
          margin: auto;
          .primary-cta {
            position: relative;
            border-radius: 8px;
            border: 1.699px solid transparent;
            background: #ff2626;
            padding: 11px 33px;
            color: #fff;
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
            font-family: var(--font-fustat);
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
            width: 100%;
            overflow: hidden;

            &::after {
              content: "";
              position: absolute;
              top: calc(50% - 2.5px + 5px);
              left: 50%;
              width: 5px;
              height: 5px;
              background: rgba(255, 255, 255, 0.4);
              opacity: 0;
              border-radius: 100%;
              transform: scale(1, 1) translate(-50%, -50%);
              transform-origin: 50% 50%;
            }

            &:hover {
              &::after {
                animation: ripple 0.6s ease-out;
              }
            }

            @media (min-width: 992px) {
              width: unset;
              padding: 10px 40px;
              font-size: 16.5px;
              leading-trim: both;
              text-edge: cap;
              will-change: transform, opacity, box-shadow;
              transform: translateZ(0);
            }

            @media (min-width: 1950px) {
              padding: 15px 58px;
              font-size: 23.521px;
            }
          }

          .secondary-cta {
            position: relative;
            border-radius: 8px;
            border: 1.699px solid #e03233;
            padding: 11px 33px;
            background: transparent;
            color: #ff2626;
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
            font-family: var(--font-fustat);
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
            width: 100%;
            overflow: hidden;

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

            &:hover {
              &::after {
                animation: ripple 0.6s ease-out;
              }
            }

            @media (min-width: 992px) {
              // width: unset;
              padding: 10px 40px;
              font-size: 16.5px;
              leading-trim: both;
              text-edge: cap;
              will-change: transform, opacity, box-shadow, width;
              transform: translateZ(0);
            }

            @media (min-width: 1950px) {
              padding: 15px 58px;
              font-size: 23.521px;
            }
          }

          .primary-cta,
          .secondary-cta {
            @media (min-width: 992px) {
              min-width: 240px;
            }

            @media (min-width: 1950px) {
              min-width: 290px;
            }
          }
        }

        .full {
          @media (min-width: 992px) {
            width: 100%;
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
