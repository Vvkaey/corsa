"use client";

import styled from "styled-components";
import { sectionResponsivePadding } from "../new_mixins/mixins";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import gsap from "gsap";

// No registration here - it's done in GsapProvider

export const QuotationSection = styled(
  ({
    className,
    description,
    author,
  }: {
    className?: string;
    description?: string | React.ReactNode;
    author?: string | React.ReactNode;
  }) => {
    const gsapContext = useGsapContext();
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const authorRef = useRef<HTMLParagraphElement>(null);
    const sectionRootRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();

    useIsomorphicLayoutEffect(() => {
      if (!sectionRootRef.current || !quoteRef.current || !authorRef.current)
        return;

      gsapContext.add(() => {
        // Set initial state for content elements
        gsap.set([quoteRef.current, authorRef.current], {
          autoAlpha: 0,
          y: 50,
        });

        // Create animation timeline for content
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRootRef.current,
            start: "-30% top", // Trigger when 30% of section of previous section is visible
            end: "20% top",
            scrub: 0.5,
            markers: false, // Set to true for debugging, false for production
          },
        });

        // Animate quote and author together with a slight stagger
        tl.to(quoteRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,

        })
        .to(authorRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.2,
        }, "-=0.25"); // Start author animation when quote is 2/3 done

        return () => {
          // Clean up this specific ScrollTrigger
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
        };
      });


    }, [width, gsapContext]);

    return (
      <section className={className} ref={sectionRootRef} data-scroll-section>
        <div className="video-wrapper">
          <video
            autoPlay
            loop
            muted
            src="/light-red.mp4"
            className="background-video"
          />
          <div className="overlay"></div>
        </div>

        <div className="content-container">
          <p className="quote" ref={quoteRef}>
            {description}
          </p>
          <p className="author" ref={authorRef}>
            {author}
          </p>
        </div>
      </section>
    );
  }
)`
  position: relative;
  height: 100vh; /* Tall section to ensure scrolling */
  width: 100%;
  background: #000000;

  /* Video wrapper - this is the element that sticks */
  .video-wrapper {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 1;

    /* The actual video */
    .background-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Dark overlay */
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      z-index: 2;
    }
  }

  /* Content container - this also sticks to overlay the video */
  .content-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 54px;
    z-index: 10;
    ${sectionResponsivePadding()};
    pointer-events: none; /* Allow clicks to pass through to video if needed */
    font-family: var(--font-exo);
    @media (min-width: 992px) {
      gap: 14px;
    }

    .quote {
      width: 90%;
      margin: 0;
      position: relative;
      color: #fff;
      text-align: center;
      font-size: 25px;
      font-style: normal;
      font-weight: 600;
      line-height: 119.982%; /* 46.793px */
      text-transform: uppercase;
      letter-spacing: 0.56px;
      @media (min-width: 992px) {
        font-size: 32.5px;
        letter-spacing: 0.65px;
      }

      @media (min-width: 1950px) {
        font-size: 46.2px;
        letter-spacing: 0.78px;
      }
    }

    .author {
      margin: 0;
      color: #898989;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 119.982%; /* 31.195px */
      letter-spacing: 0.32px;
      z-index: 2;
      @media (min-width: 992px) {
        font-size: 21.6px;
        letter-spacing: 0.433px;
      }

      @media (min-width: 1950px) {
        font-size: 30.8px;
        letter-spacing: 0.6px;
      }
    }
  }

  /* Hide anything below the viewport */
  &::after {
    content: "";
    position: absolute;
    top: 100vh; /* Start after first viewport */
    left: 0;
    width: 100%;
    height: 100vh; /* Cover the rest of the section */
    background-color: #000; /* Match section background */
    z-index: 0; /* Below the sticky elements */
  }
`;

export default QuotationSection;