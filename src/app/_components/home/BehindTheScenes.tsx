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
    const animationInitialized = useRef(false);

    const animationInit = () => {
      if (!container.current || !window || animationInitialized.current) return;
      
      // Disable animation on mobile
      if (isMobile) return;

      animationInitialized.current = true;

      gsapContext.add(() => {
        // Kill any existing timeline
        if (timelineRef.current) {
          timelineRef.current.kill();
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: isMobile ? "top 60%" : "top 60%",
            end: isMobile ? "top 20%" : "top 20%",
            scrub: isMobile ? 0.5 : 1, // Smoother scrub on mobile
            markers: false,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        });

        // Store timeline reference
        timelineRef.current = tl;

        // Animate each span individually for better scroll control
        const spans = document.querySelectorAll('.tc-1 > span');
        spans.forEach((span, index) => {
          tl.to(span, {
            autoAlpha: 1,
            duration: 1,
            ease: "none",
          }, index * 0.05); // Stagger the start time
        });
      });
    };

    const intersectionObserver = useRef<IntersectionObserver | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useIsomorphicLayoutEffect(() => {
      // Clean up previous animation
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      
      // Reset animation flag when width changes
      animationInitialized.current = false;

      intersectionObserver.current = new IntersectionObserver(
        () => {
          animationInit();
        },
        {
          root: null,
          rootMargin: "50px",
          threshold: 0,
        }
      );

      if (container.current) {
        intersectionObserver.current.observe(container.current);
      }

      return () => {
        if (intersectionObserver.current) {
          intersectionObserver.current.disconnect();
        }
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
        // Reset animation flag on cleanup
        animationInitialized.current = false;
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
                <span> The </span>
                <span> journey </span>
                <span>isn&apos;t </span>
                <span>just </span>
                <span>about </span>
                <span>books. </span>
                <span>It&apos;s </span>
                <span>about </span>
                <span>clarity, </span>
                <span>consistency, </span>
                <span>and </span>
                <span>finding </span>
                <span>what </span>
                <span>truly </span>
                <span>moves </span>
                <span>you </span>
                <span>forward. </span>
                <br />
                <br /> <span>Beyond </span>
                <span>timetables </span>
                <span>and </span>
                <span>textbooks, </span>
 <span>this </span>
                <span>is </span>
                <span>where </span>
                <span>you </span>
                <span>discover </span>
                <span>the </span>
                <span>direction </span>
                <span>that </span>
                <span>makes </span>
                <span>a </span>
                <span>difference.</span>
                
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
        font-family: var(--font-exo);
        color: #000;
        font-size:25.5px;
        font-style: normal;
        font-weight: 500;
        line-height: 142.05%; /* 22.728px */
        margin : 0 8px;
        // border : 1px solid #d4d4d4;

        span {
          opacity: 0.2; /* Initial state to prevent flashing */
          visibility: visible; /* Ensure visibility is set for autoAlpha */
          will-change: opacity, visibility; /* Optimize for autoAlpha animations */
          
          @media (max-width: 991px) {
            opacity: 1; /* Full opacity on mobile since animation is disabled */
          }
        }

         @media (min-width: 992px) {
       font-size:28.5px;
        }

        @media (min-width: 1950px) {
        margin : unset;
            font-size: 25px;
        }
      }
    }
  }
`;