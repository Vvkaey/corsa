"use client";

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { maxWidthContainer, sectionResponsivePadding } from "../new_mixins/mixins";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

const TitleSubtitle = ({
  title,
  subtitle,
  redspan
}: {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  redspan?: string | React.ReactNode;
}) => {
  // Create refs for animation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  
  // Setup intersection observer with a lower threshold for earlier detection
  const [containerRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "0px 0px -100px 0px" // Start animation earlier
  });

  // Initialize with opacity: 0 to prevent flashing
  useEffect(() => {
    // Set initial state with GSAP to prevent flashing
    if (titleRef.current && subtitleRef.current) {
      gsap.set([titleRef.current, subtitleRef.current], { 
        opacity: 0,
        y: 30
      });
    }
    
    // Create animation when in view
    if (inView && titleRef.current && subtitleRef.current) {
      // Create a single timeline for smoother coordinated animations
      const tl = gsap.timeline({ 
        defaults: { 
          ease: "power3.out",
          duration: 0.9
        }
      });
      
      // Animate title first
      tl.to(titleRef.current, { 
        opacity: 1, 
        y: 0,
        duration: 1
      });
      
      // Then animate subtitle with slight overlap
      tl.to(subtitleRef.current, { 
        opacity: 1, 
        y: 0,
        duration: 0.8
      }, "-=0.5");
    }
  }, [inView]);

  return (
    <TitleSubtitleContainer ref={containerRef}>
      <Title ref={titleRef}>
        {title}<RedSpan>{redspan}</RedSpan>
      </Title>
      <SubTitle ref={subtitleRef}>
        {subtitle}
      </SubTitle>
    </TitleSubtitleContainer>
  );
};

export default TitleSubtitle;

const TitleSubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  ${maxWidthContainer};
  ${sectionResponsivePadding()};
  overflow: hidden; /* Prevents content from creating scrollbars during animation */

  @media (min-width: 992px) {  
    gap: 22px;
  }
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-exo);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  max-width: 90%;
  will-change: transform, opacity; /* Performance hint for browser */
  transform: translateZ(0); /* Force GPU acceleration */

  @media (min-width: 992px) {
    max-width: 70%;
    leading-trim: both;
    text-edge: cap;
    font-size: 96.669px;
  }
`;

const SubTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%; /* 22.717px */
  max-width: 90%;
  will-change: transform, opacity; /* Performance hint for browser */
  transform: translateZ(0); /* Force GPU acceleration */
  
  @media (min-width: 992px) {
    max-width: 58%;
    leading-trim: both;
    text-edge: cap;
    font-size: 28.432px;
  }
`;

const RedSpan = styled.span`
  color: #FF2626;
`;