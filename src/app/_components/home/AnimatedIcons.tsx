// components/AnimatedIcons.tsx
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useAnimation } from '../../_utils/hooks/useAnimation';

// Styled components
const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0; /* Start invisible for animation */
`;

const IconText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
`;

interface IconItem {
  icon: string;
  name: string;
}

interface AnimatedIconsProps {
  icons: IconItem[];
}

const AnimatedIcons: React.FC<AnimatedIconsProps> = ({ icons }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(992); // Default value
  const animation = useAnimation('animated-icons');
  
  // Define animation groups
  const firstGroup = React.useMemo(() => [0, 1, 2], []); // First 3 icons
  const secondGroup = React.useMemo(() => [3, 4], []);   // Next 2 icons
  
  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // Set initial width
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Apply animation once the component mounts
  useEffect(() => {
    if (containerRef.current && icons.length > 0) {
      // Create the animation sequence
      animation.animateIcons(containerRef as React.RefObject<HTMLElement>, {
        firstGroup,
        secondGroup,
        staggerDelay: 0.1,  // Delay between each icon in a group
        groupDelay: 1.5     // Delay between group animations
      });
    }
  }, [animation, icons.length, firstGroup, secondGroup]);
  
  return (
    <IconContainer ref={containerRef}>
      {icons.map((item, index) => (
        <IconWrapper key={index}>
          <Image
            src={item.icon}
            alt={`${item.name} icon`}
            width={width > 992 ? 92 : 35}
            height={width > 992 ? 92 : 35}
            style={{ objectFit: "contain" }}
          />
          <IconText>{item.name}</IconText>
        </IconWrapper>
      ))}
    </IconContainer>
  );
};

export default AnimatedIcons;