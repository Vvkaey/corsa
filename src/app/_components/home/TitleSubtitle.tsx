"use client";

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { maxWidthContainer, sectionResponsivePadding } from "../new_mixins/mixins";

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
  
  useEffect(() => {
    // For SSR safety
    if (typeof window === 'undefined') return;
    
    // Store current ref values
    const currentTitleRef = titleRef.current;
    const currentSubtitleRef = subtitleRef.current;
    
    try {
      // Check if we're on mobile (screen width < 768px)
      const isMobile = window.innerWidth < 768;
      
      // Skip animations on mobile
      if (isMobile) {
        // Make elements visible immediately without animation
        if (currentTitleRef) {
          currentTitleRef.style.opacity = '1';
          currentTitleRef.style.transform = 'none';
        }
        
        if (currentSubtitleRef) {
          currentSubtitleRef.style.opacity = '1';
          currentSubtitleRef.style.transform = 'none';
        }
        return;
      }
      
      // Desktop animations
      if (currentTitleRef && currentSubtitleRef) {
        // Set initial state
        currentTitleRef.style.opacity = '0';
        currentTitleRef.style.transform = 'translateY(30px)';
        currentSubtitleRef.style.opacity = '0';
        currentSubtitleRef.style.transform = 'translateY(30px)';
        
        // Add transition
        currentTitleRef.style.transition = 'opacity 1s ease, transform 1s ease';
        currentSubtitleRef.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Trigger animation
        setTimeout(() => {
          if (currentTitleRef) {
            currentTitleRef.style.opacity = '1';
            currentTitleRef.style.transform = 'translateY(0)';
          }
          
          setTimeout(() => {
            if (currentSubtitleRef) {
              currentSubtitleRef.style.opacity = '1';
              currentSubtitleRef.style.transform = 'translateY(0)';
            }
          }, 300);
        }, 100);
      }
    } catch (error) {
      console.error("Animation error in TitleSubtitle:", error);
      
      // Fallback: ensure content is visible even if animation fails
      if (currentTitleRef) currentTitleRef.style.opacity = '1';
      if (currentSubtitleRef) currentSubtitleRef.style.opacity = '1';
    }
  }, []);

  return (
    <TitleSubtitleContainer>
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