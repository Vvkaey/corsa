// Comparison.tsx
import { useRef, useState, useEffect } from "react";
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
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const ProductHeadCTA = styled.button`
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

  &:hover {
    background-color: #ff2626;
    color: white;
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
  overflow: visible;
  ${sectionResponsivePadding()}
  ${maxWidthContainer}
`;

// Header and content wrapper for proper pinning
const HeaderContentWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Original Table Header
const TableHeader = styled.div`
  width: 100%;
  background: #fff;
  z-index: 8;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e0e0e0;
  position: relative;

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

// Fixed Header that will display when original header is not visible
const FixedHeaderStyles = styled(TableHeader)`
  position: fixed;
  top: 45px;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 9;
  // box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  display: none;

  margin: 0 auto;

  &.show {
    display: block;
  }

  @media (min-width: 992px) {
    top: 62px;
  }

  .fixed-header-content {
    margin: 0 auto;
    ${sectionResponsivePadding()}
    max-width: 1800px;
  }
`;

// Table Body Container
const TableBodyContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: auto;
   border: 2px solid blue;

`;

// Scrollable inner content
const ScrollableContent = styled.div`
  width: 100%;
  height: auto;
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
    const fixedHeaderRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const isMobile = (width ?? 0) < 768;
    const gsapContext = useGsapContext();

    // Create a separate fixed header for reliability
    useEffect(() => {
      if (!headerRef.current || !fixedHeaderRef.current) return;

      // Clone the header content
      const headerContent = headerRef.current.innerHTML;
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "fixed-header-content";
      contentWrapper.innerHTML = headerContent;

      // Clear and append
      fixedHeaderRef.current.innerHTML = "";
      fixedHeaderRef.current.appendChild(contentWrapper);

      // Function to handle scroll
      const handleScroll = () => {
        if (
          !headerRef.current ||
          !fixedHeaderRef.current ||
          !sectionRef.current
        )
          return;

        const headerRect = headerRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();

        // When the header would move out of view but we're still within the section, show the fixed version
        if (headerRect.top <= 62 && sectionRect.bottom > 0) {
          fixedHeaderRef.current.classList.add("show");
          // Add space to prevent content jump when header becomes fixed
          // if (bodyRef.current) {
          //   bodyRef.current.style.marginTop = `${headerRef.current.offsetHeight - 66}px`;
          // }
        } else {
          fixedHeaderRef.current.classList.remove("show");
          // Remove extra space
          // if (bodyRef.current) {
          //   bodyRef.current.style.marginTop = '0';
          // }
        }
      };

      // Attach scroll listener
      window.addEventListener("scroll", handleScroll);

      // Initial check
      handleScroll();

      // Update fixed header on resize
      const handleResize = () => {
        const headerContent = headerRef.current?.innerHTML || "";
        const contentWrapper = fixedHeaderRef.current?.querySelector(
          ".fixed-header-content"
        );
        if (contentWrapper) {
          contentWrapper.innerHTML = headerContent;
        }
        handleScroll();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }, [isMobile]);

    // Set up GSAP for content scrolling
    useIsomorphicLayoutEffect(() => {
      if (
        !sectionRef.current ||
        !headerRef.current ||
        !bodyRef.current ||
        !contentRef.current ||
        !wrapperRef.current ||
        !containerRef.current
      )
        return;

      const headerHeight = headerRef.current.offsetHeight;
      const contentHeight = contentRef.current.scrollHeight;

      // Set the section height to ensure adequate scrolling space
      const setHeights = () => {
        // Make the section height large e+nough to allow for scrolling through all content
        const totalHeight = contentHeight - 200;
        // // const minHeight = Math.max(totalHeight, window.innerHeight * 2);
        if (sectionRef.current) {
          sectionRef.current.style.height = `${totalHeight}px`;
        }

        // console.log(`Setting component height to ${totalHeight}px`);
      };

      // Set initial heights
      setHeights();

      gsapContext.add(() => {
        console.log("Setting up comparison table with separate fixed header");

        // Clean up any existing ScrollTriggers
        ScrollTrigger.getAll().forEach((st) => st.kill());

        // Create scroll animation for the table content
        const tableScroll = gsap.timeline({
          scrollTrigger: {
            trigger: bodyRef.current,
            start: `top top+=${headerHeight}`,
            end: `+=${contentHeight}*0.25`,
            scrub: 0.1,
            invalidateOnRefresh: true,
          },
        });

        // Animate table content scrolling
        tableScroll.to(contentRef.current, {
          y: -contentHeight,
          ease: "none",
          duration: 1,
        });

        return () => {
          // Clean up
          if (tableScroll.scrollTrigger) tableScroll.scrollTrigger.kill();
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      });

      // Handle resize
      window.addEventListener("resize", () => {
        setHeights();
        // Also update the fixed header on resize
        if (headerRef.current && fixedHeaderRef.current) {
          const headerContent = headerRef.current.innerHTML;
          const contentWrapper = fixedHeaderRef.current.querySelector(
            ".fixed-header-content"
          );
          if (contentWrapper) {
            contentWrapper.innerHTML = headerContent;
          }
        }
      });

      return () => {
        window.removeEventListener("resize", setHeights);
      };
    }, [gsapContext, width, isMobile]);

    return (
      <div className={className} id={htmlId} ref={sectionRef}>
        {/* Fixed header element that stays at the top of screen */}
        <FixedHeaderStyles
          ref={fixedHeaderRef}
          className="fixed-header"
        ></FixedHeaderStyles>

        <ComparisonContainer ref={containerRef}>
          <HeaderContentWrapper ref={wrapperRef}>
            {!isMobile ? (
              <>
                {/* Desktop Table Header - Original */}
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
                                <ProductHeadCTA>
                                  {COMPARISON_DATA[id]?.cta}{" "}
                                  {COMPARISON_DATA[id]?.title.split(" ")[0]}
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
                {/* Mobile Table Header - Original */}
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
  // min-height: auto;
  // height: auto;
  border: 2px solid red;
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
