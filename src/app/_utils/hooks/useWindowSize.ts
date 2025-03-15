import { useState, useEffect } from 'react';

/**
 * `useWindowSize` is a custom React hook that tracks the window's width and height.
 *
 * - It initializes with `undefined` values to ensure server-side and client-side renders match.
 * - It updates state on window resize and cleans up the event listener on unmount.
 *
 * @returns {{ width: number | undefined; height: number | undefined }} 
 * An object containing the current window width and height.
 *
 * @example
 * ```tsx
 * import { useWindowSize } from '../hooks/useWindowSize';
 * 
 * const Component = () => {
 *   const { width, height } = useWindowSize();
 *   
 *   return (
 *     <div>
 *       <p>Width: {width}px</p>
 *       <p>Height: {height}px</p>
 *     </div>
 *   );
 * };
 * ```
 */
export const useWindowSize = () => {
  // State to store window dimensions
  const [windowSize, setWindowSize] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    /**
     * Updates the state with the current window width and height.
     */
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the handler immediately to set initial size
    handleResize();

    // Cleanup: Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Runs only once when the component mounts

  return windowSize;
};
