"use client";

import styled from "styled-components";
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";

// IconShowcase component with fixed mobile animation
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
    const [showFirstGroup, setShowFirstGroup] = useState(true);

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

    // Handle desktop animations
    useEffect(() => {
      // For SSR safety
      if (typeof window === 'undefined') return;
      
      // Skip for mobile
      if (width < 768) return;
      
      // Store current ref values
      const currentHeadRef = headRef.current;
      const currentSubHeadRef = subHeadRef.current;
      const currentIconContainerRef = iconContainerRef.current;
      const currentIconRefs = [...iconRefs.current];
      
      // Create handler maps for cleanup
      const enterHandlers: { [key: number]: (e: MouseEvent) => void } = {};
      const leaveHandlers: { [key: number]: (e: MouseEvent) => void } = {};
      
      try {
        // Desktop animations
        // Set initial state
        if (currentHeadRef) {
          currentHeadRef.style.opacity = '0';
          currentHeadRef.style.transform = 'translateY(20px)';
          currentHeadRef.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        if (currentSubHeadRef) {
          currentSubHeadRef.style.opacity = '0';
          currentSubHeadRef.style.transform = 'translateY(15px)';
          currentSubHeadRef.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        
        if (currentIconContainerRef) {
          currentIconContainerRef.style.opacity = '0';
          currentIconContainerRef.style.transition = 'opacity 0.8s ease';
        }
        
        // For desktop, set initial state for each icon
        currentIconRefs.forEach(icon => {
          if (icon) {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(15px)';
            icon.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }
        });
        
        // Animate heading
        setTimeout(() => {
          if (currentHeadRef) {
            currentHeadRef.style.opacity = '1';
            currentHeadRef.style.transform = 'translateY(0)';
          }
          
          // Animate subheading with slight delay
          setTimeout(() => {
            if (currentSubHeadRef) {
              currentSubHeadRef.style.opacity = '1';
              currentSubHeadRef.style.transform = 'translateY(0)';
            }
            
            // Animate icon container
            setTimeout(() => {
              if (currentIconContainerRef) {
                currentIconContainerRef.style.opacity = '1';
              }
              
              // Animate each icon with staggered timing
              currentIconRefs.forEach((icon, index) => {
                setTimeout(() => {
                  if (icon) {
                    icon.style.opacity = '1';
                    icon.style.transform = 'translateY(0)';
                  }
                }, index * 100); // 100ms delay between each icon
              });
              
              // Add hover effects for icons on desktop
              currentIconRefs.forEach((icon, index) => {
                if (icon) {
                  // Create named functions for event handlers so they can be properly removed
                  const enterHandler = () => {
                    if (icon) {
                      icon.style.transform = 'translateY(-5px) scale(1.05)';
                      icon.style.transition = 'transform 0.3s ease';
                    }
                  };
                  
                  const leaveHandler = () => {
                    if (icon) {
                      icon.style.transform = 'translateY(0) scale(1)';
                      icon.style.transition = 'transform 0.3s ease';
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
            }, 200); // Delay before icon container
          }, 300); // Delay before subheading
        }, 800); // Delay for heading to wait for HeroSection animations
      } catch (error) {
        console.error("Animation error in IconShowcase:", error);
        
        // Fallback: ensure content is visible even if animation fails
        [currentHeadRef, currentSubHeadRef, currentIconContainerRef].forEach(el => {
          if (el) el.style.opacity = '1';
        });
        
        currentIconRefs.forEach(icon => {
          if (icon) icon.style.opacity = '1';
        });
      }
      
      // Cleanup event listeners using stored handlers
      return () => {
        currentIconRefs.forEach((icon, index) => {
          if (icon) {
            // Remove event listeners with the same handler references
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

    // Handle mobile-specific animations
    useEffect(() => {
      // Skip for desktop or SSR
      if (width >= 768 || typeof window === 'undefined') {
        return;
      }
      
      // Make header and subheader visible immediately
      if (headRef.current) {
        headRef.current.style.opacity = '1';
      }
      
      if (subHeadRef.current) {
        subHeadRef.current.style.opacity = '1';
      }
      
      if (iconContainerRef.current) {
        iconContainerRef.current.style.opacity = '1';
      }
      
      // Set an interval to toggle between groups
      const intervalId = setInterval(() => {
        setShowFirstGroup(prev => !prev);
      }, 4000); // Toggle every 4 seconds
      
      // Clean up interval on unmount
      return () => {
        clearInterval(intervalId);
      };
    }, [width]);

    // Divide icons into two groups for mobile
    const firstGroupIcons = icons?.slice(0, 3) || [];
    const secondGroupIcons = icons?.slice(3) || [];

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
              {/* Desktop view */}
              {width >= 768 && (
                <div className="icon-container desktop-container">
                  {icons.map((item, index) => (
                    <div
                      key={index}
                      className="icon"
                      ref={addToIconRefs}
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
                  ))}
                </div>
              )}
              
              {/* Mobile view - simplified alternating groups */}
              {width < 768 && (
                <>
                  {showFirstGroup ? (
                    <div className="icon-container mobile-container">
                      {firstGroupIcons.map((item, index) => (
                        <div key={`first-${index}`} className="icon">
                          <Image
                            src={item.icon}
                            alt={item.name || "icon"}
                            width={35}
                            height={35}
                            style={{ objectFit: "contain" }}
                          />
                          <p className="icon-text">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="icon-container mobile-container">
                      {secondGroupIcons.map((item, index) => (
                        <div key={`second-${index}`} className="icon">
                          <Image
                            src={item.icon}
                            alt={item.name || "icon"}
                            width={35}
                            height={35}
                            style={{ objectFit: "contain" }}
                          />
                          <p className="icon-text">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
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
        padding-top: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        animation: none; /* Disable the marquee animation */
        
        /* Desktop styles */
        &.desktop-container {
          gap: 85px;
          padding-top: 39px;
        }
        
        /* Mobile styles */
        &.mobile-container {
          width: 100%;
          justify-content: space-evenly;
          padding: 0 20px;
          animation: fadeInOut 0.5s ease;
          
          /* We need a fixed height to prevent layout shifts */
          min-height: 70px;
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
          }

          img {
            object-fit: contain;
          }
        }
      }
    }
  }
  
  /* Simple fade in animation */
  @keyframes fadeInOut {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

export default IconShowcase;