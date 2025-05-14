import styled from "styled-components";
import { containerSidePadding } from "./styleConstants";
import { sectionResponsivePadding } from "../new_mixins/mixins";
import TitleSubtitle from "./TitleSubtitle";
import { useRef } from "react";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";

interface BannerItemProps {
  head: string | React.ReactNode;
  description: string | React.ReactNode;
}

interface BannerProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  banners: BannerItemProps[];
}

export const BannerSection = styled(
  ({
    className,
    bannerContent,
  }: {
    className?: string;
    bannerContent?: BannerProps;
  }) => {
    const rootContainerRef = useRef<HTMLDivElement>(null);
    const bannerItemsRef = useRef<HTMLDivElement>(null);
    const gsapContext = useGsapContext();
    const { width } = useWindowSize();
    const titleRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
      if (!rootContainerRef.current || !bannerItemsRef.current) return;

      gsapContext.add(() => {
        // Get banner items and title
        const bannerItems = bannerItemsRef.current?.querySelectorAll(".banner-item");

        if (!bannerItems || bannerItems.length === 0) {
          console.warn("No banner items found to animate");
          return;
        }

        // Set initial state for elements
        gsap.set(bannerItems, {
          autoAlpha: 0,
          y: 60, // Increase starting offset for smoother entry
        });

        gsap.set(titleRef.current, {
          autoAlpha: 0,
          y: 60,
        });

        // Create master timeline
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootContainerRef.current,
            start: "top 70%", // Start animation when top of section hits 70% of viewport
            end: "center center", // End when center of section is at center of viewport
            scrub: 1.5, // Slower, smoother scrubbing effect (higher number = slower scrub)
            // markers: false, // Remove this for production
          },
        });

        // First animate the title with a nice ease
        masterTl.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8, // Longer duration for smoother animation
          ease: "power2.out", // Smoother ease
        });

        // Then stagger the banner items one by one with a slower sequence
        bannerItems.forEach((item) => {
          masterTl.to(
            item,
            {
              autoAlpha: 1,
              y: 0, 
              duration: 0.8, // Longer duration for smoother animation
              ease: "power1.inOut", // Gentler ease
            },
            `>-0.5` // Start a bit before previous animation ends for a smoother overlap
          );
        });

        return () => {
          // Clean up this specific ScrollTrigger
          if (masterTl.scrollTrigger) {
            masterTl.scrollTrigger.kill();
          }
        };
      });
    }, [width, gsapContext]);

    return (
      <section className={className} ref={rootContainerRef}>
        <div className="banner-container">
          <div className="title-container" ref={titleRef}>
            <TitleSubtitle
              title={bannerContent?.title}
              subtitle={bannerContent?.description}
              theme="light"
            />
            <div className="circled-container"></div>
          </div>
          <div className="banner-items-container">
            <div className="banner-items" ref={bannerItemsRef}>
              {bannerContent?.banners?.map((item, idx) => {
                return (
                  <div className={`banner-item banner-item-${idx}`} key={idx}>
                    <h3 className="head">{item?.head}</h3>
                    <p className="description">{item?.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
)`
  position: relative;
  padding: 108px 0 50px 0;
  font-family: var(--font-exo);
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  background: #fff;

  @media (min-width: 992px) {
    padding: 100px 0px;
  }

  .banner-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    ${sectionResponsivePadding()}

    @media (min-width: 992px) {
      gap: 17px;
    }

    @media (min-width: 1400px) {
      gap: 37px;
    }

    .title-container {
      position: relative;
      will-change: transform, opacity; /* Performance optimization */
      
      .title {
        margin: 0;
        color: #000;
        text-align: center;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        ${containerSidePadding}

        @media (min-width: 992px) {
          font-size: 46px;
        }

        @media (min-width: 1950px) {
          font-size: 65px;
        }
      }
    }

    .subtitle {
      font-family: var(--font-fustat);
      margin: 0;
      color: #000;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 22.717px */
      max-width: 38ch;
      ${containerSidePadding}

      @media (min-width: 992px) {
        font-size: 20px;
        max-width: 65ch;
      }

      @media (min-width: 992px) {
        font-size: 20px;
      }

      @media (min-width: 1950px) {
        font-size: 28px;
      }
    }

    .banner-items-container {
      position: relative;
      display: flex;
      width: 100%;
      padding: 20px 0;
      justify-content: center;

      @media (min-width: 992px) {
        justify-content: unset;
        width: unset;
        padding: 14px 0px 20px 0px;

        &::before {
          display: inline;
          position: absolute;
          left: -10.5px;
          top: calc(10% - 11px);
          content: "";
          height: 22px;
          width: 22px;
          background-color: #fff;
          border: 1px solid #000;
          border-radius: 50%;
          display: inline-block;
          z-index: 1;
        }

        &::after {
          display: inline;
          position: absolute;
          left: 0;
          bottom: 0;
          content: "";
          height: 100%;
          width: 1.5px;
          background: linear-gradient(
            180deg,
            #878787 0%,
            #e7e7e7 62.15%,
            #f1f1f1 94.77%,
            #fff 140.93%
          );
          display: inline-block;
          z-index: 0;
        }
      }

      @media (min-width: 1950px) {
        padding: 31px 83px 20px 83px;
      }

      .banner-items {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        gap: 7px;
        max-width: 1030px;

        @media (min-width: 992px) {
          width: unset;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 10px;
          flex-grow: 0;
        }

        @media (min-width: 1950px) {
          max-width: 1230px;
        }

        .banner-item {
          display: flex;
          flex-direction: row-reverse;
          padding: 10px;
          width: 100%;
          height: 111px;
          background: red;
          border-radius: 7.47px;
          border: 2px solid #000;
          background: #0c0c0c;
          overflow: hidden;
          gap: 24px;
          flex-grow: 0;
          justify-content: space-between;
          align-items: center;
          will-change: transform, opacity; /* Performance optimization */
          transform-origin: center center;

          @media (min-width: 992px) {
            flex-direction: column-reverse;
            border-radius: 5.62px;
            width: 259px;
            height: 260px;
          }

          @media (min-width: 1950px) {
            border-radius: 13.052px;
            width: 368px;
            height: 368px;
          }

          &:nth-child(odd) {
            padding: 8px 16px;

            @media (min-width: 992px) {
              padding: 39px 18px 17px 18px;
            }
          }

          &:nth-child(even) {
            padding: 8px 16px;

            @media (min-width: 992px) {
              padding: 39px 18px 17px 18px;
            }
          }

          .head {
            margin: 0;
            background: linear-gradient(
              180deg,
              #d3a662 -9.49%,
              #fff 66.17%,
              #fff 78.69%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            font-size: 26px;
            font-style: normal;
            font-weight: 800;
            line-height: 119.982%; /* 40.896px */
            letter-spacing: -1.363px;
            text-transform: uppercase;

            @media (min-width: 992px) {
              font-size: 48px;
              letter-spacing: -1.92px;
            }

            @media (min-width: 1950px) {
              font-size: 68px;
              letter-spacing: -2.72px;
            }
          }

          .description {
            font-family: var(--font-fustat);
            height: 80px;
            margin: auto;
            color: #fff;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 141.979%; /* 25.556px */
            display: flex;
            align-items: center;

            @media (min-width: 992px) {
              display: unset;
              margin: unset;
              font-size: 18px;
              padding: 0 5px;
            }

            @media (min-width: 1950px) {
              font-size: 26px;
            }
          }
        }
      }
    }
  }
`;