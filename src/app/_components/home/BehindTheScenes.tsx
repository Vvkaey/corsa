import styled from "styled-components";
import Image from "next/image";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import {  useRef } from "react";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";

export const BehindTheScenes = styled(
  ({ className, htmlId }: { className?: string; htmlId?: string }) => {
    const { width } = useWindowSize();
    const isMobile = width && width < 992;
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subTitleRef = useRef<HTMLParagraphElement>(null);
    const gsapContext = useGsapContext();



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
            start: isMobile ? "top 10%" : "top 40%",
            end: isMobile ? "top -50%" : "top 5%",
            scrub: 1,
            markers: false,
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
            duration: 1,
            stagger: 0.1,
          },
          0.2
        );

        tl.fromTo(
          ".tc-1 > span",
          {
            autoAlpha: 0.2,
          },
          {
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
          },
          "0.2"
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
    }, [width, gsapContext]);


    useIsomorphicLayoutEffect(() => {
      if ( !titleRef.current || !subTitleRef.current || !container.current) return;
  
      gsapContext.add(() => {
        // Set initial states
        gsap.set([titleRef.current, subTitleRef.current], {
          autoAlpha: 0,
          y: 50,
        });
        
  
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
            end: "top 15%",
            scrub: 0.8,
          },
        });
  
        // Animate title and subtitle
        tl.to(titleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        })
        .to(subTitleRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
        }, "-=0.3")
        
        
        return () => {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
        };
      });
  
  
    }, [width, gsapContext]);

    return (
      <section className={className} id={htmlId} ref={container}>
        <div className="container">
          <div className="head-container">
            <h2 className="title" ref={titleRef}>
              Behind The <span className="red-block">Scenes</span>
            </h2>
            <p className="subtitle" ref={subTitleRef}>
              How it all comes together.{isMobile ? <br /> : null} The good and
              the messy.
            </p>
          </div>
          <div className="content-container">
            <div className="img-container">
              <Image src={"/behindScenes.png"} alt={"/behindScenes.png"} fill />
            </div>
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
      </section>
    );
  }
)`
  background: #fff;
  padding: 80px 0;
  font-family: var(--font-exo);
  margin: auto;
  padding-top: 84px;

  @media (min-width: 992px) {
    padding: 96px 0;
    padding-top: 196px;
  }

  .container {
    // width: 100%;
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
        margin : 0 8px;
        // border : 1px solid #d4d4d4;

        @media (min-width: 1950px) {
        margin : unset;
            font-size: 25px;
        }
      }
    }
  }
`;