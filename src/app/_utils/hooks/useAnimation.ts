"use client";

import { useRef, useId } from 'react';
import { useGsapComponent } from '../../_contexts/GsapContext';
import gsap from 'gsap';

// Hook for advanced animation control with performance optimization
export const useAnimation = (componentName?: string) => {
  const uniqueId = useId().replace(/:/g, '');
  const id = componentName || `component-${uniqueId}`;
  const { createAnimation, isMounted } = useGsapComponent(id);
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Register DOM element
  const registerElement = (elementId: string, element: HTMLElement | null) => {
    if (element) {
      elementsRef.current.set(elementId, element);
    }
  };

  // Get registered element
  const getElement = (elementId: string) => {
    return elementsRef.current.get(elementId);
  };

  // Animation methods with safety checks
  const animationMethods = {
    // Fade in from bottom animation
    fadeInUp: (element: string | object | React.RefObject<HTMLElement>, delay: number = 0, y: number = 20) => {
      if (!isMounted) return { kill: () => {} } as gsap.core.Tween;
      
      return createAnimation(element, (el) => {
        return gsap.fromTo(
          el,
          { opacity: 0, y },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            delay,
            ease: "power3.out",
            clearProps: "all" // Important for DOM cleanup
          }
        );
      });
    },
    
    // Fade in animation
    fadeIn: (element: string | object | React.RefObject<HTMLElement>, delay: number = 0, duration: number = 0.7) => {
      if (!isMounted) return { kill: () => {} } as gsap.core.Tween;
      
      return createAnimation(element, (el) => {
        return gsap.fromTo(
          el,
          { opacity: 0 },
          { 
            opacity: 1,
            duration,
            delay,
            ease: "power2.out",
            clearProps: "opacity" // Important for DOM cleanup
          }
        );
      });
    },
    
    // Scale animation for buttons and interactive elements
    scaleIn: (element: string | object | React.RefObject<HTMLElement>, delay: number = 0) => {
      if (!isMounted) return { kill: () => {} } as gsap.core.Tween;
      
      return createAnimation(element, (el) => {
        return gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            delay,
            ease: "back.out(1.7)",
            clearProps: "all" // Important for DOM cleanup
          }
        );
      });
    },
    
    // Staggered animation for lists and grids
    staggerItems: (elements: string | object | React.RefObject<HTMLElement>, staggerTime: number = 0.1, delay: number = 0) => {
      if (!isMounted) return { kill: () => {} } as gsap.core.Tween;
      
      return createAnimation(elements, (el) => {
        return gsap.fromTo(
          el,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4,
            stagger: staggerTime,
            delay,
            ease: "power2.out",
            clearProps: "all" // Important for DOM cleanup
          }
        );
      });
    },
    
    // Create a scroll-triggered animation
    scrollAnimation: (trigger: string | React.RefObject<HTMLElement>, elements: string | object | React.RefObject<HTMLElement>, start: string = "top 80%") => {
      if (!isMounted) return { kill: () => {} } as gsap.core.Tween;
      
      return createAnimation(elements, (el) => {
        const triggerEl = typeof trigger === 'string' 
          ? trigger 
          : trigger.current;
        
        return gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            clearProps: "all", // Important for DOM cleanup
            scrollTrigger: {
              trigger: triggerEl,
              start,
              toggleActions: "play none none none",
              onLeave: self => {
                if (self) {
                  self.kill(false, true); // Kill the ScrollTrigger but not the animation
                }
              }
            }
          }
        );
      });
    },
    
    // Add hover animation to an element with safety
    addHoverAnimation: (element: HTMLElement, scale: number = 1.05, y: number = -5) => {
      if (!isMounted || !element) return () => {};
      
      const safeElement = element; // Capture for cleanup
      
      // Create unique identifiers for these animations
      const hoverId = `hover-${id}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Enter animation with safety
      const enterHandler = () => {
        if (!safeElement) return;
        
        try {
          gsap.killTweensOf(safeElement); // Kill any ongoing animations
          gsap.to(safeElement, { 
            y, 
            scale, 
            duration: 0.3,
            ease: "power2.out",
            id: hoverId
          });
        } catch (err) {
          console.error("Error in hover animation:", err);
        }
      };
      
      // Leave animation with safety
      const leaveHandler = () => {
        if (!safeElement) return;
        
        try {
          gsap.killTweensOf(safeElement);
          gsap.to(safeElement, { 
            y: 0, 
            scale: 1, 
            duration: 0.3,
            ease: "power2.out",
            clearProps: "all", // Clean up all props
            id: hoverId
          });
        } catch (err) {
          console.error("Error in hover animation:", err);
        }
      };
      
      // Add event listeners
      safeElement.addEventListener("mouseenter", enterHandler);
      safeElement.addEventListener("mouseleave", leaveHandler);
      
      // Return a cleanup function to remove event listeners
      return () => {
        if (!safeElement) return;
        
        safeElement.removeEventListener("mouseenter", enterHandler);
        safeElement.removeEventListener("mouseleave", leaveHandler);
        
        // Kill any ongoing animations
        gsap.killTweensOf(safeElement);
        
        // Reset to default state
        gsap.set(safeElement, { clearProps: "all" });
      };
    },
    
    // Text animation that reveals character by character
    textReveal: (element: string | object | React.RefObject<HTMLElement>, delay: number = 0) => {
      if (!isMounted) return { kill: () => {} } as gsap.core.Tween;
      
      return createAnimation(element, (el) => {
        return gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            delay,
            ease: "power3.out",
            clearProps: "all" // Important for DOM cleanup
          }
        );
      });
    },
    
    // Create sequence animation with a timeline
    createSequence: () => {
      return gsap.timeline({ 
        defaults: { ease: "power3.out" },
        // Add safety options
        onOverwrite: "auto",
        smoothChildTiming: true,
        autoRemoveChildren: true,
        onComplete: function() {
          this.kill(); // Auto-kill timelines when complete to prevent memory leaks
        }
      });
    },
    
    // Animated icons method with enhanced safety
    animateIcons: (
      iconsRef: React.RefObject<HTMLElement>,
      config: { 
        firstGroup: number[], 
        secondGroup: number[],
        staggerDelay: number,
        groupDelay: number
      }
    ) => {
      if (!isMounted || !iconsRef.current) {
        return gsap.timeline();
      }
      
      const { firstGroup, secondGroup, staggerDelay, groupDelay } = config;
      
      const sequence = gsap.timeline({ 
        defaults: { ease: "power3.out" },
        onComplete: function() {
          // Don't auto-kill this one as it might be reused
        }
      });
      
      try {
        const icons = Array.from(iconsRef.current.children);
        
        // Safety check before proceeding
        if (!icons.length) return sequence;
        
        // Prepare all icons to be invisible initially
        sequence.set(icons, { opacity: 0, y: 10 });
        
        // Animate first group with safety checks
        firstGroup.forEach((index) => {
          if (index >= 0 && index < icons.length) {
            sequence.to(
              icons[index], 
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                ease: "power2.out",
                clearProps: "all" // Important for DOM cleanup
              },
              `group1+=${index * staggerDelay}`
            );
          }
        });
        
        // Animate second group after delay with safety checks
        sequence.addLabel("group2", `+=0.5`);
        secondGroup.forEach((index) => {
          if (index >= 0 && index < icons.length) {
            sequence.to(
              icons[index], 
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.5, 
                ease: "power2.out",
                clearProps: "all" // Important for DOM cleanup
              },
              `group2+=${(index - secondGroup[0]) * staggerDelay}`
            );
          }
        });
        
        // Animate first group again with safety checks
        sequence.addLabel("reanimateGroup1", `+=${groupDelay}`);
        firstGroup.forEach((index) => {
          if (index >= 0 && index < icons.length) {
            sequence.to(
              icons[index], 
              { 
                keyframes: [
                  { opacity: 0.5, y: 5, duration: 0.2 },
                  { opacity: 1, y: 0, duration: 0.3, clearProps: "all" }
                ],
                ease: "power2.inOut"
              },
              `reanimateGroup1+=${index * staggerDelay}`
            );
          }
        });
      } catch (err) {
        console.error("Error in animateIcons:", err);
      }
      
      return sequence;
    }
  };

  return {
    registerElement,
    getElement,
    ...animationMethods
  };
};

export default useAnimation;