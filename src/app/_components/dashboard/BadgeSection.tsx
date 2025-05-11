"use client";

import { useMentorshipContext } from "@/app/_contexts/MentorshipContext";
import { useAuth } from "@/app/_contexts/AuthContext";
import {
  BadgeSectionContainer,
  Card,
  CardsContainer,
  CardTitle,
  Count,
  Divider,
  IconContainer,
  MainSection,
  RedSpan,
  Subtitle,
  TagLine,
  Title,
} from "./styled";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import VideoLoadingScreen from "../global/loading";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import gsap from "gsap";

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  pointer-events: none;
`;

export const BadgeSection = () => {
  const {
    mentorSession,
    accessPlan,
    communityBadge,
    fetchUserStatus,
    isLoading,
  } = useMentorshipContext();

  const { isAuthenticated } = useAuth();
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;
  
  // Add state to track initial render
  const [initialRender, setInitialRender] = useState(true);
  
  // Refs for animation
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only fetch if the user is authenticated
    if (isAuthenticated) {
      console.log("Fetching user status from BadgeSection");
      fetchUserStatus();
    }
  }, [isAuthenticated, fetchUserStatus]);

  // Set elements to be visible immediately on mount to prevent flash
  useEffect(() => {
    const setInitialVisibility = () => {
      // Apply inline styles directly to DOM elements
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.visibility = "visible";
      }

      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.visibility = "visible";
        titleRef.current.style.transform = "translateY(0px)";
      }

      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
        subtitleRef.current.style.visibility = "visible";
        subtitleRef.current.style.transform = "translateY(0px)";
      }

      if (cardsContainerRef.current) {
        cardsContainerRef.current.style.opacity = "1";
        cardsContainerRef.current.style.visibility = "visible";
      }

      // Cards should also be immediately visible
      cardRefs.current.forEach(ref => {
        if (ref) {
          ref.style.opacity = "1";
          ref.style.visibility = "visible";
          ref.style.transform = "translateY(0px)";
        }
      });
    };

    // Set items to be visible immediately on first render to prevent flash
    setInitialVisibility();
  }, []);

  // Initialize animations - run after first render
  useEffect(() => {
    // Skip if still in initial render to prevent flashing on mobile
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    // On mobile, do not animate after the initial render for better performance
    if (isMobile) {
      return;
    }

    // For non-mobile, create entry animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Animate container
    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 }
      );
    }

    // Animate title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.5 },
        "-=0.4"
      );
    }

    // Animate cards container
    if (cardsContainerRef.current) {
      tl.fromTo(
        cardsContainerRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }

    // Stagger cards
    if (cardRefs.current.length > 0) {
      tl.fromTo(
        cardRefs.current,
        { autoAlpha: 0, y: 20, scale: 0.95 },
        { 
          autoAlpha: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5, 
          stagger: 0.15, // Stagger with a small delay
          ease: "back.out(1.2)" 
        },
        "-=0.4"
      );
    }
  }, [initialRender, isMobile]);

  // Card hover animations
  const handleCardMouseEnter = (index: number) => {
    if (isMobile) return; // Skip animations on mobile for better performance
    
    const card = cardRefs.current[index];
    if (card) {
      gsap.to(card, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleCardMouseLeave = (index: number) => {
    if (isMobile) return; // Skip animations on mobile for better performance
    
    const card = cardRefs.current[index];
    if (card) {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Animation for loading overlay
  useEffect(() => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
      if (isLoading) {
        gsap.fromTo(
          loadingOverlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3 }
        );
      } else {
        gsap.to(loadingOverlay, {
          autoAlpha: 0,
          duration: 0.3
        });
      }
    }
  }, [isLoading]);

  return (
    <BadgeSectionContainer ref={containerRef} style={{ opacity: 1, visibility: 'visible' }}>
      {isLoading && (
        <LoadingOverlay className="loading-overlay">
          <VideoLoadingScreen videoSrc="/loading.mp4" loop={true} />
        </LoadingOverlay>
      )}
      <MainSection>
        <Title ref={titleRef} style={{ opacity: 1, visibility: 'visible', transform: 'translateY(0px)' }}>
          Your Space, <RedSpan>Your Stats.</RedSpan> All in One Place
        </Title>
        <Subtitle ref={subtitleRef} style={{ opacity: 1, visibility: 'visible', transform: 'translateY(0px)' }}>
          Every action here is a chance to learn something real, get clarity,
          and make progress.
        </Subtitle>
        <CardsContainer ref={cardsContainerRef} style={{ opacity: 1, visibility: 'visible' }}>
          <Card 
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            style={{ opacity: 1, visibility: 'visible', transform: 'translateY(0px)' }}
            onMouseEnter={() => handleCardMouseEnter(0)}
            onMouseLeave={() => handleCardMouseLeave(0)}
          >
            <CardTitle>{mentorSession.title}</CardTitle>
            {!isMobile ? <Divider /> : null}
            <TagLine>{mentorSession.description}</TagLine>
            <Count 
              ref={(el: HTMLDivElement | null) => {
                if (el && !isMobile && !initialRender) {
                  // Animate the count number with a counter effect
                  const endValue = mentorSession.sessionCount;
                  if (!isNaN(endValue)) {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                      val: endValue,
                      duration: 1.5,
                      ease: "power2.out",
                      onUpdate: () => {
                        el.textContent = Math.round(obj.val).toString();
                      }
                    });
                  } else {
                    el.textContent = mentorSession.sessionCount.toString();
                  }
                }
              }}
            >
              {mentorSession.sessionCount}
            </Count>
          </Card>
          <Card 
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            style={{ opacity: 1, visibility: 'visible', transform: 'translateY(0px)' }}
            onMouseEnter={() => handleCardMouseEnter(1)}
            onMouseLeave={() => handleCardMouseLeave(1)}
          >
            <CardTitle>{accessPlan.title}</CardTitle>
            {!isMobile ? <Divider /> : null}
            <TagLine>{accessPlan.description}</TagLine>
            <IconContainer 
              ref={(el: HTMLDivElement | null) => {
                if (el && !isMobile && !initialRender) {
                  // Add a subtle pulse animation to the icon
                  gsap.fromTo(
                    el,
                    { scale: 0.9 },
                    { 
                      scale: 1,
                      duration: 0.8,
                      ease: "elastic.out(1, 0.3)"
                    }
                  );
                }
              }}
            >
              {accessPlan.planIcon}
            </IconContainer>
          </Card>
          <Card 
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            style={{ opacity: 1, visibility: 'visible', transform: 'translateY(0px)' }}
            onMouseEnter={() => handleCardMouseEnter(2)}
            onMouseLeave={() => handleCardMouseLeave(2)}
          >
            <CardTitle>{communityBadge.title}</CardTitle>
            {!isMobile ? <Divider /> : null}
            <TagLine>{communityBadge.description}</TagLine>
            <IconContainer 
              ref={(el: HTMLDivElement | null) => {
                if (el && !isMobile && !initialRender) {
                  // Add a subtle rotate animation for the badge
                  gsap.fromTo(
                    el,
                    { rotate: -10, scale: 0.9 },
                    { 
                      rotate: 0,
                      scale: 1,
                      duration: 0.8,
                      ease: "elastic.out(1, 0.3)"
                    }
                  );
                }
              }}
            >
              {communityBadge.badge}
            </IconContainer>
          </Card>
        </CardsContainer>
      </MainSection>
    </BadgeSectionContainer>
  );
};

export default BadgeSection;