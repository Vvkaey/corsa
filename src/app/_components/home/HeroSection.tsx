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
import { useRouter } from "next/navigation";

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
    // const headingRef = useRef<HTMLHeadingElement>(null);
    // const subHeadingRef = useRef<HTMLHeadingElement>(null);
    const ctaContainerRef = useRef<HTMLDivElement>(null);
    const primaryCtaRef = useRef<HTMLButtonElement>(null);
    const secondaryCtaRef = useRef<HTMLButtonElement>(null);
    const marshallCtaRef = useRef<HTMLButtonElement>(null);
    const tacticalAceCtaRef = useRef<HTMLButtonElement>(null);
    const topGunCtaRef = useRef<HTMLButtonElement>(null);

    const { subscription, badge } = useMentorshipContext();
    // const { width } = useWindowSize();
    // const isMobile = (width ?? 0) < 768;
    // const gsapContext = useGsapContext();
    const router = useRouter();

    // useIsomorphicLayoutEffect(() => {
    //   if (!sectionRef.current || !rootContainerRef.current) return;

    //   gsapContext.add(() => {
    //     // Make all elements visible immediately without animations
    //     gsap.set(
    //       [
    //         ctaContainerRef.current,
    //         primaryCtaRef.current,
    //         secondaryCtaRef.current,
    //         marshallCtaRef.current,
    //         tacticalAceCtaRef.current,
    //         topGunCtaRef.current,
    //       ],
    //       {
    //         opacity: 1,
    //         clearProps: "transform,width,x,overflow,whiteSpace",
    //       }
    //     );

    //     return () => {
    //       // No timeline to kill since we're not creating one
    //     };
    //   });
    // }, [subscription, badge, width, isMobile, gsapContext]);

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
                  // ref={headingRef}
                  className={secondaryHead ? "secondary-head" : "head"}
                >
                  {head}
                </h2>
              ) : null}
              {subHead ? (
                <h3
                  //  ref={subHeadingRef}
                  className="sub-head"
                >
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
                        ref={marshallCtaRef}
                        className={
                          subscription ? "primary-cta" : "secondary-cta"
                        }
                        onClick={() => router.push("/pricing")}
                      >
                        Add on Mentor Plan
                      </button>
                    </div>
                  ) : null}

                  {subscription && badge === BADGES.TACTICAL_ACE ? (
                    <div className="cta-wrapper">
                      <button
                        ref={tacticalAceCtaRef}
                        className={
                          subscription ? "primary-cta" : "secondary-cta"
                        }
                        onClick={() => router.push("/pricing")}
                      >
                        Add on Insight Plan
                      </button>
                    </div>
                  ) : null}
                  {secondaryCta ? (
                    <div
                      className={
                        subscription && badge === BADGES.TOP_GUN
                          ? "cta-wrapper full"
                          : "cta-wrapper "
                      }
                    >
                      <button
                        ref={secondaryCtaRef}
                        className={
                          subscription && badge === BADGES.TOP_GUN
                            ? "primary-cta"
                            : "secondary-cta"
                        }
                        onClick={onSecondaryCTAClick}
                      >
                        {secondaryCta}
                      </button>
                    </div>
                  ) : null}

                  {subscription && badge === BADGES.TOP_GUN && !secondaryCta ? (
                    <div className="cta-wrapper full">
                      <button
                        ref={topGunCtaRef}
                        className="primary-cta"
                        onClick={() => router.push("/pricing")}
                      >
                        Add on Top Gun Plan
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
            font-weight: 600;
            line-height: normal;
            font-family: var(--font-fustat);
            cursor: pointer;
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;

            @media (min-width: 992px) {
              width: unset;
              padding: 10px 40px;
              font-size: 16.5px;
              leading-trim: both;
              text-edge: cap;
            }

            @media (min-width: 1950px) {
              padding: 13px 58px;
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
            font-weight: 600;
            line-height: normal;
            font-family: var(--font-fustat);
            cursor: pointer;
            width: 100%;
            overflow: hidden;

            @media (min-width: 992px) {
              padding: 10px 40px;
              font-size: 16.5px;
              leading-trim: both;
              text-edge: cap;
            }

            @media (min-width: 1950px) {
              padding: 13px 58px;
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
