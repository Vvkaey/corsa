// lib/animation.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Make sure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Create reusable animation presets
export const animations = {
  // Fade in from bottom animation
  fadeInUp: (element: string | object, delay: number = 0, y: number = 20) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0, 
        y 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        delay,
        ease: "power3.out" 
      }
    );
  },
  
  // Fade in animation
  fadeIn: (element: string | object, delay: number = 0, duration: number = 0.7) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { 
        opacity: 1,
        duration,
        delay,
        ease: "power2.out" 
      }
    );
  },
  
  // Scale animation for buttons and interactive elements
  scaleIn: (element: string | object, delay: number = 0) => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0, 
        scale: 0.9 
      },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        delay,
        ease: "back.out(1.7)" 
      }
    );
  },
  
  // Staggered animation for lists and grids
  staggerItems: (elements: string | object, staggerTime: number = 0.1, delay: number = 0) => {
    return gsap.fromTo(
      elements,
      { 
        opacity: 0, 
        y: 15 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4,
        stagger: staggerTime,
        delay,
        ease: "power2.out" 
      }
    );
  },
  
  // Create a scroll-triggered animation
  scrollAnimation: (trigger: string, elements: string | object, start: string = "top 80%") => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger,
          start,
          toggleActions: "play none none none"
        }
      }
    );
  },
  
  // Add hover animation to an element
  addHoverAnimation: (element: HTMLElement, scale: number = 1.05, y: number = -5) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(element, { 
        y, 
        scale, 
        duration: 0.3,
        ease: "power2.out" 
      });
    });
    
    element.addEventListener("mouseleave", () => {
      gsap.to(element, { 
        y: 0, 
        scale: 1, 
        duration: 0.3,
        ease: "power2.out" 
      });
    });
    
    // Return a cleanup function
    return () => {
      element.removeEventListener("mouseenter", () => {});
      element.removeEventListener("mouseleave", () => {});
    };
  },
  
  // Text animation that reveals character by character
  textReveal: (element: string | object, delay: number = 0) => {
    // This requires the SplitText plugin which is a premium GSAP plugin
    // This is a simplified version using standard GSAP
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay,
        ease: "power3.out" 
      }
    );
  },
  
  // Create sequence animation with a timeline
  createSequence: () => {
    return gsap.timeline({ defaults: { ease: "power3.out" } });
  }
};

// Export default for convenience
export default animations;