// lib/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Only register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper function to create consistent animation defaults across components
export const createFadeInAnimation = (
  element: string | object,
  delay: number = 0,
  y: number = 20
) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      y, 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      delay,
      ease: 'power3.out' 
    }
  );
};

// Helper for scroll animations
export const createScrollAnimation = (
  trigger: string,
  element: string,
  start: string = 'top 80%'
) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none'
      }
    }
  );
};

export default gsap;