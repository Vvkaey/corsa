import styled from "styled-components";
import { sectionResponsivePadding } from "../new_mixins/mixins";
import {
  ComparisonDataProps,
  ComparisonPropertyValueProps,
  PropertyMapper,
} from "../data/productData";
// import { useState } from "react";
import { PropertyValue } from "./DesktopComparisonTable";
import { PricingCross, PricingTick } from "@/app/_assets/icons";
import { forwardRef } from "react";

// const Tabs = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   background: #f8f8f8;
//   ${sectionResponsivePadding()}
//   padding-top: 10px;
//   padding-bottom: 10px;
//   position: sticky;
//   top: 47px;
//   z-index: 5;
//   border-bottom: 1px solid #dedede;

//   @media (min-width: 992px) {
//     display: none;
//   }
// `;

// const Tab = styled.button<{ $activetab: boolean }>`
//   height: 32px;
//   width: 30%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: transparent;
//   border: none;
//   border-bottom: 1px solid
//     ${({ $activetab }) => ($activetab ? "#ff2626" : "transparent")};
//   color: ${({ $activetab }) => ($activetab ? "#ff2626" : "#000")};
//   leading-trim: both;
//   text-edge: cap;
//   font-family: var(--font-exo);
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   cursor: pointer;
// `;

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
  margin: 0;
  text-align: left;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-align: left;
`;

const FeatureContentBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 32px 16px 35px 16px;
  border-bottom: 1px solid #dedede;
  min-height: 100px;
  background: #fff;
`;

const FeatureContent = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  (props, ref) => (
    <FeatureContentBase ref={ref} className="feature-content">
      {props.children}
    </FeatureContentBase>
  )
);

FeatureContent.displayName = 'FeatureContent';

const FeaturesList = styled.div<{ $isScrollable: boolean }>`
  display: flex;
  flex-direction: column;
  ${sectionResponsivePadding()};
  height: 100%;
  overflow-y: ${props => props.$isScrollable ? 'auto' : 'hidden'};
  transition: overflow-y 0.3s ease;
  -webkit-overflow-scrolling: touch;
  position: relative;
`;

const CheckIcon = styled.span``;

const CrossIcon = styled.span`
  color: #ff3d00;
  font-size: 1.2rem;
`;

const MobileTableContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ComparisonBody = styled.div`
  flex: 1;
  height: calc(100vh - 48px);
  position: relative;
  overflow: hidden;
`;

const MobileComparisonTable = ({
  data,
  comparatorsOrder,
  active,
  isScrollable,
  featuresListRef,
  lastFeatureRef
}: {
  data: Array<ComparisonDataProps>;
  comparatorsOrder: number[];
  active: number;
  isScrollable: boolean;
  featuresListRef: React.RefObject<HTMLDivElement | null>;
  lastFeatureRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const renderCellValue = (item: ComparisonDataProps, key: string) => {
    const property = item[
      key as keyof ComparisonDataProps
    ] as ComparisonPropertyValueProps;

    if (typeof property?.value === "boolean") {
      return property.value ? (
        <CheckIcon>
          <PricingTick fill="#34A853" width={15} height={10.5} />
        </CheckIcon>
      ) : (
        <CrossIcon>
          <PricingCross width={12} height={12} />
        </CrossIcon>
      );
    } else if (typeof property?.value === "number") {
      return property.value > 0 ? property.value : <CrossIcon>✗</CrossIcon>;
    } else {
      return property?.value;
    }
  };

  // Filter property keys that exist in the data
  const featureKeys = Object.keys(PropertyMapper).filter((key) =>
    data.some(
      (item) =>
        typeof item[key as keyof ComparisonDataProps] === "object" &&
        "id" in (item[key as keyof ComparisonDataProps] as PropertyValue)
    )
  );

  return (
    <MobileTableContainer>
      <ComparisonBody>
        <FeaturesList ref={featuresListRef} $isScrollable={isScrollable}>
          {featureKeys.map((key, index) => (
            <FeatureContent
              key={PropertyMapper[key as keyof typeof PropertyMapper].title}
              ref={index === featureKeys.length - 1 ? lastFeatureRef : null}
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
      </ComparisonBody>
    </MobileTableContainer>
  );
};

export default MobileComparisonTable;