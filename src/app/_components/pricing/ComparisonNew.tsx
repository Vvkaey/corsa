'use client'
import styled from "styled-components";

const OuterContainer = styled.div`
  width: 100%;
  overflow: hidden; // Contain the child that's 100vw
`

const ComparisonWrapper = styled.div`
  width: 100%;
  background: red;
  height: 500vh;
`

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: yellow;
  height: 220px;
  z-index: 999; // Very high z-index to ensure it's above everything
`

const ComparisonNew = () => {
  return (
    <OuterContainer>
      <ComparisonWrapper>
        <StickyHeader></StickyHeader>
        {/* Content goes here */}
      </ComparisonWrapper>
    </OuterContainer>
  );
}

export default ComparisonNew;