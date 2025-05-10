import styled from "styled-components";
import Image from "next/image";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export const BehindTheScenes = styled(
  ({ className, htmlId }: { className?: string; htmlId?: string }) => {
    const gsapContext = useGsapContext();
    const { width } = useWindowSize();
    const container = useRef<HTMLDivElement>(null);
    const stickyWrapperRef = useRef<HTMLDivElement>(null);
    const isMobile = width && width < 992;

    // Use GSAP ScrollTrigger instead of CSS sticky
    useEffect(() => {
      if (
        !container.current ||
        !stickyWrapperRef.current ||
        typeof window === "undefined"
      )
        return;

      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach((st) => st.kill());

      const stickyAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
          pin: stickyWrapperRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Debug info
      console.log("BehindTheScenes: ScrollTrigger initialized");

      return () => {
        // Clean up the ScrollTrigger when the component unmounts
        if (stickyAnimation.scrollTrigger) {
          stickyAnimation.scrollTrigger.kill();
        }
      };
    }, []);

    const animationInit = () => {
      if (!container.current || !window) return;

      gsapContext.add(() => {
        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "power2.easeInOut",
          },
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        });

        tl.set(`.tc-1 > span`, {
          autoAlpha: 0.2,
        });

        tl.fromTo(
          ".tc-1 > span",
          {
            autoAlpha: 0.2,
          },
          {
            autoAlpha: 0.5,
            duration: 0.35,
            stagger: 0.2,
          },
          0.2
        );

        tl.fromTo(
          ".tc-1 > span",
          {
            autoAlpha: 0.5,
          },
          {
            autoAlpha: 1,
            duration: 0.35,
            stagger: 0.2,
          },
          0.2
        );

        tl.addPause(5.5);
      });
    };

    const intersectionObserver = useRef<IntersectionObserver | null>(null);

    useIsomorphicLayoutEffect(() => {
      intersectionObserver.current = new IntersectionObserver(
        () => {
          animationInit();
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 0,
        }
      );

      intersectionObserver.current.observe(container.current as Element);

      return () => {
        if (intersectionObserver.current) {
          intersectionObserver.current.disconnect();
        }
      };
    }, []);

    return (
      <section className={className} id={htmlId} ref={container}>
        <div className="sticky-wrapper" ref={stickyWrapperRef}>
          <div className="container">
            <div className="head-container">
              <h2 className="title">
                Behind The <span className="red-block">Scenes</span>
              </h2>
              <p className="subtitle">
                How it all comes together.{isMobile ? <br /> : null} The good
                and the messy.
              </p>
            </div>
            <div className="content-container">
              {(width ?? 0) > 992 ? <div className="img-container">
                <Image
                  src={"/behindScenes.png"}
                  alt={"Behind the scenes image"}
                  fill
                />
              </div> : null}
              <p className="text-content tc-1">
                <span> Ever </span>
                <span> felt </span>
                <span>lost, </span>
                <span>not </span>
                <span>knowing </span>
                <span>what </span>
                <span>to </span>
                <span>do </span>
                <span>next? </span>
                <span>🤔 You&apos;ve </span>
                <span>set</span>
                <span>your </span>
                <span>aim </span>
                <span>on </span>
                <span>IIT-JEE </span>
                <span>or </span>
                <span>another </span>
                <span>engineering </span>
                <span>exam </span>
                <span>🎯 </span>
                <span>but </span>
                <span>have </span>
                <span>no</span>
                <span>idea </span>
                <span>how </span>
                <span>to </span>
                <span>crack </span>
                <span>it, </span>
                <span>or </span>
                <span>just </span>
                <span>trying </span>
                <span>to </span>
                <span>figure </span>
                <span>out </span>
                <span>how </span>
                <span>to </span>
                <span>plan</span>
                <span>things </span>
                <span>after </span>
                <span>school.</span>
                <br />
                <br /> <span>We </span>
                <span>get </span>
                <span>it. </span>
                <span>🙌 </span>
                <br />
                <br /> <span>It&apos;s </span>
                <span>tough </span>
                <span>figuring </span>
                <span>everything </span>
                <span>out </span>
                <span>on </span>
                <span>your </span>
                <span>own. </span>
                <span>The</span>
                <span>late </span>
                <span>nights</span>
                <span> wondering </span>
                <span>if </span>
                <span>you&apos;re </span>
                <span>studying </span>
                <span>the </span>
                <span>right </span>
                <span>things</span>
                <span>🌙💭, </span>
                <span>the </span>
                <span>stress </span>
                <span>of </span>
                <span>falling </span>
                <span>behind </span>
                <span>or </span>
                <span>feeling </span>
                <span>stuck </span>
                <span>😤.</span>
                <span>That&apos;s </span>
                <span>where </span>
                <span>the </span>
                <span>right </span>
                <span>mentor </span>
                <span>makes </span>
                <span>all </span>
                <span>the </span>
                <span>difference.</span>
                <br />
                <br /> <span>A </span>
                <span>mentor </span>
                <span>isn&apos;t </span>
                <span>just </span>
                <span>someone </span>
                <span>who </span>
                <span>gives </span>
                <span>advice.</span>
                <span>They&apos;ve </span>
                <span>actually </span>
                <span>been </span>
                <span>through </span>
                <span>it. </span>
                <span>🛤️ </span>
                <span>Faced </span>
                <span>the </span>
                <span>same </span>
                <span>chapters,</span>
                <span>the </span>
                <span>same </span>
                <span>pressure, </span>
                <span>made </span>
                <span>mistakes, </span>
                <span>and </span>
                <span>figured </span>
                <span>out </span>
                <span>what </span>
                <span>really</span>
                <span>works.</span>
                <br />
                <br />
                <span>They&apos;re </span>
                <span>here </span>
                <span>to </span>
                <span>guide </span>
                <span>you, </span>
                <span>share </span>
                <span>proven </span>
                <span>strategies,</span>
                <span>and </span>
                <span>help </span>
                <span>you </span>
                <span>move </span>
                <span>ahead </span>
                <span>with </span>
                <span>clarity. </span>
                <span>🧭 </span>
                <span>From </span>
                <span>knowing </span>
                <span>what </span>
                <span>to</span>
                <span>focus </span>
                <span>on </span>
                <span>🪜 </span>
                <span>to </span>
                <span>planning </span>
                <span>everything </span>
                <span>smartly </span>
                <span>🔥</span>
                <br />
                <br />
                <span> Our </span>
                <span>platform </span>
                <span>gives </span>
                <span>you </span>
                <span>access </span>
                <span>to </span>
                <span>the </span>
                <span>insights, </span>
                <span>strategies, </span>
                <span>and</span>
                <span> resources </span>
                <span>you </span>
                <span>need </span>
                <span>to </span>
                <span>plan </span>
                <span>better. </span>
                <span>📚 </span>
                <span>And </span>
                <span>the </span>
                <span>best </span>
                <span>part? </span>
                <span>You </span>
                <span>can</span>
                <span> connect </span>
                <span>1-on-1 </span>
                <span>with </span>
                <span>mentors </span>
                <span>from </span>
                <span>IITs, </span>
                <span>NITs, </span>
                <span>BITS </span>
                <span>and </span>
                <span>more</span>
                <span> directly. </span>
                <span>Ask questions, </span>
                <span>clear </span>
                <span>doubts, </span>
                <span>and </span>
                <span>get </span>
                <span>structured</span>
                <span> guidance. </span>
                <span>🗣️🤝 </span>
                <span>Lessss </span>
                <span>goooooooooo! </span>
                <span>🙌 🚀</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
)`
  height: 250vh;
  width: 100%;
  position: relative;
  background: #fff;

  .sticky-wrapper {
    width: 100%;
    height: 100vh;
    background: #fff;
    padding: 80px 0;
    font-family: var(--font-exo);
    margin: auto;
    padding-top: 84px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 992px) {
      padding: 96px 0;
      padding-top: 96px;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 21px;
    margin: auto;
    ${sectionResponsivePadding()};
    ${maxWidthContainer};

    @media (min-width: 992px) {
      gap: 17px;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: auto;
      text-align: center;

      @media (min-width: 992px) {
        text-align: unset;
        gap: 16px;
        margin: unset;
      }

      .title {
        margin: 0;
        color: #000;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;

        @media (min-width: 992px) {
          font-size: 46px;
        }

        @media (min-width: 1950px) {
          font-size: 65px;
        }

        .red-block {
          color: #fff;
          background: #ff2626;
        }
      }

      .subtitle {
        font-family: var(--font-fustat);
        margin: 0;
        color: #000;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 22.717px */
        margin: auto;

        @media (min-width: 992px) {
          width: 100%;
          margin: unset;
        }

        @media (min-width: 1950px) {
          font-size: 24px;
        }
      }
    }

    .content-container {
      display: flex;
      gap: 52px;
      width: 100%;
      flex-direction: column;
      align-items: center;

      @media (min-width: 992px) {
        flex-direction: row;
      }

      .img-container {
        width: 100%;
        flex-shrink: 0;
        position: relative;
        height: 304px;

        @media (min-width: 992px) {
          width: 32%;
          height: 455px;
        }

        @media (min-width: 1950px) {
          width: 35%;
          height: 648px;
        }

        img {
          width: 100%;
          height: auto;
          position: absolute;
          object-fit: contain;
        }
      }

      .text-content {
        font-family: var(--font-fustat);
        color: #000;
        font-size: 17.5px;
        font-style: normal;
        font-weight: 500;
        line-height: 142.05%; /* 22.728px */
        margin: 0 8px;

        @media (min-width: 1950px) {
          margin: unset;
          font-size: 25px;
        }
      }
    }
  }
`;
