'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// SINGLE registration point for ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Optional: Default config for ScrollTrigger
    ScrollTrigger.config({
      ignoreMobileResize: false, // Changed to false to ensure proper refresh on mobile resize
    });
    
    // Force a refresh after a small delay to ensure proper initialization
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 300);
    
    // Add specific handler for orientation changes on mobile
    const handleOrientationChange = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
      
      // Clean up event listener
      window.removeEventListener('orientationchange', handleOrientationChange);
      
      // Clear timeout
      clearTimeout(refreshTimeout);
    };
  }, []);

  return <>{children}</>;
}