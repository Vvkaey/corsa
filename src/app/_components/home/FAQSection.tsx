"use client";

import styled from "styled-components";
import { CaretUp } from "@/app/_assets/icons";
import { useState, useRef } from "react";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FaqDataProps {
  ques?: string | React.ReactNode;
  ans?: string | React.ReactNode;
}

const ContentBox = styled(
  ({ className, data }: { className?: string; data?: FaqDataProps; }) => {
    const [showDescription, setShowDescription] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    return (
      <div className={className} ref={contentRef}>
        <button
          className="ques-container"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          <h3 className="ques">{data?.ques}</h3>
          <CaretUp
            style={{
              transform: `rotate(${showDescription ? "0deg" : "180deg"})`,
              transition: "transform 0.27s ease-in-out", /* 10% faster */
            }}
          />
        </button>
        <div className={`description-wrapper ${showDescription ? "open" : ""}`}>
          <div className={"description"}>{data?.ans}</div>
        </div>
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  width: 100%;
  will-change: transform, opacity; /* Performance optimization */
  transform-origin: center center;

  .ques-container {
    overflow: hidden;
  }

  &:last-child {
    .ques-container {
      border-bottom: none;
    }
  }

  button.ques-container {
    cursor: pointer;
    text-align: left;
    border: none;
    background: transparent;
    position: relative;
    border-bottom: 1.35px solid #d4d4d4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 0px;
    background: #fff;
    z-index: 2;
    width: 100%; /* Ensure full width on mobile */

    @media (min-width: 992px) {
      padding: 24px 10px;
      width: 100%;
    }

    .ques {
      font-family: var(--font-fustat);
      color: #000;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 25.556px */
      margin: 0 16px;
      max-width: 85%; /* Allow more text to be visible on mobile */

      @media (min-width: 992px) {
        font-size: 20px;
        max-width: unset;
        margin: 0;
      }

      @media (min-width: 1950px) {
        font-size: 28.4px;
      }
    }

    svg {
      transform: rotate(180deg);

      @media (max-width: 992px) {
        margin-right: 16px;
      }
    }
  }
  .description-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.45s cubic-bezier(0.4, 0, 0.2, 1); /* 10% faster */
  }

  .description-wrapper.open {
    grid-template-rows: 1fr;
  }

  .description {
    overflow: hidden; /* Critical to hide content when collapsed */
    font-family: var(--font-fustat);
    position: relative;
    color: #000;
    font-size: 16px;
    font-style: normal;
    line-height: 120%;
    padding: 0 16px; /* Add padding for mobile */
    transition: opacity 0.36s ease 0.09s, /* 10% faster transitions */
      transform 0.36s ease, padding 0.36s ease;
    transform: translateY(0);
    opacity: 0; /* Start invisible */

    @media (min-width: 992px) {
      font-size: 17px;
      width: 100%;
      padding: 0 10px;
    }

    @media (min-width: 1950px) {
      font-size: 20px;
    }
  }

  /* Apply styles when open */
  .description-wrapper.open .description {
    padding: 19px 16px; /* Add padding when open for mobile */
    opacity: 1;

    @media (min-width: 992px) {
      padding: 19px 10px;
    }
  }

  /* Styles when closed */
  .description-wrapper:not(.open) .description {
    transform: translateY(-10px);
  }
`;

export const FAQSection = styled(
  ({
    className,
    title,
    data,
  }: {
    className?: string;
    title?: string;
    data?: FaqDataProps[];
  }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const gsapContext = useGsapContext();
    const { width } = useWindowSize();
    // const isMobile = width && width < 992;
    
    useIsomorphicLayoutEffect(() => {
      if (!sectionRef.current || !titleRef.current || !contentRef.current) return;
      
      gsapContext.add(() => {
        // Get all FAQ boxes
        const faqItems = contentRef.current?.querySelectorAll('.faq-item');
        
        if (!faqItems || faqItems.length === 0) {
          console.warn("No FAQ items found to animate");
          return;
        }
        
        // Set initial states for animations - using autoAlpha instead of opacity
        gsap.set(titleRef.current, {
          autoAlpha: 0,
          y: 60, // Match the 60px offset from BannerSection
        });
        
        // Set initial state for all FAQ items
        gsap.set(faqItems, {
          autoAlpha: 0,
          y: 60, // Match the 60px offset from BannerSection
        });
        
        // Create master timeline with ScrollTrigger similar to BannerSection
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%", // Match BannerSection's trigger point
            end: "top 15%",
            scrub: 1.5, // Slower, smoother scrubbing effect like BannerSection
            // markers : true,
            // markers: false, // Enable for debugging
          }
        });
        
        // First animate the title with a nice ease - similar to BannerSection
        masterTl.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8, // Longer duration for smoother animation
          ease: "power2.out", // Smoother ease
        });
        
        // Then animate each FAQ item with staggered timing - similar to BannerSection's approach
        faqItems.forEach((item) => {
          masterTl.to(
            item,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8, // Match BannerSection's duration
              ease: "power1.inOut", // Match BannerSection's easing
            },
            `>-0.5` // Start a bit before previous animation ends for a smoother overlap
          );
        });
        
        // Add fallback to ensure visibility after 2.5 seconds
        // const fallbackTimeout = setTimeout(() => {
        //   if (document.hidden) return;
          
        //   if (titleRef.current && Number(gsap.getProperty(titleRef.current, "autoAlpha")) < 0.5) {
        //     gsap.set(titleRef.current, { autoAlpha: 1, y: 0 });
        //   }
          
        //   faqItems.forEach(item => {
        //     if (Number(gsap.getProperty(item, "autoAlpha")) < 0.5) {
        //       gsap.set(item, { autoAlpha: 1, y: 0 });
        //     }
        //   });
        // }, 2500);
        
        return () => {
          // clearTimeout(fallbackTimeout);
          if (masterTl.scrollTrigger) {
            masterTl.scrollTrigger.kill();
          }
        };
      });
    }, [width, gsapContext]);
    
    return (
      <section className={className} id="faq-section" ref={sectionRef}>
        <div className="faq-container">
          <div className="title-container" ref={titleRef}>
            <h2 className="title">{title}</h2>
          </div>
          <div className="content-container" ref={contentRef}>
            {data?.length
              ? data.map((item, idx) => {
                  return (
                    <ContentBox 
                      key={idx} 
                      data={item} 
                      className="faq-item"
                    />
                  );
                })
              : null}
          </div>
        </div>
      </section>
    );
  }
)`
  background: #fff;
  position: relative;
  margin: auto;
  font-family: var(--font-exo);
  padding: 40px 0 80px 0;
  border-bottom-right-radius: 36px;
  border-bottom-left-radius: 36px;
  overflow: hidden; /* Add this to match banner section */

  @media (min-width: 992px) {
    padding: 96px 0 250px;
  }

  .faq-container {
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
    ${sectionResponsivePadding()};
    ${maxWidthContainer};

    @media (min-width: 992px) {
      gap: unset;
      flex-direction: row;
    }

    .title-container,
    .content-container {
      @media (min-width: 992px) {
        width: 50%;
      }
    }

    .title-container {
      display: flex;
      will-change: transform, opacity; /* Performance optimization */

      .title {
        width: 100%;
        color: #000;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        margin: 0 16px;

        @media (min-width: 992px) {
          width: 95%;
          font-weight: 800;
          font-size: 46px;
          margin: 0;
        }

        @media (min-width: 1950px) {
          font-size: 65px;
        }
      }
    }
    .content-container {
      background: #fff;
    }
  }
`;