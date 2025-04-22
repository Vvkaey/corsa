"use client";
import styled from "styled-components";
import Image from "next/image";
import { JSX, useEffect, useRef } from "react";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { headerSpacing, maxWidthContainer, SectionPadding } from "../new_mixins/mixins";
import gsap from "gsap";

// AnimatedIconShowcase component with GSAP animations
export const IconShowcase = styled(
  ({
    className,
    head,
    subHead,
    icons,
  }: {
    className?: string;
    head?: string | JSX.Element;
    subHead?: string | JSX.Element;
    icons?: Record<string, string>[];
  }) => {
    const { width = 0 } = useWindowSize();

    // Create refs for animation
    const headRef = useRef<HTMLHeadingElement>(null);
    const subHeadRef = useRef<HTMLHeadingElement>(null);
    const iconContainerRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Setup for icon refs
    iconRefs.current = [];
    const addToIconRefs = (el: HTMLDivElement | null) => {
      if (el && !iconRefs.current.includes(el)) {
        iconRefs.current.push(el);
      }
    };

    useEffect(() => {
      // Animation for the icon showcase section
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.8, // Delay this animation until after main hero animation
      });

      // Animate heading
      if (headRef.current) {
        tl.fromTo(
          headRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        );
      }

      // Animate subheading
      if (subHeadRef.current) {
        tl.fromTo(
          subHeadRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );
      }

      // Instead of animating the marquee directly (which would interfere with its own animation),
      // we'll just fade it in
      if (iconContainerRef.current) {
        tl.fromTo(
          iconContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );
      }

      // For larger screens where the marquee animation is disabled, we'll animate each icon
      if (width >= 992 && iconRefs.current.length) {
        tl.fromTo(
          iconRefs.current,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.5"
        );

        // Add subtle hover effect for icons
        iconRefs.current.forEach((icon) => {
          if (icon) {
            icon.addEventListener("mouseenter", () => {
              gsap.to(icon, { y: -5, scale: 1.05, duration: 0.3 });
            });

            icon.addEventListener("mouseleave", () => {
              gsap.to(icon, { y: 0, scale: 1, duration: 0.3 });
            });
          }
        });
      }

      // Store current icons for cleanup
      const currentIcons = [...iconRefs.current];

      // Define event handlers
      const handleIconEnter = (icon: HTMLDivElement) => {
        gsap.to(icon, { y: -5, scale: 1.05, duration: 0.3 });
      };

      const handleIconLeave = (icon: HTMLDivElement) => {
        gsap.to(icon, { y: 0, scale: 1, duration: 0.3 });
      };

      // Add event listeners with proper handlers
      if (width >= 992) {
        currentIcons.forEach((icon) => {
          if (icon) {
            icon.addEventListener("mouseenter", () => handleIconEnter(icon));
            icon.addEventListener("mouseleave", () => handleIconLeave(icon));
          }
        });
      }

      return () => {
        // Cleanup event listeners with same function references
        if (width >= 992) {
          currentIcons.forEach((icon) => {
            if (icon) {
              icon.removeEventListener("mouseenter", () =>
                handleIconEnter(icon)
              );
              icon.removeEventListener("mouseleave", () =>
                handleIconLeave(icon)
              );
            }
          });
        }
      };
    }, [width]);

    return (
      <section className={className}>
        <div className="content">
          {head ? (
            <h3 className="head" ref={headRef}>
              {head}
            </h3>
          ) : null}
          {subHead ? (
            <h4 className="sub-head" ref={subHeadRef}>
              {" "}
              {subHead}
            </h4>
          ) : null}
          {icons?.length ? (
            <div
              className="marquee-container"
              style={{
                display: "flex",
              }}
              ref={iconContainerRef}
            >
              <div className="icon-container">
                {icons.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="icon"
                      ref={width >= 992 ? addToIconRefs : null}
                    >
                      <Image
                        src={item.icon}
                        alt="not-found-image"
                        width={93}
                        height={93}
                        style={{ objectFit: "contain" }}
                      />
                      <p className="icon-text">{item.name}</p>
                    </div>
                  );
                })}
              </div>
              {width && width < 992 ? (
                <div className="icon-container">
                  {icons.map((item, index) => {
                    return (
                      <div key={index} className="icon">
                        <Image
                          src={item.icon}
                          alt="not-found-image"
                          width={78}
                          height={78}
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    );
  }
)`
  width: 100%;
  background: #fff;
  font-family: var(--font-exo);
  text-align: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    h3.head {
      font-family: var(--font-fustat);
      margin: 0;
      color: #333;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      @media (min-width: 992px) {
        font-size: 20px;
      }
    }

    h4.sub-head {
      font-family: var(--font-exo);
      margin: 0;
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      leading-trim: both;
      text-edge: cap;
      max-width: 37ch;

      @media (min-width: 992px) {
        text-align: center;
        max-width: 36ch;
        color: #5f5f5f;
        font-size: 28.432px;
        font-weight: 500;
      }
    }
    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .marquee-container {
      position: relative;
      width: 100vw;
      overflow: hidden;
      max-width: 151.2rem;
      display: flex;
      padding-top: 30px;

      @media (min-width: 992px) {
        padding-top: unset;
        max-width: unset;
      }
      .icon-container {
        padding-left: 6.5px;
        padding-tight: 6.5px;
        padding-top: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: marquee 17s linear infinite;

        gap: 24px;

        @media (min-width: 992px) {
          animation: none;
          gap: 85px;
          padding-top: 39px;
          width: 100%;
        }

        .icon {
          position: relative;

          // height: 100%;
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          justify-content: center;

          @media (min-width: 992px) {
            flex-direction: column;
            gap: 12px;
          }

          .icon-text {
            z-index: 1;
            display: flex;
            white-space: nowrap;
            color: #5f5f5f;
            font-size: 15.008px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }

          img {
            object-fit: contain;
          }
        }
      }
    }
  }
`;

// Animated HeroSection with GSAP
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
      // Initial setup - hide elements
      gsap.set([headingRef.current, subHeadingRef.current], {
        opacity: 0,
        y: 20,
      });

      // Create timeline for hero animations with slightly slower timing overall
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" }, // Changed to smoother easing
        delay: 0.3, // Slightly longer initial delay
      });

      // Add debug visual indicator for development
      const showDebugHighlight = false; // Set to true to see animation areas highlighted
      if (showDebugHighlight && primaryCtaRef.current) {
        gsap.set(primaryCtaRef.current, {
          boxShadow: "0 0 0 4px rgba(255, 0, 0, 0.5)",
        });
      }

      // Animate main heading
      if (headingRef.current) {
        tl.to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 1.0 } // Longer duration
        );
      }

      // Animate subheading
      if (subHeadingRef.current) {
        tl.to(
          subHeadingRef.current,
          { opacity: 1, y: 0, duration: 0.9 }, // Longer duration
          "-=0.6" // Less overlap
        );
      }

      // Animate CTA container with a clearer visualization
      if (ctaContainerRef.current) {
        gsap.set(ctaContainerRef.current, {
          opacity: 0,
          y: 20,
        });

        tl.to(
          ctaContainerRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        );
      }

      // Animate CTA buttons with smoother, more gradual animation
      if (primaryCtaRef.current || secondaryCtaRef.current) {
        const buttons = [primaryCtaRef.current, secondaryCtaRef.current].filter(
          Boolean
        );

        // First make sure buttons are initially invisible
        gsap.set(buttons, { opacity: 0, scale: 0.9, y: 15 });

        // Then animate them with a smoother, more deliberate timing
        tl.to(
          buttons,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8, // Longer duration for smoother appearance
            stagger: 0.25, // More delay between buttons
            ease: "power2.out", // Smoother easing function
          },
          "-=0.1"
        );
      }

      // Add hover animations for buttons
      if (primaryCtaRef.current) {
        primaryCtaRef.current.addEventListener("mouseenter", () => {
          gsap.to(primaryCtaRef.current, {
            y: -3,
            boxShadow: "0 10px 20px rgba(255, 38, 38, 0.2)",
            duration: 0.3,
          });
        });

        primaryCtaRef.current.addEventListener("mouseleave", () => {
          gsap.to(primaryCtaRef.current, {
            y: 0,
            boxShadow: "0 0 0 rgba(255, 38, 38, 0)",
            duration: 0.3,
          });
        });
      }

      if (secondaryCtaRef.current) {
        secondaryCtaRef.current.addEventListener("mouseenter", () => {
          gsap.to(secondaryCtaRef.current, {
            y: -3,
            boxShadow: "0 10px 20px rgba(255, 38, 38, 0.1)",
            duration: 0.3,
          });
        });

        secondaryCtaRef.current.addEventListener("mouseleave", () => {
          gsap.to(secondaryCtaRef.current, {
            y: 0,
            boxShadow: "0 0 0 rgba(255, 38, 38, 0)",
            duration: 0.3,
          });
        });
      }

      // Store refs in variables to use in cleanup
      const primaryBtn = primaryCtaRef.current;
      const secondaryBtn = secondaryCtaRef.current;

      // Define event handlers
      const handlePrimaryEnter = () => {
        gsap.to(primaryBtn, {
          y: -3,
          boxShadow: "0 10px 20px rgba(255, 38, 38, 0.2)",
          duration: 0.3,
        });
      };

      const handlePrimaryLeave = () => {
        gsap.to(primaryBtn, {
          y: 0,
          boxShadow: "0 0 0 rgba(255, 38, 38, 0)",
          duration: 0.3,
        });
      };

      const handleSecondaryEnter = () => {
        gsap.to(secondaryBtn, {
          y: -3,
          boxShadow: "0 10px 20px rgba(255, 38, 38, 0.1)",
          duration: 0.3,
        });
      };

      const handleSecondaryLeave = () => {
        gsap.to(secondaryBtn, {
          y: 0,
          boxShadow: "0 0 0 rgba(255, 38, 38, 0)",
          duration: 0.3,
        });
      };

      // Add event listeners
      if (primaryBtn) {
        primaryBtn.addEventListener("mouseenter", handlePrimaryEnter);
        primaryBtn.addEventListener("mouseleave", handlePrimaryLeave);
      }

      if (secondaryBtn) {
        secondaryBtn.addEventListener("mouseenter", handleSecondaryEnter);
        secondaryBtn.addEventListener("mouseleave", handleSecondaryLeave);
      }

      return () => {
        // Clean up event listeners with the same function references
        if (primaryBtn) {
          primaryBtn.removeEventListener("mouseenter", handlePrimaryEnter);
          primaryBtn.removeEventListener("mouseleave", handlePrimaryLeave);
        }

        if (secondaryBtn) {
          secondaryBtn.removeEventListener("mouseenter", handleSecondaryEnter);
          secondaryBtn.removeEventListener("mouseleave", handleSecondaryLeave);
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
                    <button ref={secondaryCtaRef} className="secondary-cta" onClick={onSecondaryCTAClick}>
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
    // border: 1px solid red;
    ${maxWidthContainer}

    @media (min-width: 992px) {
      gap: 114px;
      margin : auto;
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
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        @media (min-width: 992px) {
          font-size: 28.432px;
        }
      }

      .cta-container {
        padding-top: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 12px;

        @media (min-width: 992px) {
          padding-top: 49px;
          flex-direction: row;
          gap: 16px;
        }

        .primary-cta {
          border-radius: 8px;
          border: 1.699px solid #fae3ca;
          background: #ff2626;
          padding: 14px 33px;
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          font-family: var(--font-fustat);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          @media (min-width: 992px) {
            padding: 26px 58px;
            font-size: 16.5px;
            leading-trim: both;
            text-edge: cap;
            font-size: 23.521px;
          }
        }

        .secondary-cta {
          border-radius: 8px;
          border: 1.699px solid #e03233;
          padding: 14px 33px;
          background: transparent;
          color: #ff2626;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          font-family: var(--font-fustat);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          @media (min-width: 992px) {
            padding: 26px 58px;
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
