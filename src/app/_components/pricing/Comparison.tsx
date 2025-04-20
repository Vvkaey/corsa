// Comparison.tsx
import { useRef, useState } from "react";
import styled from "styled-components";
import { gridMixin } from "../mixins";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { DesktopComparisonTable } from "./DesktopComparisonTable";
import { COMPARISON_DATA } from "../data/productData";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import MobileComparisonTable from "./MobileComparisonTable";

const ProductHeadTitle = styled.h4`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 29px;
  font-style: normal;
  font-weight: 700;
  line-height: 45.626px; /* 157.33% */
  max-width: 20ch;
`;

const ProductHeadPricing = styled.p`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 31.855px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:after {
    content: "/Year";
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 19px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ProductHeadCTA = styled.button`
  color: #ff2626;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 18.994px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border-radius: 8px;
  border: 2px solid #ff2626;
  margin-top: 13px;
  padding: 10px 18px;
  background: transparent;
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  justify-content: center;
`;

// Improve the table header styling for sticky positioning
const TableHeader = styled.table`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  margin-bottom: 0;
  border-collapse: collapse;

  th {
    vertical-align: initial;
    text-align: center;
    padding: 150px 10px 24px 10px; /* Add top padding to the th elements */
    height: 100%;
    width: 22%;

    &:first-child {
      text-align: left;
    }
  }

  .comparator-head {
    width: 30%;
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-size: 47.846px;
    font-style: normal;
    font-family: var(--font-exo);
    font-weight: 600;
    line-height: normal;
    padding-left: 49px;
  }
`;

// Main comparison component
export const Comparison = styled(
  ({ className, htmlId }: { className?: string; htmlId?: string }) => {
    const [comparatorsOrder] = useState<number[]>([0, 1, 2]);
    const { width } = useWindowSize();
    const tableContainer = useRef<HTMLDivElement>(null);
    const isMobile = (width ?? 0) < 768;

    return (
      <div className={className} id={htmlId}>
        <div className="comparison-container">
          {/* <h3>Compare plans & benefits</h3> */}

          {!isMobile ? (
            <>
              <div className="table-container" ref={tableContainer}>
                <div className="thead-wrapper">
                  <TableHeader className="thead-sticky">
                    <thead>
                      <tr>
                        <th className="comparator-head">
                          Compare plans
                          <br /> & benefits
                        </th>
                        {comparatorsOrder.map((id) => (
                          <th key={id} className="th">
                            <div className="content">
                              <ProductHeader>
                                <ProductHeadTitle>
                                  {COMPARISON_DATA[id]?.title}
                                </ProductHeadTitle>
                                <ProductHeadPricing>
                                  {COMPARISON_DATA[id]?.price}
                                </ProductHeadPricing>
                                <ProductHeadCTA>
                                  {COMPARISON_DATA[id]?.cta}
                                </ProductHeadCTA>
                              </ProductHeader>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                  </TableHeader>
                </div>
                <div className="table-body-container">
                  <DesktopComparisonTable
                    data={COMPARISON_DATA}
                    comparatorsOrder={comparatorsOrder}
                  />
                </div>
              </div>
            </>
          ) : (
            // Mobile view code here
            <div className="mobile-view">
              <MobileComparisonTable
                data={COMPARISON_DATA}
                comparatorsOrder={comparatorsOrder}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
)`
  ${gridMixin}
  position: relative;
  background: #fff;
  grid-column: 0 / 10;
  height: 100vh; /* Make component full viewport height */
  display: flex;
  flex-direction: column;

  .comparison-container {
    grid-column: 2 / -2;
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflow at container level */

    h3 {
      color: #000;
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 30px;

      @media screen and (min-width: 480px) {
        margin-top: 2rem;
        font-size: 48px;
        margin-bottom: 30px;
      }
    }
  }

  .table-container {
    position: relative;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    ${sectionResponsivePadding()}
    ${maxWidthContainer}
    
    @media (min-width: 992px) {
      border: none;
    }
  }

  .thead-sticky {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid #e0e0e0;
  }

  .table-body-container {
    max-height: 80vh; /* You can adjust this value based on your needs */
    overflow-y: auto;

    padding-bottom: 120px;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Mobile styles */
  .mobile-view {
    width: 100%;
    .thead {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;

      th {
        vertical-align: initial;
        text-align: left;
        padding: 17px 8px;
        height: 100%;
        width: 50%;

        &.title {
          padding: 25px 2px;
        }
      }

      select {
        appearance: none;
        -webkit-appearance: none;
        background: url("https://public-web-assets.ultrahuman.com/web/icons/down-caret.svg")
          no-repeat 0 0;
        background-position: right 0.5rem top 50%;
        border: none;
        outline: none;
        width: 100%;
        padding-right: 20px;
      }
    }
  }
`;
