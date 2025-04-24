"use client";

import styled from "styled-components";
import Image from "next/image";
import { JSX, useEffect, useRef } from "react";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useAnimation } from "../../_utils/hooks/useAnimation"; // Import our new animation hook

// AnimatedIconShowcase component with improved GSAP animations
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

    // Get our new animation hook with a component-specific ID
    const animation = useAnimation('icon-showcase');

    // Setup for icon refs
    iconRefs.current = [];
    const addToIconRefs = (el: HTMLDivElement | null) => {
      if (el && !iconRefs.current.includes(el)) {
        iconRefs.current.push(el);
      }
    };

    useEffect(() => {
      // Store a reference to current refs for cleanup
      const currentIconRefs = [...iconRefs.current];
      
      // Create animation sequence using our enhanced animation system
      const sequence = animation.createSequence();

      // Animate heading
      if (headRef.current) {
        sequence.fromTo(
          headRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: "all" }
        );
      }

      // Animate subheading
      if (subHeadRef.current) {
        sequence.fromTo(
          subHeadRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: "all" },
          "-=0.3"
        );
      }

      // Fade in icon container
      if (iconContainerRef.current) {
        sequence.fromTo(
          iconContainerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, clearProps: "opacity" },
          "-=0.2"
        );
      }

      // For larger screens where the marquee animation is disabled, animate each icon
      if (width >= 992 && currentIconRefs.length) {
        sequence.fromTo(
          currentIconRefs,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            clearProps: "all"
          },
          "-=0.5"
        );

        // Add hover effects for each icon
        const cleanupFunctions = currentIconRefs.map(icon => {
          if (icon) {
            return animation.addHoverAnimation(icon, 1.05, -5);
          }
          return () => {};
        });
        
        // Return cleanup function
        return () => {
          // Call all cleanup functions
          cleanupFunctions.forEach(cleanup => cleanup());
          
          // Kill the timeline
          sequence.kill();
        };
      }
      
      return () => {
        // Kill the timeline
        sequence.kill();
      };
    }, [width, animation]);

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
                        alt={item.name || "icon"}
                        width={width > 992 ? 92 : 35}
                        height={width > 992 ? 92 : 35}
                        style={{ objectFit: "contain" }}
                      />
                      <p className="icon-text">{item.name}</p>
                    </div>
                  );
                })}
              </div>
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
  margin-top: 22px;

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
        font-weight: 600;
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

export default IconShowcase;