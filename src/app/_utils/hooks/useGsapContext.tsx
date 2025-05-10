import { RefObject, useMemo } from 'react';
import gsap from 'gsap';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';


export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  scope?: RefObject<T>,
  context: gsap.ContextFunc = () => {},
) {
  const ctx = useMemo(() => gsap.context(context, scope), [context, scope]);
  
  useIsomorphicLayoutEffect(() => {
    return () => {
      ctx.revert();
    };
  }, [ctx]);
  
  return ctx;
}