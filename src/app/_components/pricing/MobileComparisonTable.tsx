import styled from "styled-components";
import { sectionResponsivePadding } from "../new_mixins/mixins";
import {
  ComparisonDataProps,
  ComparisonPropertyValueProps,
  PropertyMapper,
} from "../data/productData";
import { useState } from "react";
import { PropertyValue } from "./DesktopComparisonTable";

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #f8f8f8;
  ${sectionResponsivePadding()}
  padding-top: 10px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #dedede;
`;

const Tab = styled.button<{ $activetab: boolean }>`
  height: 32px;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid
    ${({ $activetab }) => ($activetab ? "#ff2626" : "transparent")};
  color: ${({ $activetab }) => ($activetab ? "#ff2626" : "#000")};
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const FeatureDescription = styled.p`
  color: #404040;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-top: 26px;
  width: 100%;
`;

const FeatureMetric = styled.div`
  width: 30%;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 19px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-align: center;
`;
const FeatureTitle = styled.h3`
  margin: 0 !important;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 19px !important;
  font-style: normal;
  font-weight: 700 !important;
  line-height: normal;
  width: 70%;
`;

const FeatureContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 32px 0 35px 0;
  border-bottom: 1px solid #dedede;
  height: 100%;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  ${sectionResponsivePadding()};
  height: 100%;
  overflow-y: auto;
`;

const CheckIcon = styled.span`
  color: #00c853;
  font-size: 1.2rem;
`;

const CrossIcon = styled.span`
  color: #ff3d00;
  font-size: 1.2rem;
`;

const MobileComparisonTable = ({
  data,
  comparatorsOrder,
}: {
  data: Array<ComparisonDataProps>;
  comparatorsOrder: number[];
}) => {
  const [active, setActive] = useState(0);

  const renderCellValue = (item: ComparisonDataProps, key: string) => {
    const property = item[
      key as keyof ComparisonDataProps
    ] as ComparisonPropertyValueProps;

    if (typeof property?.value === "boolean") {
      return property.value ? (
        <CheckIcon>✓</CheckIcon>
      ) : (
        <CrossIcon>✗</CrossIcon>
      );
    } else if (typeof property?.value === "number") {
      return property.value > 0 ? property.value : <CrossIcon>✗</CrossIcon>;
    } else {
      return property?.value;
    }
  };

  console.log(data);

  // Filter property keys that exist in the data
  const featureKeys = Object.keys(PropertyMapper).filter((key) =>
    data.some(
      (item) =>
        typeof item[key as keyof ComparisonDataProps] === "object" &&
        "id" in (item[key as keyof ComparisonDataProps] as PropertyValue)
    )
  );

  console.log(featureKeys);

  return (
    <MobileTableContainer>
      <Tabs>
        <Tab
          $activetab={active === 0 ? true : false}
          onClick={() => setActive(0)}
        >
          Insight
        </Tab>
        <Tab  $activetab={active === 1 ? true : false} onClick={() => setActive(1)}>
          Mentor
        </Tab>
        <Tab  $activetab={active === 2 ? true : false} onClick={() => setActive(2)}>
          Membership
        </Tab>
      </Tabs>
      <FeaturesList>
        {featureKeys.map((key) => (
          <FeatureContent
            key={PropertyMapper[key as keyof typeof PropertyMapper].title}
          >
            <FeatureTitle>
              {PropertyMapper[key as keyof typeof PropertyMapper].title}
            </FeatureTitle>
            <FeatureMetric>
              {renderCellValue(data[comparatorsOrder[active]], key)}
            </FeatureMetric>
            <FeatureDescription>
              {PropertyMapper[key as keyof typeof PropertyMapper].subtitle}
            </FeatureDescription>
          </FeatureContent>
        ))}
      </FeaturesList>
    </MobileTableContainer>
  );
};

export const MobileTableContainer = styled.section`
  margin-top: 50px;
  width: 100%;
  height: 100vh;
`;

export default MobileComparisonTable;



