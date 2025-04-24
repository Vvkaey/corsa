

"use client"

import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Context type definitions
interface GsapContextType {
  registerAnimation: (id: string, animation: gsap.core.Timeline | gsap.core.Tween) => void;
  removeAnimation: (id: string) => void;
  getContext: () => gsap.Context | null;
  createTimeline: (vars?: gsap.TimelineVars) => gsap.core.Timeline;
  isMounted: boolean;
}

// Create the context
const GsapContext = createContext<GsapContextType | null>(null);

// Types for the provider props
interface GsapProviderProps {
  children: ReactNode;
  scope?: string;
}

export const GsapProvider: React.FC<GsapProviderProps> = ({ children, scope = 'app' }) => {
  const contextRef = useRef<gsap.Context | null>(null);
  const animationsRef = useRef<Map<string, gsap.core.Timeline | gsap.core.Tween>>(new Map());
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize GSAP context on mount with safety checks
  useEffect(() => {
    let isActive = true;

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (!isActive) return;
      
      // Create GSAP context to improve performance
      if (rootRef.current) {
        try {
          contextRef.current = gsap.context(() => {}, rootRef.current);
          setIsMounted(true);
        } catch (err) {
          console.error("Failed to create GSAP context:", err);
        }
      }
    });
    
    // Store reference to current animations Map to use in cleanup
    const currentAnimations = new Map(animationsRef.current);
    
    // Clean up on unmount
    return () => {
      isActive = false;
      setIsMounted(false);
      
      // First revert all GSAP animations
      gsap.globalTimeline.clear();
      
      // Then kill all registered animations
      currentAnimations.forEach((animation) => {
        try {
          if (animation && animation.kill) {
            animation.kill();
          }
        } catch (err) {
          console.error("Error killing animation:", err);
        }
      });
      currentAnimations.clear();
      
      // Clear scrollTriggers
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      
      // Finally, clear context
      if (contextRef.current) {
        try {
          contextRef.current.kill();
          contextRef.current = null;
        } catch (err) {
          console.error("Error killing GSAP context:", err);
        }
      }
    };
  }, []);

  // Register an animation with the context
  const registerAnimation = (id: string, animation: gsap.core.Timeline | gsap.core.Tween) => {
    if (!isMounted) return;
    animationsRef.current.set(id, animation);
  };

  // Remove an animation from the context
  const removeAnimation = (id: string) => {
    if (!isMounted) return;
    
    try {
      const animation = animationsRef.current.get(id);
      if (animation) {
        animation.kill();
        animationsRef.current.delete(id);
      }
    } catch (err) {
      console.error(`Error removing animation ${id}:`, err);
    }
  };

  // Get the GSAP context
  const getContext = () => contextRef.current;

  // Create a timeline that will be automatically managed by the context
  const createTimeline = (vars?: gsap.TimelineVars) => {
    // Add safety defaults to prevent issues
    const safeVars = {
      ...vars,
      onOverwrite: "auto",
      smoothChildTiming: true,
      autoRemoveChildren: true
    };
    
    const timeline = gsap.timeline(safeVars);
    return timeline;
  };

  // The value provided to consumers
  const contextValue: GsapContextType = {
    registerAnimation,
    removeAnimation,
    getContext,
    createTimeline,
    isMounted
  };

  return (
    <GsapContext.Provider value={contextValue}>
      <div ref={rootRef} data-gsap-scope={scope} className="gsap-context-root">
        {children}
      </div>
    </GsapContext.Provider>
  );
};

// Custom hook to use the GSAP context
export const useGsap = () => {
  const context = useContext(GsapContext);
  
  if (!context) {
    throw new Error('useGsap must be used within a GsapProvider');
  }
  
  return context;
};

// Hook for component-specific animations
export const useGsapComponent = (componentId: string) => {
  const { registerAnimation, removeAnimation, getContext, isMounted } = useGsap();
  const animationsRef = useRef<(gsap.core.Timeline | gsap.core.Tween)[]>([]);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  
  // Set mounted state on component mount
  useEffect(() => {
    setIsComponentMounted(true);
    
    return () => {
      setIsComponentMounted(false);
    };
  }, []);
  
  // Clean up animations when component unmounts
  useEffect(() => {
    // Store a reference to the current animations array that we'll use during cleanup
    const currentAnimations = [...animationsRef.current];
    const currentComponentId = componentId;
    
    return () => {
      // Kill all animations using the captured reference
      currentAnimations.forEach(animation => {
        try {
          if (animation && animation.kill) {
            animation.kill();
          }
        } catch (err) {
          console.error(`Error killing animation in ${currentComponentId}:`, err);
        }
      });
      
      // Remove from global registry
      removeAnimation(currentComponentId);
    };
  }, [componentId, removeAnimation]);
  
  // Create an animation and register it
  const createAnimation = <T extends HTMLElement>(
    element: React.RefObject<T> | string | object,
    animationFn: (el: React.RefObject<T> | string | object) => gsap.core.Tween | gsap.core.Timeline,
    register: boolean = true
  ) => {
    if (!isMounted || !isComponentMounted) {
      // Return a dummy animation if not mounted
      return {
        kill: () => {},
        pause: () => {},
        play: () => {},
        progress: () => 0,
      } as unknown as gsap.core.Tween;
    }
    
    try {
      const animation = animationFn(element);
      
      if (register) {
        // Add to local ref for cleanup
        animationsRef.current.push(animation);
        
        // Register with global context (useful for page transitions)
        registerAnimation(`${componentId}-${animationsRef.current.length}`, animation);
      }
      
      return animation;
    } catch (err) {
      console.error(`Error creating animation in ${componentId}:`, err);
      
      // Return a dummy animation on error
      return {
        kill: () => {},
        pause: () => {},
        play: () => {},
        progress: () => 0,
      } as unknown as gsap.core.Tween;
    }
  };
  
  return {
    createAnimation,
    getContext,
    isMounted: isMounted && isComponentMounted,
    registerAnimation: (animation: gsap.core.Timeline | gsap.core.Tween) => {
      if (!isMounted || !isComponentMounted) return;
      
      animationsRef.current.push(animation);
      registerAnimation(`${componentId}-${animationsRef.current.length}`, animation);
    }
  };
};

export default GsapContext;