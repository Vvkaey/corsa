import styled from "styled-components";
import { useRef } from "react";
import { maxWidthContainer, sectionResponsivePadding } from "../new_mixins/mixins";

const ComparisonSectionWrapper = styled.section.attrs(() => ({
  className: "comparison-section",
}))`
  position: relative;
  min-height: 400vh;
  width: 100%;
  background: linear-gradient(
    0deg,
    #0e0e0e 0%,
    #0e0e0e 66.46%,
    #9f9d9d 134.59%
  );
  ${sectionResponsivePadding()}
  ${maxWidthContainer}
`;

const ComparisonHead = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 30vh;
  background: linear-gradient(
    0deg,
    #0e0e0e 0%,
    #0e0e0e 66.46%,
    #9f9d9d 134.59%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

const ComparisonContent = styled.div`
  width: 100%;
  position: relative;
  padding: 2rem 0;
  color: white;
`;

const ComparisonSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <ComparisonSectionWrapper ref={sectionRef}>
      <ComparisonHead>
        <h2>Compare Our Plans</h2>
      </ComparisonHead>
      <ComparisonContent>
        {/* Add your comparison content here */}
        <div style={{ height: "100vh" }}>Content Section 1</div>
        <div style={{ height: "100vh" }}>Content Section 2</div>
        <div style={{ height: "100vh" }}>Content Section 3</div>
        <div style={{ height: "100vh" }}>Content Section 4</div>
      </ComparisonContent>
    </ComparisonSectionWrapper>
  );
};

export default ComparisonSection;
