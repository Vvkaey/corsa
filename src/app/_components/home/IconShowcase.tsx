"use client";

import styled from "styled-components";
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";

// IconShowcase component with fixed animations for both mobile and desktop
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

    // Mobile states
    const [showFirstGroup, setShowFirstGroup] = useState(true);
    const [showSecondGroup, setShowSecondGroup] = useState(false);
    const [showThirdGroup, setShowThirdGroup] = useState(false);
    const [showForthGroup, setShowForthGroup] = useState(false);
    const [showFifthGroup, setShowFifthGroup] = useState(false);

    // Desktop states
    const [isFirstDesktopGroup, setIsFirstDesktopGroup] = useState(true);

    // Refs for animation
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

    // Handle hover effects for desktop icons
    useEffect(() => {
      // For SSR safety
      if (typeof window === "undefined") return;

      // Skip for mobile
      if (width < 992) return;

      // Add hover effects for icons on desktop
      const enterHandlers: { [key: number]: (e: MouseEvent) => void } = {};
      const leaveHandlers: { [key: number]: (e: MouseEvent) => void } = {};
      const currentIconRefs = [...iconRefs.current];

      currentIconRefs.forEach((icon, index) => {
        if (icon) {
          // Create named functions for event handlers so they can be properly removed
          const enterHandler = () => {
            if (icon) {
              icon.style.transform = "translateY(-5px) scale(1.05)";
              icon.style.transition = "transform 0.3s ease";
            }
          };

          const leaveHandler = () => {
            if (icon) {
              icon.style.transform = "translateY(0) scale(1)";
              icon.style.transition = "transform 0.3s ease";
            }
          };

          // Store handlers for cleanup
          enterHandlers[index] = enterHandler;
          leaveHandlers[index] = leaveHandler;

          // Add event listeners
          icon.addEventListener("mouseenter", enterHandler);
          icon.addEventListener("mouseleave", leaveHandler);
        }
      });

      // Return cleanup function
      return () => {
        // Clean up event listeners
        currentIconRefs.forEach((icon, index) => {
          if (icon) {
            if (enterHandlers[index]) {
              icon.removeEventListener("mouseenter", enterHandlers[index]);
            }
            if (leaveHandlers[index]) {
              icon.removeEventListener("mouseleave", leaveHandlers[index]);
            }
          }
        });
      };
    }, [width]);

    // Handle desktop icon rotation - simplified
    useEffect(() => {
      if (typeof window === "undefined" || width < 992) return;

      console.log("Desktop animation effect running");

      // Create interval to toggle desktop group
      const intervalId = setInterval(() => {
        console.log("Desktop animation toggle", isFirstDesktopGroup);
        setIsFirstDesktopGroup((prev) => !prev);
      }, 4000);

      // Cleanup function
      return () => {
        console.log("Cleaning up desktop animation");
        clearInterval(intervalId);
      };
    }, [width, isFirstDesktopGroup]);

    // Handle mobile-specific animations
    useEffect(() => {
      // Skip for desktop or SSR
      if (width >= 992 || typeof window === "undefined") return;

      console.log("Mobile animation effect running");

      // Initialize state
      setShowFirstGroup(true);
      setShowSecondGroup(false);
      setShowThirdGroup(false);
      setShowForthGroup(false);
      setShowFifthGroup(false);

      let currentGroup = 1;
      const animationTimers: NodeJS.Timeout[] = [];

      const rotateGroups = () => {
        console.log("Mobile rotating to next group", currentGroup);

        // Hide current group
        switch (currentGroup) {
          case 1:
            setShowFirstGroup(false);
            break;
          case 2:
            setShowSecondGroup(false);
            break;
          case 3:
            setShowThirdGroup(false);
            break;
          case 4:
            setShowForthGroup(false);
            break;
          case 5:
            setShowFifthGroup(false);
            break;
        }

        // Move to next group
        currentGroup = (currentGroup % 5) + 1;

        // After fade-out, show next group
        const timer = setTimeout(() => {
          // Show only the new current group
          setShowFirstGroup(currentGroup === 1);
          setShowSecondGroup(currentGroup === 2);
          setShowThirdGroup(currentGroup === 3);
          setShowForthGroup(currentGroup === 4);
          setShowFifthGroup(currentGroup === 5);
        }, 700);

        // Store timer for cleanup
        animationTimers.push(timer);
      };

      // Start rotation interval
      const intervalId = setInterval(rotateGroups, 4000);

      // Cleanup
      return () => {
        clearInterval(intervalId);
        animationTimers.forEach((timer) => clearTimeout(timer));
      };
    }, [width]);

    // Divide icons into groups for mobile
    const firstGroupIcons = icons?.slice(0, 2) || [];
    const secondGroupIcons = icons?.slice(2, 4) || [];
    const thirdGroupIcons = icons?.slice(4, 6) || [];
    const fourGroupIcons = icons?.slice(6, 8) || [];
    const fiveGroupIcons = icons?.slice(8, 10) || [];

    return (
      <section className={className}>
        <div className="content">
          {/* Header */}
          {head ? (
            <h3 className="head" ref={headRef}>
              {head}
            </h3>
          ) : null}

          {/* Subhead */}
          {subHead ? (
            <h4 className="sub-head" ref={subHeadRef}>
              {subHead}
            </h4>
          ) : null}

          {icons?.length ? (
            <div className="marquee-container" ref={iconContainerRef}>
              {/* Desktop view - Two groups of 5 icons each that rotate */}
              {width >= 992 && (
                <div className="desktop-groups-container">
                  <div
                    className={`icon-container desktop-container ${
                      isFirstDesktopGroup ? "show" : "hide"
                    }`}
                  >
                    {icons.slice(0, 5).map((item, index) => (
                      <div
                        key={`desktop-first-${index}`}
                        className="icon"
                        ref={addToIconRefs}
                      >
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          width={width > 1950 ? 92 : 65}
                          height={width > 1950 ? 92 : 65}
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`icon-container desktop-container ${
                      !isFirstDesktopGroup ? "show" : "hide"
                    }`}
                  >
                    {icons.slice(5, 10).map((item, index) => (
                      <div
                        key={`desktop-second-${index}`}
                        className="icon"
                        ref={addToIconRefs}
                      >
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          width={width > 1950 ? 92 : 65}
                          height={width > 1950 ? 92 : 65}
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile view - five groups that rotate */}
              {width < 992 && (
                <div className="mobile-groups-container">
                  <div
                    className={`${
                      showFirstGroup
                        ? "icon-container mobile-container show"
                        : "icon-container mobile-container hide"
                    }`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                    }}
                  >
                    {firstGroupIcons.map((item, index) => (
                      <div key={`first-${index}`} className="icon">
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${
                      showSecondGroup
                        ? "icon-container mobile-container abs show"
                        : "icon-container mobile-container abs hide"
                    }`}
                  >
                    {secondGroupIcons.map((item, index) => (
                      <div key={`second-${index}`} className="icon">
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${
                      showThirdGroup
                        ? "icon-container mobile-container abs show"
                        : "icon-container mobile-container abs hide"
                    }`}
                  >
                    {thirdGroupIcons.map((item, index) => (
                      <div key={`third-${index}`} className="icon">
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${
                      showForthGroup
                        ? "icon-container mobile-container abs show"
                        : "icon-container mobile-container abs hide"
                    }`}
                  >
                    {fourGroupIcons.map((item, index) => (
                      <div key={`forth-${index}`} className="icon">
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`${
                      showFifthGroup
                        ? "icon-container mobile-container abs show"
                        : "icon-container mobile-container abs hide"
                    }`}
                  >
                    {fiveGroupIcons.map((item, index) => (
                      <div key={`fifth-${index}`} className="icon">
                        <Image
                          src={item.icon}
                          alt={item.name || "icon"}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                        <p className="icon-text">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
  margin-top: 18px;

  @media (min-width: 992px) {
    margin-top: 22px;
  }

  .content {
    margin-top: unset;
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
      color: #5f5f5f;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      leading-trim: both;
      text-edge: cap;
      max-width: 37ch;

      @media (min-width: 992px) {
        text-align: center;
        max-width: 36ch;
        font-weight: 500;
        font-size: 19.9px;
      }

      @media (min-width: 1950px) {
        font-size: 28.432px;
      }
    }

    .marquee-container {
      position: relative;
      width: 100vw;
      overflow: hidden;
      max-width: 151.2rem;
      display: flex;
      min-height: 100px;
      margin-top: 10px;

      @media (min-width: 992px) {
        max-width: unset;
        min-height: unset;
        padding-bottom: 40px;
      }
      
      .desktop-groups-container {
        position: relative;
        width: 100%;
        height: 170px;
        display: flex;
        justify-content: center;
      }
      
      .mobile-groups-container {
        position: relative;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
      }

      .icon-container {
        padding-top: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        animation: none; /* Disable the marquee animation */

        /* Desktop styles */
        &.desktop-container {
          gap: 72px;
          padding-top: 26px;
          transition: opacity 0.7s ease-in-out;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;

          &.show {
            opacity: 1;
            // transform: translateY(0);
          }

          &.hide {
            opacity: 0;
            // transform: translateY(15px);
            pointer-events: none;
          }

          @media (min-width: 1950px) {
            gap: 100px;
            padding-top: 39px;
          }
        }

        &.show {
          opacity: 1;
          transition: opacity 0.9s ease-in;
          // transform: translateY(0);
        }

        &.hide {
          opacity: 0;
          transition: opacity 0.6s ease-out;
          // transform: translateY(10px);
          pointer-events: none;
        }

        &.abs {
          position: absolute;
          top: 0;
          left: 0;
        }

        /* Mobile styles */
        &.mobile-container {
          width: 100%;
          justify-content: space-evenly;
          padding: 0 20px;
          transition: opacity 0.7s ease-in-out;

          /* We need a fixed height to prevent layout shifts */
          min-height: 70px;

          .icon{
          @media (max-width: 992px) {
            width: 45px;
            height: 45px;
          }

          img{
           @media (max-width: 992px){
            width: 100%;
            height: auto;
            object-fit: contain;
            }
          }
        }

        .icon {
          position: relative;
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
            position: absolute;
            bottom: -20px;
          }

          img {
            object-fit: contain;
          }
        }
      }
    }
  }
`;

export default IconShowcase;
