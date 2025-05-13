'use client'
import { useEffect } from 'react';
import styled from "styled-components";

const TestContainer = styled.div`
  height: 200vh;
  background: linear-gradient(to bottom, #f00, #00f);
`

const TestSticky = styled.div`
  position: sticky;
  top: 0;
  background: yellow;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`

export default function StickyTest() {
  // Log when the component mounts to make sure it's rendering
  useEffect(() => {
    console.log('Sticky test component mounted');
  }, []);

  return (
    <TestContainer>
      <TestSticky>This should stick to the top</TestSticky>
    </TestContainer>
  );
}