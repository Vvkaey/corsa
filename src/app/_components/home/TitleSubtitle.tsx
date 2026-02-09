"use client";

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { Circled } from "@/app/_assets/icons";

const TitleSubtitle = ({
  title,
  subtitle,
  redspan,
  theme = "dark",
}: {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  redspan?: string | React.ReactNode;
  theme?: "dark" | "light";
}) => {
  // Create refs for animation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const { width } = useWindowSize();

  useEffect(() => {
    // For SSR safety
    if (typeof window === "undefined") return;

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
          currentTitleRef.style.opacity = "1";
          currentTitleRef.style.transform = "none";
        }

        if (currentSubtitleRef) {
          currentSubtitleRef.style.opacity = "1";
          currentSubtitleRef.style.transform = "none";
        }
        return;
      }

      // Desktop animations
      if (currentTitleRef && currentSubtitleRef) {
        // Set initial state
        currentTitleRef.style.opacity = "0";
        currentTitleRef.style.transform = "translateY(30px)";
        currentSubtitleRef.style.opacity = "0";
        currentSubtitleRef.style.transform = "translateY(30px)";

        // Add transition
        currentTitleRef.style.transition = "opacity 1s ease, transform 1s ease";
        currentSubtitleRef.style.transition =
          "opacity 0.8s ease, transform 0.8s ease";

        // Trigger animation
        setTimeout(() => {
          if (currentTitleRef) {
            currentTitleRef.style.opacity = "1";
            currentTitleRef.style.transform = "translateY(0)";
          }

          setTimeout(() => {
            if (currentSubtitleRef) {
              currentSubtitleRef.style.opacity = "1";
              currentSubtitleRef.style.transform = "translateY(0)";
            }
          }, 300);
        }, 100);
      }
    } catch (error) {
      console.error("Animation error in TitleSubtitle:", error);

      // Fallback: ensure content is visible even if animation fails
      if (currentTitleRef) currentTitleRef.style.opacity = "1";
      if (currentSubtitleRef) currentSubtitleRef.style.opacity = "1";
    }
  }, []);

  return (
    <TitleSubtitleContainer>
      <Title ref={titleRef} $theme={theme}>
        <h2>
          {title}
          <RedSpan>{redspan}</RedSpan>
        </h2>

        {theme == "light" ? (
          <CircledOutline>
            {" "}
            {width && width < 992 ? (
              <Circled width={128} height={62} />
            ) : (width ?? 0) < 1800 ? (
              <Circled />
            ) : (
              <Circled width={1.5 * 279} height={1.5 * 119} />
            )}
          </CircledOutline>
        ) : null}
      </Title>

      <SubTitle ref={subtitleRef} $theme={theme}>
        {subtitle}
      </SubTitle>
    </TitleSubtitleContainer>
  );
};

export default TitleSubtitle;

const CircledOutline = styled.div`
  position: absolute;
  top: -37%;
  right: 37.5%;

  @media (min-width: 992px) {
    top: 35%;
    right: 68.5%;
  }

  @media (min-width: 1025px) {
    top: -37.5%;
    right: 35.5%;
  }

  svg {
    position: absolute;
  }
`;

const TitleSubtitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  ${maxWidthContainer};
  ${sectionResponsivePadding()};

  @media (min-width: 992px) {
    gap: 22px;
  }
`;

const Title = styled.div<{ $theme: "dark" | "light" }>`
  position: relative;

  h2 {
    color: ${({ $theme }) => ($theme == "dark" ? "#fff" : "#000")};
    text-align: center;
    font-family: var(--font-exo);
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
    margin: 0 auto;
    @media (min-width: 992px) {
      max-width: ${({ $theme }) => ($theme == "dark" ? "18ch" : "unset")};
      leading-trim: both;
      text-edge: cap;
      font-size: 67.669px;
    }

    @media (min-width: 1950px) {
      font-size: 96.669px;
    }
  }
`;

const SubTitle = styled.h2<{ $theme: "dark" | "light" }>`
  color: ${({ $theme }) => ($theme == "dark" ? "#fff" : "#000")};
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
    font-size: 19.9px;
  }

  @media (min-width: 1950px) {
    font-size: 28.432px;
  }
`;

const RedSpan = styled.span`
  color: #ff2626;
`;
