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
import {
  badge_mapper,
  useMentorshipContext,
} from "@/app/_contexts/MentorshipContext";
import { CheckForAddOn, TestCompatibility } from "./PricingPage";
import { useRouter } from "next/navigation";

const ProductHeadTitle = styled.h4`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 20.3px;
  font-style: normal;
  font-weight: 700;
  line-height: 45.626px; /* 157.33% */
  max-width: 20ch;

  @media (min-width: 1950px) {
    font-size: 29px;
  }
`;

const ProductHeadPricing = styled.p`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 20.3px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (min-width: 1950px) {
    font-size: 31.855px;
  }

  &:after {
    content: "/Year";
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 13.3px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media (min-width: 1950px) {
      font-size: 19px;
    }
  }
`;

const ProductHeadCTA = styled.button<{ $subscribed: boolean; $addOn: boolean }>`
  position: relative;
  color: #ff2626;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 13.3px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border-radius: 5.6px;
  border: 1.4px solid #ff2626;
  margin-top: 10px;
  padding: 10px 18px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => (props.$subscribed ? "#fff" : "#ff2626")};
    color: ${(props) => (props.$subscribed ? "#ff2626" : "#fff")};
  }

  &:disabled {
    background-color: #aeaeae;
    color: #fff;
    border-color: #aeaeae;
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (min-width: 992px) {
    width: 200px;
  }

  @media (min-width: 1950px) {
    width: 305px;
    margin-top: 13px;
    border-radius: 8px;
    font-size: 19px;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;

  @media (min-width: 1950px) {
    gap: 14px;
  }
`;

// The outer container for the entire component
const ComparisonContainer = styled.div`
  width: 100%;
  position: relative;
  ${sectionResponsivePadding()}
  ${maxWidthContainer}
  background: #fff;
`;

// Header and content wrapper for proper pinning
const HeaderContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Original Table Header
const TableHeader = styled.div`
  position: sticky;
  top: 53px; // Exact height of main header on larger screens
  left: 0;
  right: 0;
  z-index: 5; // Lower than main header
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: none; // Hide by default

  @media (min-width: 992px) {
    display: block; // Show only on desktop
  }

  @media (min-width: 1950px) {
   top: 70px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    vertical-align: initial;
    text-align: center;
    padding: 30px 10px 24px 10px;
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
    font-size: 33.6px;
    font-style: normal;
    font-family: var(--font-exo);
    font-weight: 600;
    line-height: normal;
    padding-left: 49px;

    @media (min-width: 1950px) {
      font-size: 47.846px;
    }
  }
`;

// Table Body Container
const TableBodyContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 2rem 0;
`;

// Scrollable inner content
const ScrollableContent = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;

// Main comparison component
export const Comparison = styled(
  ({ className, htmlId }: { className?: string; htmlId?: string }) => {
    const [comparatorsOrder] = useState<number[]>([0, 1, 2]);
    const { width } = useWindowSize();
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isMobile = (width ?? 0) < 768;
    const { badge } = useMentorshipContext();
    const router = useRouter();

    const handleSubscribe = (id: number) => {
      // Check if user is authenticated
      const token = localStorage.getItem("authToken");
      if (!token) {
        // If not authenticated, redirect to login with checkout path as redirect parameter
        // router.push(`/login?redirect=/checkout/${pricingData.plans[id - 1].productType}`);
        router.push(`/login?redirect=/pricing`);
        return;
      }
      router.push(`/checkout/${id}`);
    };

    return (
      <div className={className} id={htmlId} ref={sectionRef}>
        <ComparisonContainer ref={containerRef}>
          <HeaderContentWrapper ref={wrapperRef}>
            {!isMobile ? (
              <>
                {/* Desktop Table Header */}
                <TableHeader ref={headerRef} className="thead-sticky">
                  <table>
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
                                <ProductHeadCTA
                                  disabled={
                                    !(TestCompatibility({
                                      badge,
                                      id: id + 1,
                                    }) as boolean)
                                  }
                                  $subscribed={
                                    badge_mapper[
                                      (id + 1) as keyof typeof badge_mapper
                                    ] == badge
                                  }
                                  $addOn={
                                    CheckForAddOn({
                                      badge,
                                      id: id + 1,
                                    }) as boolean
                                  }
                                  onClick={() => {
                                    if (TestCompatibility({ badge, id: id + 1 }) && 
                                        badge_mapper[(id + 1) as keyof typeof badge_mapper] !== badge) {
                                      handleSubscribe(id + 1);
                                    }
                                  }}
                                >
                                  {!(TestCompatibility({
                                    badge,
                                    id: id + 1,
                                  }) as boolean)
                                    ? "Not Compatible"
                                    : badge_mapper[
                                        (id + 1) as keyof typeof badge_mapper
                                      ] == badge
                                    ? COMPARISON_DATA[id]?.subscribedCta
                                    : (CheckForAddOn({
                                        badge,
                                        id: id + 1,
                                      }) as boolean)
                                    ? COMPARISON_DATA[id]?.addOnCTa
                                    : COMPARISON_DATA[id]?.cta}
                                </ProductHeadCTA>
                              </ProductHeader>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                  </table>
                </TableHeader>

                {/* Desktop Table Body */}
                <TableBodyContainer
                  ref={bodyRef}
                  className="table-body-container"
                >
                  <ScrollableContent ref={contentRef}>
                    <DesktopComparisonTable
                      data={COMPARISON_DATA}
                      comparatorsOrder={comparatorsOrder}
                    />
                  </ScrollableContent>
                </TableBodyContainer>
              </>
            ) : (
              <>
                {/* Mobile Table Header */}
                <TableHeader
                  ref={headerRef}
                  className="thead-sticky mobile-header"
                >
                  <h2 className="comparator-head">Compare plans & benefits</h2>
                </TableHeader>

                {/* Mobile Table Body */}
                <TableBodyContainer
                  ref={bodyRef}
                  className="table-body-container"
                >
                  <ScrollableContent ref={contentRef}>
                    <MobileComparisonTable
                      data={COMPARISON_DATA}
                      comparatorsOrder={comparatorsOrder}
                    />
                  </ScrollableContent>
                </TableBodyContainer>
              </>
            )}
          </HeaderContentWrapper>
        </ComparisonContainer>
      </div>
    );
  }
)`
  ${gridMixin}
  position: relative;
  background: #fff;
  grid-column: 0 / 10;

  /* Mobile header styling */
  .mobile-header {
    padding: 20px;

    .comparator-head {
      color: #000;
      font-size: 28px;
      font-style: normal;
      font-family: var(--font-exo);
      font-weight: 600;
      line-height: normal;
    }
  }
`;

export default Comparison;
