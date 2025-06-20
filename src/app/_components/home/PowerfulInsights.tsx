import styled from "styled-components";
import { maxWidthContainer, responsivePadding } from "../new_mixins/mixins";
import { useRef } from "react";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";

interface ColItemProps {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}

interface ColProps {
  colA: Array<ColItemProps>;
  colB: Array<ColItemProps>;
}

export const PowerfulInsights = styled(
  ({ className, insights }: { className?: string; insights?: ColProps }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const traitsRef = useRef<HTMLDivElement>(null);
    const colARef = useRef<HTMLDivElement>(null);
    const colBRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<HTMLDivElement>(null);
    const bottomLineRef = useRef<HTMLDivElement>(null);
    
    const gsapContext = useGsapContext();
    const { width } = useWindowSize();

    useIsomorphicLayoutEffect(() => {
      if (!sectionRef.current || !headingRef.current || !traitsRef.current || (width && width < 992)) return;

      gsapContext.add(() => {
        // Get all column items
        const colAItems = colARef.current?.querySelectorAll(".col-item");
        const colBItems = colBRef.current?.querySelectorAll(".col-item");

        // Set initial states
        gsap.set(headingRef.current, {
          autoAlpha: 0,
          y: 60
        });

        gsap.set([colAItems, colBItems], {
          autoAlpha: 0,
          y: 40
        });

        // Set initial states for decorative elements
        if (topLineRef.current) {
          gsap.set(topLineRef.current, {
            scaleX: 0,
            transformOrigin: "center center"
          });
        }

        if (bottomLineRef.current) {
          gsap.set(bottomLineRef.current, {
            scaleX: 0,
            transformOrigin: "center center"
          });
        }

        // Create timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
            // markers: false,
          }
        });

        // Animate heading
        tl.to(headingRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });

        // Animate lines (if they exist)
        if (topLineRef.current) {
          tl.to(topLineRef.current, {
            scaleX: 1,
            duration: 0.6,
            ease: "power1.inOut"
          }, ">-0.2");
        }

        if (bottomLineRef.current) {
          tl.to(bottomLineRef.current, {
            scaleX: 1,
            duration: 0.6,
            ease: "power1.inOut"
          }, ">-0.3");
        }

        // Animate column items in sequence
        const staggerItems = (items: NodeListOf<Element> | undefined, offset: number) => {
          if (!items || items.length === 0) return;
          
          items.forEach((item) => {
            tl.to(item, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            }, `>-${0.3 + (offset * 0.1)}`); // Stagger based on position
          });
        };

        // Stagger column A slightly ahead of column B for visual interest
        staggerItems(colAItems, 0);
        staggerItems(colBItems, 0.2);

        return () => {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
        };
      });
    }, [width, gsapContext]);

    return (
      <section className={className} ref={sectionRef}>
        <div className="container">
          <div className="head-container" ref={headingRef}>
            <h2 className="title">Just Powerful Insights, Weekly.</h2>
            <p className="subtitle">
              Get deep-dive analysis and proven frameworks straight from expert
              mentors.
            </p>
          </div>
          <div className="traits-container" ref={traitsRef}>
            {/* Add decorative lines for animation */}
            <div className="top-line" ref={topLineRef}></div>
            <div className="bottom-line" ref={bottomLineRef}></div>
            
            <div className="col" ref={colARef}>
              {insights?.colA &&
                insights?.colA?.map((item, idx) => {
                  return (
                    <div className={`col-item col-item-a-${idx}`} key={idx}>
                      {item?.icon ? (
                        <div className="icon-container">{item?.icon}</div>
                      ) : null}
                      <div className="text">
                        {item?.title ? (
                          <h3 className="title">{item?.title}</h3>
                        ) : null}
                        {item?.description ? (
                          <p className="description">{item?.description}</p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="col" ref={colBRef}>
              {insights?.colB &&
                insights?.colB?.map((item, idx) => {
                  return (
                    <div className={`col-item col-item-b-${idx}`} key={idx}>
                      {item?.icon ? (
                        <div className="icon-container">{item?.icon}</div>
                      ) : null}
                      <div className="text">
                        {item?.title ? (
                          <h3 className="title">{item?.title}</h3>
                        ) : null}
                        {item?.description ? (
                          <p className="description">{item?.description}</p>
                        ) : null}
                      </div>
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
  width: 100%;
  font-family: var(--font-exo);
  padding: 40px 0 10px 0;
  margin: auto;
  background: #fff;
  @media (min-width: 992px) {
    padding: 68px 0;
  }

  h2,
  p {
    margin: 0;
  }

  .container {
    ${maxWidthContainer};
    ${responsivePadding()};
    margin: auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 992px) {
      gap: 55px;
    }

    .head-container {
      margin: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 14px;
      will-change: transform, opacity;

      @media (min-width: 992px) {
        gap: 13px;
      }

      .title {
        color: #000;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;

        @media (min-width: 992px) {
          font-size: 46px;
        }

        @media (min-width: 1950px) {
          font-size: 65.39px;
        }
      }

      .subtitle {
        font-family: var(--font-fustat);
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 28.396px */
        max-width: 34ch;
        margin: auto;

        @media (min-width: 992px) {
          font-size: 20px;
          max-width: unset;
        }

        @media (min-width: 1950px) {
          font-size: 28.43px;
        }
      }
    }

    .traits-container {
      margin: auto;
      position: relative;
      display: flex;
      width: calc(100% - 68px);
      flex-direction: column;
      padding: 19px 0 16px 0;
      max-width: 34ch;

      @media (min-width: 992px) {
        max-width: 90%;
        flex-direction: row;
        padding: unset;
        justify-content: center;
      }

      @media (min-width: 1500px) {
        max-width: 70%;
      }

      @media (min-width: 1950px) {
        max-width: 98%;
      }

      /* Replaced pseudo-elements with actual elements for animation */
      .top-line, .bottom-line {
        position: absolute;
        width: 70%;
        height: 1px;
        left: 15%;
        background: linear-gradient(
          90deg,
          #c2c2c2 2.5%,
          #000 58.5%,
          #c2c2c2 95.5%
        );
        display: none;
        will-change: transform;

        @media (min-width: 992px) {
          display: block;
        }
      }

      .top-line {
        top: 0;
      }

      .bottom-line {
        bottom: 0;
      }

      .col {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 992px) {
          justify-content: flex-start;
          align-items: unset;
          padding: 51px 0;
          width: 33.33%;
          gap: 69px;
        }

        &:last-child {
          @media (min-width: 992px) {
            align-items: flex-end;
          }
        }

        .col-item {
          position: relative;
          display: flex;
          gap: 12.5px;
          align-items: flex-start;
          padding: 23px 0;
          width: 30ch;
          will-change: transform, opacity;

          @media (min-width: 992px) {
            min-height: 96px;
            padding: unset;
            gap: 13px;
            width: 38ch;
          }

          @media (min-width: 1950px) {
            min-height: 120px;
            width: 47ch;
          }

          .icon-container {
            position: relative;
            top: 0;

            @media (min-width: 992px) {
              top: 3%;
            }

            @media (min-width: 1950px) {
              top: 5%;
            }

            img {
              object-fit: cover;
            }
          }

          .text {
            display: flex;
            flex-direction: column;
            gap: 9px;

            @media (min-width: 992px) {
              gap: 20px;
            }

            h3,
            p {
              margin: 0;
            }

            .title {
              color: #000;
              leading-trim: both;
              text-edge: cap;
              font-size: 18px;
              font-style: italic;
              font-weight: 700;
              line-height: 119.982%; /* 28.796px */

              @media (min-width: 992px) {
                font-size: 24px;
              }

              @media (min-width: 1950px) {
                font-size: 34.1px;
              }
            }

            .description {
              font-family: var(--font-fustat);
              color: #2b2b2b;
              leading-trim: both;
              text-edge: cap;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 141.979%; /* 22.717px */

              @media (min-width: 992px) {
                max-width: 30ch;
                font-weight: 700;
                font-size: 16px;
              }

              @media (min-width: 1950px) {
                font-size: 22.7px;
              }
            }
          }
        }
      }
    }
  }
`;