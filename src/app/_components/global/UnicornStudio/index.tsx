
'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface UnicornStudioProps {
  projectId: string;
  width?: number | string;
  height?: number | string;
}

const UnicornContainer = styled.div<{ width: string | number; height: string | number }>`
  width: ${props => typeof props.width === 'number' ? `${props.width}px` : props.width};
  height: ${props => typeof props.height === 'number' ? `${props.height}px` : props.height};
`;

const UnicornStudio: React.FC<UnicornStudioProps> = ({ 
  projectId, 
  width = 1440, 
  height = 900 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    
    // Inject exactly the script from the embed code
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.18/dist/unicornStudio.umd.js",
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          },
          (document.head || document.body).appendChild(i)
        }
      }()
    `;
    
    // We only append the script if UnicornStudio isn't already initialized
    if (!window.UnicornStudio) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <UnicornContainer 
      ref={containerRef}
      width={width} 
      height={height} 
      data-us-project={projectId}
    />
  );
};

export default UnicornStudio;

// Add this in a separate file for TypeScript support
// types/unicorn.d.ts
interface UnicornStudioType {
  isInitialized: boolean;
  init: () => void;
}

declare global {
  interface Window {
    UnicornStudio: UnicornStudioType;
  }
}