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
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FaqDataProps {
  ques?: string | React.ReactNode;
  ans?: string | React.ReactNode;
}

const ContentBox = styled(
  ({ className, data }: { className?: string; data?: FaqDataProps; index: number }) => {
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
  opacity: 0; /* Initially hidden for animation */
  transform: translateY(20px); /* Reduced from 30px for faster animation */
  transition: opacity 0.45s ease, transform 0.45s ease; /* 10% faster transitions */
  will-change: transform, opacity;

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
      max-width: 17ch;

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
    padding: 0; /* Start with no padding */
    transition: opacity 0.36s ease 0.09s, /* 10% faster transitions */
      transform 0.36s ease, padding 0.36s ease;
    transform: translateY(0);
    opacity: 0; /* Start invisible */

    @media (min-width: 992px) {
      font-size: 17px;
      width: 100%;
    }

    @media (min-width: 1950px) {
      font-size: 20px;
    }
  }

  /* Apply styles when open */
  .description-wrapper.open .description {
    padding: 19px 0px; /* Add padding when open */
    opacity: 1;

    @media (min-width: 992px) {
      padding: 19px 10px;
    }
  }

  /* Styles when closed */
  .description-wrapper:not(.open) .description {
    transform: translateY(-10px);

    @media (min-width: 992px) {
      padding-right: 10px; /* No padding when closed */
      padding-left: 10px; /* No padding when closed */
    }
  }
  
  /* Animation class added by GSAP */
  &.fadeIn {
    opacity: 1;
    transform: translateY(0);
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
    // const faqItemsRef = useRef<HTMLDivElement[]>([]);
    
    const gsapContext = useGsapContext();
    const { width } = useWindowSize();
    const isMobile = width && width < 992;
    
    useIsomorphicLayoutEffect(() => {
      if (!sectionRef.current || !titleRef.current || !contentRef.current) return;
      
      gsapContext.add(() => {
        // Get all FAQ boxes
        const faqItems = contentRef.current?.querySelectorAll('.faq-item');
        
        // Set initial states
        gsap.set(titleRef.current, {
          autoAlpha: 0,
          y: 50,
        });
        
        // Create primary timeline
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 35%", // Shorter end point for faster completion
            scrub: 1, // Reduced from 1.2 for faster animation
          },
        });
        
        // Animate title
        mainTl.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7, // Reduced from 0.8 (10% faster)
          ease: "power2.out",
        });
        
        // Create a single timeline for all FAQ items for better synchronization
        const faqTl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "top 40%", // Shorter end point for faster completion
            scrub: 0.7, // Faster scrub
          }
        });
        
        // Add all FAQ items to the same timeline for better sync
        if (faqItems && faqItems.length) {
          faqItems.forEach((item, index) => {
            // Stagger but with faster timing
            faqTl.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.6, // Reduced from 0.7 (10% faster)
              ease: "power2.out",
            }, index * 0.08); // Reduced stagger time for faster sequence
          });
        }
        
        return () => {
          // Clean up ScrollTriggers properly
          if (mainTl.scrollTrigger) {
            mainTl.scrollTrigger.kill();
          }
          
          // Kill all scroll triggers
          ScrollTrigger.getAll().forEach(trigger => {
            trigger.kill();
          });
        };
      });
      
      return () => {
        gsapContext.revert();
      };
    }, [width, gsapContext, isMobile, data]);
    
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
                      index={idx}
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
  padding: 40px 0 142px 0;
  border-bottom-right-radius: 36px;
  border-bottom-left-radius: 36px;

  @media (min-width: 992px) {
    padding: 96px 0;
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

      @media (max-width: 992px) {
        padding: 0 8px;
      }
    }

    .title-container {
      display: flex;
      will-change: transform, opacity;

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