"use client";

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { JSX } from "react";
import { SectionPadding, headerSpacing, maxWidthContainer } from "../new_mixins/mixins";
import gsap from "gsap";
import IconShowcase from "./IconShowcase";

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


    useEffect(() => {
      // Create a master timeline for smooth sequencing
      const masterTimeline = gsap.timeline({
        defaults: { 
          ease: "power2.out",
          duration: 0.8,
          overwrite: "auto" // Important for preventing animation conflicts
        }
      });

      // Pre-set the initial states for proper stacking context
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 20 });
      }
      
      if (subHeadingRef.current) {
        gsap.set(subHeadingRef.current, { opacity: 0, y: 20 });
      }
      
      if (ctaContainerRef.current) {
        gsap.set(ctaContainerRef.current, { opacity: 0 });
      }
      
      if (primaryCtaRef.current) {
        gsap.set(primaryCtaRef.current, { opacity: 0, y: 15, scale: 0.95 });
      }
      
      if (secondaryCtaRef.current) {
        gsap.set(secondaryCtaRef.current, { opacity: 0, y: 15, scale: 0.95 });
      }

      // Use a short delay before starting animations
      masterTimeline.delay(0.2);
      
      // Heading animation with smoother easing
      if (headingRef.current) {
        masterTimeline.to(headingRef.current, {
          opacity: 1, 
          y: 0,
          ease: "power3.out", // Smoother easing for text
          duration: 0.9
        });
      }
      
      // Subheading animation
      if (subHeadingRef.current) {
        masterTimeline.to(subHeadingRef.current, {
          opacity: 1, 
          y: 0,
          ease: "power3.out",
          duration: 0.8
        }, "-=0.6"); // Slight overlap for natural flow
      }
      
      // Container first for proper stacking
      if (ctaContainerRef.current) {
        masterTimeline.to(ctaContainerRef.current, {
          opacity: 1,
          duration: 0.4
        }, "-=0.4");
      }
      
      // Animate buttons with precise control and smoother motion
      const buttons = [];
      if (primaryCtaRef.current) buttons.push(primaryCtaRef.current);
      if (secondaryCtaRef.current) buttons.push(secondaryCtaRef.current);
      
      if (buttons.length) {
        masterTimeline.to(buttons, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
          clearProps: "scale" // Important to prevent jittering
        }, "-=0.2");
      }
      
      // Store references for cleanup
      const primaryBtn = primaryCtaRef.current;
      const secondaryBtn = secondaryCtaRef.current;
      
      // Define handlers outside event listeners to maintain reference
      const enterPrimary = () => {
        if (!primaryBtn) return;
        gsap.to(primaryBtn, {
          y: -3,
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(255, 38, 38, 0.2)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      
      const leavePrimary = () => {
        if (!primaryBtn) return;
        gsap.to(primaryBtn, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(255, 38, 38, 0)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      
      const enterSecondary = () => {
        if (!secondaryBtn) return;
        gsap.to(secondaryBtn, {
          y: -3,
          scale: 1.02,
          boxShadow: "0 10px 20px rgba(255, 38, 38, 0.1)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      
      const leaveSecondary = () => {
        if (!secondaryBtn) return;
        gsap.to(secondaryBtn, {
          y: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(255, 38, 38, 0)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      
      // Add event listeners
      if (primaryBtn) {
        primaryBtn.addEventListener("mouseenter", enterPrimary);
        primaryBtn.addEventListener("mouseleave", leavePrimary);
      }
      
      if (secondaryBtn) {
        secondaryBtn.addEventListener("mouseenter", enterSecondary);
        secondaryBtn.addEventListener("mouseleave", leaveSecondary);
      }
      
      // Return cleanup function to prevent memory leaks
      return () => {
        if (primaryBtn) {
          primaryBtn.removeEventListener("mouseenter", enterPrimary);
          primaryBtn.removeEventListener("mouseleave", leavePrimary);
        }
        
        if (secondaryBtn) {
          secondaryBtn.removeEventListener("mouseenter", enterSecondary);
          secondaryBtn.removeEventListener("mouseleave", leaveSecondary);
        }
        
        // Kill all animations to prevent conflicts during unmount
        masterTimeline.kill();
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
                  {primaryCta ? (
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
      gap: 114px;
      margin: auto;
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
          font-size: 99.512px;
          max-width: unset;
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
          font-size: 28.432px;
        }
      }

      .cta-container {
        padding-top: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 12px;
        width: 100%;
        will-change: transform, opacity; /* Performance optimization */

        @media (min-width: 992px) {
          width: unset;
          padding-top: 49px;
          flex-direction: row;
          gap: 16px;
        }

        .primary-cta {
          border-radius: 8px;
          border: 1.699px solid #fae3ca;
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
          will-change: transform, opacity, box-shadow; /* Performance optimization */
          overflow: hidden; /* Prevent rendering artifacts */
          transform: translateZ(0); /* Force GPU acceleration */

          @media (min-width: 992px) {
            width: unset;
            padding: 21px 58px;
            font-size: 16.5px;
            leading-trim: both;
            text-edge: cap;
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
          will-change: transform, opacity, box-shadow; /* Performance optimization */
          overflow: hidden; /* Prevent rendering artifacts */
          transform: translateZ(0); /* Force GPU acceleration */

          @media (min-width: 992px) {
            width: unset;
            padding: 21px 58px;
            font-size: 16.5px;
            leading-trim: both;
            text-edge: cap;
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