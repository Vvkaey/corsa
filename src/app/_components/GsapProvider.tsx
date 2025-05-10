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
      ignoreMobileResize: true, // Optional: helps prevent issues on mobile
    });
    
    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return <>{children}</>;
}
