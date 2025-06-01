import styled from "styled-components";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { useRef, useState, useEffect } from "react";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Card data for the carousel
const cardData = [
  {
    id: 1,
    description: "Mentoring here has been a rewarding experience. Helping others grow while building real connections. Being a mentor on this platform has been an incredibly rewarding experience.",
    name: "Riddhi Shah",
    handle: "IIT DELHI"
  },
  {
    id: 2,
    description: "The mentorship program exceeded my expectations. The guidance I received was invaluable in helping me navigate complex career decisions. I'm thankful for this opportunity.",
    name: "Ankit Verma",
    handle: "IIM BANGALORE"
  },
  {
    id: 3,
    description: "As a mentor, I've found the experience incredibly fulfilling. Seeing students progress and develop new skills is truly rewarding. The platform makes connection seamless.",
    name: "Priya Mehta",
    handle: "HARVARD UNIVERSITY"
  }
];

export const Card = styled(({ 
  className, 
  data, 
  isActive, 
  index,
  prevIndex 
}: { 
  className?: string; 
  data: typeof cardData[0]; 
  isActive: boolean;
  index: number;
  prevIndex: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const handleRef = useRef<HTMLParagraphElement>(null);
  
  // Set up animations when active state changes - matching desktop behavior
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (isActive) {
      // Show the card container immediately with full opacity
      gsap.set(cardRef.current, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        zIndex: 10
      });
      
      // Only animate if it's a card change, not initial load
      if (prevIndex !== -1 && prevIndex !== index) {
        // Immediately start fading in new content without delay
        gsap.fromTo([contentRef.current, nameRef.current, handleRef.current], 
          { opacity: 0, x: 20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1.2, 
            ease: "power2.out",
            stagger: 0.05
          }
        );
        
        // Animate quote mark with no delay
        if (quoteRef.current) {
          gsap.killTweensOf(quoteRef.current);
          gsap.fromTo(quoteRef.current,
            { scale: 0.85, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
              onComplete: () => {
                // Add subtle floating animation
                gsap.to(quoteRef.current, {
                  y: "-10px",
                  duration: 3,
                  repeat: -1,
                  yoyo: true,
                  ease: "power1.inOut"
                });
              }
            }
          );
        }
      } else {
        // Initial load animation
        gsap.fromTo([contentRef.current, nameRef.current, handleRef.current], 
          { opacity: 0, x: 30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            ease: "power2.out",
            stagger: 0.08
          }
        );
        
        if (quoteRef.current) {
          gsap.fromTo(quoteRef.current,
            { scale: 0.8, opacity: 0.7 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "elastic.out(1.2, 0.5)",
              onComplete: () => {
                gsap.to(quoteRef.current, {
                  y: "-10px",
                  duration: 3,
                  repeat: -1,
                  yoyo: true,
                  ease: "power1.inOut"
                });
              }
            }
          );
        }
      }
    } else if (prevIndex === index) {
      // Only fade out if this card was previously active
      gsap.to(cardRef.current, {
        zIndex: 5 - index,
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out"
      });
      
      // Fade out content quickly
      gsap.to([contentRef.current, nameRef.current, handleRef.current], {
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.02
      });
      
      // Stop quote animations
      if (quoteRef.current) {
        gsap.killTweensOf(quoteRef.current);
        gsap.to(quoteRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isActive, index, prevIndex]);

  return (
    <div className={`${className} ${isActive ? 'active' : ''}`} ref={cardRef}>
      <div className="quotes" ref={quoteRef}>{'"'}</div>
      <p className="description" ref={contentRef}>
        {data.description}
      </p>
      <div className="signature">
        {/* <div className="circle" /> */}
        <p className="name" ref={nameRef}>{data.name}</p>
        <p className="handle" ref={handleRef}>{data.handle}</p>
      </div>
    </div>
  );
})`
  position: absolute;
  top: 0;
  left: 0;
  background: #ffffff;
  border-radius: 9.2px;
  padding: 55px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 436px;
  flex-shrink: 0;
  font-family: var(--font-fustat);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  will-change: transform, opacity;
  opacity: 1;
  
  &.active {
    z-index: 10;
  }

  @media (min-width: 992px) {
    width: 179px;
    height: 241px;
  }

  .circle {
    position: absolute;
    left: -40px;
    margin-right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #d9d9d9;

    @media (min-width: 992px) {
      width: 31.43px;
      height: 31.43px;
    }
  }

  .quotes {
    position: relative;
    top: 5%;
    color: #a88146;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 136px;
    font-style: normal;
    font-weight: 600;
    line-height: 40%;
    will-change: transform, opacity;
    transform-origin: center;
    
    @media (min-width: 992px) {
      font-size: 90px;
    }
  }

  .description {
    margin: 0;
    color: #373737;
    font-size: 17.138px;
    font-style: normal;
    font-weight: 600;
    line-height: 141.979%;
    will-change: opacity, transform;

    @media (min-width: 992px) {
      position: relative;
      bottom: 27px;
      font-size: 12px;
    }
  }

  .signature {
    position: absolute;
    right: 30px;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding-top: 10px;
    bottom: 45px;

    .name {
      margin: 0;
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%;
      will-change: opacity, transform;

      @media (min-width: 992px) {
        font-size: 8px;
      }
    }

    .handle {
      margin: 0;
      color: #5f5f5f;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%;
      will-change: opacity, transform;

      @media (min-width: 992px) {
        font-size: 6px;
      }
    }
  }
`;

const Signature = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;


const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FullName = styled.p`
  color: #000;
  font-family: var(--font-fustat);
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%;
  margin: 0;

  @media (min-width: 992px) {
    font-size: 16px;
  }
  @media (min-width: 1950px) {
    font-size: 22px;
  }
`;

const Institute = styled.p`
  color: #5f5f5f;
  font-family: var(--font-fustat);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%;
  margin: 0;

  @media (min-width: 992px) {
    font-size: 14px;
  }
  @media (min-width: 1950px) {
    font-size: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 30px 0 120px;

  @media (min-width: 992px) {
    margin: 0 0 0 70px;
    gap: 70px;
  }
  @media (min-width: 1950px) {
    margin: 0 30px 0 120px;
    gap: 100px;
  }
`;

const Text = styled.div`
  position: relative;
`;

const P = styled.p`
  color: #373737;
  font-family: var(--font-fustat);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%;
  max-width: 40ch;
  margin: 0;

  @media (min-width: 992px) {
    font-size: 17px;
  }

  @media (min-width: 1950px) {
    font-size: 24px;
  }
`;

const XLCardContainer = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  padding: 84px 84px 60px 84px;
  border-radius: 14px;
  background: #ffffff;
  position: relative;
  will-change: transform, opacity;
  transform-origin: center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 992px) {
    display: none;
  }

  @media (min-width: 992px) {
    padding: 59px 73px 46px 55px;
  }

  @media (min-width: 1950px) {
    padding: 84px 84px 60px 84px;
  }
`;

const Quote = styled.div`
  top: -65px;
  left: -130px;
  position: absolute;
  color: #a88146;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 228px;
  font-style: normal;
  font-weight: 600;
  line-height: 119.982%;
  will-change: transform, opacity;
  transform-origin: center;

  @media (min-width: 992px) {
    font-size: 160px;
    top: -45px;
    left: -90px;
  }

  @media (min-width: 1950px) {
    font-size: 228px;
    top: -65px;
    left: -130px;
  }
`;

const XLCard = ({ activeIndex }: { activeIndex: number }) => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const currentData = cardData[activeIndex];
  const [prevIndex, setPrevIndex] = useState(activeIndex);
  
  // Handle data changes with smooth transitions
  useEffect(() => {
    if (activeIndex !== prevIndex && cardRef.current) {
      // Transition to new content
      const contentEl = cardRef.current.querySelector(".xl-content");
      const nameEl = cardRef.current.querySelector(".xl-name");
      const instituteEl = cardRef.current.querySelector(".xl-institute");
      
      // First fade out current content
      gsap.to([contentEl, nameEl, instituteEl], {
        opacity: 0,
        x: -30,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          // Update the index after fade out
          setPrevIndex(activeIndex);
          
          // Then fade in new content
          gsap.fromTo([contentEl, nameEl, instituteEl], 
            { opacity: 0, x: 30 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.5, 
              ease: "power2.out",
              stagger: 0.05
            }
          );
          
          // Also animate the quote mark
          if (quoteRef.current) {
            gsap.fromTo(quoteRef.current,
              { scale: 0.8, opacity: 0.7 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "elastic.out(1.2, 0.5)",
                onComplete: () => {
                  // Add subtle floating animation
                  gsap.to(quoteRef.current, {
                    y: "-10px",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                  });
                }
              }
            );
          }
        }
      });
    }
  }, [activeIndex, prevIndex]);
  
  // Initial animation
  useEffect(() => {
    if (quoteRef.current && cardRef.current) {
      // Create bubble animation for quote
      gsap.fromTo(quoteRef.current, 
        { 
          scale: 0.7, 
          opacity: 0.7 
        }, 
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1.2, 0.5)",
          onComplete: () => {
            // Add subtle hover animation after initial animation
            gsap.to(quoteRef.current, {
              y: "-10px",
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut"
            });
          }
        }
      );
      
      // Add entrance animation for the card
      gsap.fromTo(cardRef.current,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, []);

  return (
    <XLCardContainer ref={cardRef}>
      <Content>
        <Text>
          <P className="xl-content">
            {currentData.description}
          </P>
          <Quote ref={quoteRef}>{'"'}</Quote>
        </Text>
        <Signature>
          {/* <DP /> */}
          <TextGroup>
            <FullName className="xl-name">{currentData.name}</FullName>
            <Institute className="xl-institute">{currentData.handle}</Institute>
          </TextGroup>
        </Signature>
      </Content>
    </XLCardContainer>
  );
};

// Carousel container for mobile view
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 436px;
  overflow: visible;
  margin-bottom: 30px;
  
  @media (min-width: 992px) {
    height: 241px;
  }
`;

// Dot indicators for mobile
const DotContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  &.active {
    background: #ff2626;
    width: 24px;
    border-radius: 4px;
  }
  
  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const CardRows = styled(({ className }: { className?: string }) => {
  const sectionRootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const xlCardRef = useRef<HTMLDivElement>(null);
  const gsapContext = useGsapContext();
  const { width } = useWindowSize();
  
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [prevCardIndex, setPrevCardIndex] = useState(-1);
  
  // Update previous index when active index changes
  useEffect(() => {
    if (activeCardIndex !== prevCardIndex) {
      setPrevCardIndex(activeCardIndex);
    }
  }, [activeCardIndex, prevCardIndex]);
  
  // Auto rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cardData.length);
    }, 5000); // Change card every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRootRef.current || !titleRef.current || !subTitleRef.current || !cardsContainerRef.current) return;

    gsapContext.add(() => {
      // Set initial states
      gsap.set([titleRef.current, subTitleRef.current], {
        autoAlpha: 0,
        y: 50,
      });
      
      gsap.set(cardsContainerRef.current, {
        autoAlpha: 0,
        y: 70,
      });
      
      if (xlCardRef.current) {
        gsap.set(xlCardRef.current, {
          autoAlpha: 0,
          x: 50,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRootRef.current,
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
      
      // Animate cards container
      .to(cardsContainerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.2")
      
      // Animate XL card on desktop
      if (xlCardRef.current) {
        tl.to(xlCardRef.current, {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
        }, "-=0.4");
      }
      
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      };
    });

  }, [width, gsapContext]);

  return (
    <section className={className} ref={sectionRootRef}>
      <div className="container">
        <div className="head-container">
          <h2 className="title" ref={titleRef}>
            High Fives
          </h2>
          <p className="subtitle" ref={subTitleRef}>
            What <span className="red-text">keeps us going.</span>
          </p>
        </div>
        
        <div ref={xlCardRef}>
          <XLCard activeIndex={activeCardIndex} />
        </div>
        
        <div className="cards-container" ref={cardsContainerRef}>
          <CarouselContainer>
            {cardData.map((card, index) => (
              <Card 
                key={card.id} 
                data={card} 
                isActive={index === activeCardIndex} 
                index={index}
                prevIndex={prevCardIndex}
              />
            ))}
          </CarouselContainer>
          
          <DotContainer>
            {cardData.map((card, index) => (
              <Dot 
                key={card.id} 
                className={index === activeCardIndex ? 'active' : ''}
                onClick={() => setActiveCardIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </DotContainer>
        </div>
      </div>
    </section>
  );
})`
  background: #000;
  width: 100%;
  position: relative;
  font-family: var(--font-exo);
  overflow: hidden;
  padding: 72px 0 102px 0;

  @media (min-width: 992px) {
    padding: 200px 0;
  }

  .container {
    background: #000;
    display: flex;
    margin: auto;
    flex-direction: column;
    gap: 66px;
    ${sectionResponsivePadding()};
    ${maxWidthContainer};

    @media (min-width: 992px) {
      flex-direction: row;
      gap: unset;
      justify-content: space-between;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: #000;
      width: 100%;
      gap: 12px;
      will-change: transform, opacity;
      
      @media (min-width: 992px) {
        width: 36%;
        align-items: flex-start;
        gap: 14px;
      }

      h2.title {
        margin: 0;
        color: #fff;
        font-size: 28px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;

        @media (min-width: 992px) {
          font-size: 46px;
        }

        @media (min-width: 1950px) {
          font-size: 65px;
        }
      }

      p.subtitle {
        font-family: var(--font-fustat);
        margin: 0;
        color: #fff;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%;

        @media (min-width: 992px) {
          font-size: 20px;
        }

        @media (min-width: 1950px) {
          font-size: 28px;
        }
      }

      .red-text {
        color: #ff2626;
      }
    }

    .cards-container {
      background: #000;
      display: flex;
      flex-direction: column;
      gap: 17.48px;
      width: 100%;
      will-change: transform, opacity;
      
      @media (min-width: 992px) {
        display: none;
      }
    }
  }
`;