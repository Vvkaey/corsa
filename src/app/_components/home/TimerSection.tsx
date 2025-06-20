"use client";

import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useGsapContext } from "@/app/_utils/hooks/useGsapContext";
import { useIsomorphicLayoutEffect } from "@/app/_utils/hooks/useIsomorphicLayoutEffect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { RedSpan } from "../dashboard/styled";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const TimerSection = styled(({ className }: { className?: string }) => {
  const [displayTime, setDisplayTime] = useState({
    seconds: 0,
    centiseconds: 0,
  });
  const [running, setRunning] = useState(false);
  const [reward, setReward] = useState(false);
  const [perfectReward, setPerfectReward] = useState(false);

  const { width } = useWindowSize();
  const gsapContext = useGsapContext();

  // Refs for animations
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const timerDisplayRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLParagraphElement>(null);
  const unitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rewardRef = useRef<HTMLDivElement>(null);
  const perfectRewardRef = useRef<HTMLDivElement>(null);

  // Use refs to track timing without causing re-renders
  const timerRef = useRef<{
    startTime: number | null;
    rafId: number | null;
    elapsedBeforeStop: number;
  }>({
    startTime: null,
    rafId: null,
    elapsedBeforeStop: 0, // Track total elapsed time before stopping
  });

  // Track actual time values separately from display values
  const timeValuesRef = useRef({ seconds: 0, centiseconds: 0 });

  // Section entry animations
  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !headingRef.current || !timerDisplayRef.current)
      return;

    gsapContext.add(() => {
      // Set initial states
      gsap.set(headingRef.current, {
        autoAlpha: 0,
        y: 30,
      });

      gsap.set(tagRef.current, {
        autoAlpha: 0,
        y: 25,
      });

      gsap.set(timerDisplayRef.current, {
        autoAlpha: 0,
        scale: 0.95,
      });


      // Create main timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Sequence the animations
      mainTl.to(headingRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      mainTl.to(
        tagRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        ">-0.3"
      ); // Slight overlap

      mainTl.to(
        timerDisplayRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        ">-0.2"
      );


      return () => {
        if (mainTl.scrollTrigger) {
          mainTl.scrollTrigger.kill();
        }
      };
    });
  }, [gsapContext, width]);

  useEffect(() => {
    const timer = timerRef.current;

    const updateTimer = () => {
      if (!timer.startTime) {
        timer.startTime = performance.now();
      }

      const currentTime = performance.now();
      const elapsedMs = currentTime - timer.startTime + timer.elapsedBeforeStop;

      // Calculate seconds and centiseconds
      const totalSeconds = elapsedMs / 1000;
      const seconds = Math.floor(totalSeconds);
      const centiseconds = Math.floor((totalSeconds % 1) * 100);

      // Skip state updates entirely while running - always use direct DOM updates
      if (running && timeRef.current) {
        // Format the time
        const formattedTime = `${String(seconds).padStart(2, "0")}:${String(
          centiseconds
        ).padStart(2, "0")}`;

        // Set text directly without causing React updates
        if (timeRef.current.textContent !== formattedTime) {
          timeRef.current.textContent = formattedTime;
        }

        // Store current values for comparison on next tick
        timeValuesRef.current = { seconds, centiseconds };
      }
      // Only update React state when not running (e.g., when paused)
      else if (
        !running &&
        (seconds !== timeValuesRef.current.seconds ||
          centiseconds !== timeValuesRef.current.centiseconds)
      ) {
        timeValuesRef.current = { seconds, centiseconds };
        setDisplayTime({ seconds, centiseconds });
      }

      if (running) {
        timer.rafId = requestAnimationFrame(updateTimer);
      }
    };

    if (running) {
      timer.rafId = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (timer.rafId) {
        cancelAnimationFrame(timer.rafId);
      }
    };
  }, [running]);

  // Animate reward message
  useEffect(() => {
    if (!rewardRef.current || !perfectRewardRef.current) return;

    const ctx = gsap.context(() => {
      if (reward) {
        gsap.fromTo(
          rewardRef.current,
          {
            autoAlpha: 0,
            y: 15,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      } else {
        gsap.set(rewardRef.current, {
          autoAlpha: 0,
          y: 15,
        });
      }

      if (perfectReward) {
        gsap.fromTo(
          perfectRewardRef.current,
          {
            autoAlpha: 0,
            y: 15,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      } else {
        gsap.set(perfectRewardRef.current, {
          autoAlpha: 0,
          y: 15,
        });
      }
    });

    return () => ctx.revert();
  }, [reward, perfectReward]);

  // Animate button state changes
  useEffect(() => {
    // No animations for button state changes
  }, [running, displayTime.seconds]);

  const handleStart = () => {
    if (!running) {
      // Clear any existing reward messages immediately using GSAP context
      const ctx = gsap.context(() => {
        if (rewardRef.current) {
          gsap.set(rewardRef.current, {
            autoAlpha: 0,
            y: 15,
          });
        }
        if (perfectRewardRef.current) {
          gsap.set(perfectRewardRef.current, {
            autoAlpha: 0,
            y: 15,
          });
        }
      });

      // Clear states
      setReward(false);
      setPerfectReward(false);
      
      // Don't reset the elapsed time, just start from current time
      timerRef.current.startTime = null;
      setRunning(true);

      // Prevent any animations when starting the timer
      if (timeRef.current) {
        timeRef.current.style.transition = "none";
        void timeRef.current.offsetHeight;
      }

      return () => ctx.revert();
    }
  };

  // Handle stop button click
  const handleStop = () => {
    // First capture the current time before changing any state
    // so we can use direct DOM updates for the final time display
    let finalSeconds = 0;
    let finalCentiseconds = 0;

    if (timerRef.current.startTime) {
      const currentTime = performance.now();
      const totalElapsedMs =
        currentTime -
        timerRef.current.startTime +
        timerRef.current.elapsedBeforeStop;
      const totalSeconds = totalElapsedMs / 1000;
      finalSeconds = Math.floor(totalSeconds);
      finalCentiseconds = Math.floor((totalSeconds % 1) * 100);
    } else {
      // Use current values if startTime not set
      finalSeconds = timeValuesRef.current.seconds;
      finalCentiseconds = timeValuesRef.current.centiseconds;
    }

    // Now update the DOM directly before changing any React state
    if (timeRef.current) {
      const formattedTime = `${String(finalSeconds).padStart(2, "0")}:${String(
        finalCentiseconds
      ).padStart(2, "0")}`;
      timeRef.current.textContent = formattedTime;
    }

    // Now we can update states without risking flicker
    setRunning(false);

    // Store elapsed time
    if (timerRef.current.startTime) {
      const currentTime = performance.now();
      timerRef.current.elapsedBeforeStop +=
        currentTime - timerRef.current.startTime;
    }

    // Store final values in refs and state
    timeValuesRef.current = {
      seconds: finalSeconds,
      centiseconds: finalCentiseconds,
    };
    setDisplayTime({ seconds: finalSeconds, centiseconds: finalCentiseconds });

    // Check for reward condition - now show for anything above 5 seconds
    if (finalSeconds == 5 && finalCentiseconds == 50) {
      setPerfectReward(true);
      setReward(false);
    } else if (finalSeconds > 0 || finalCentiseconds > 0) {
      setReward(true);
      setPerfectReward(false);
    } else {
      setReward(false);
      setPerfectReward(false);
    }
  };

  // Handle reset button click
  const handleReset = () => {
    // Create a GSAP context for all animations
    const ctx = gsap.context(() => {
      // First update DOM directly
      if (timeRef.current) {
        timeRef.current.textContent = "00:00";
        timeRef.current.style.transition = "none";
        void timeRef.current.offsetHeight;
      }

      // Clear reward messages immediately using GSAP
      if (rewardRef.current) {
        gsap.set(rewardRef.current, {
          autoAlpha: 0,
          y: 15,
        });
      }
      if (perfectRewardRef.current) {
        gsap.set(perfectRewardRef.current, {
          autoAlpha: 0,
          y: 15,
        });
      }
    });

    // Then update state
    setRunning(false);
    setReward(false);
    setPerfectReward(false);
    timerRef.current.startTime = null;
    timerRef.current.elapsedBeforeStop = 0;
    timeValuesRef.current = { seconds: 0, centiseconds: 0 };
    setDisplayTime({ seconds: 0, centiseconds: 0 });

    return () => ctx.revert();
  };

  return (
    <section className={className} ref={sectionRef}>
      <div className="container">
        <div className="head-container" ref={headingRef}>
          <h2 className="title">
            Flex your reflex here.
            {width && width < 992 ? <br /> : null} (No scorecards)
          </h2>
          <p className="subtitle">You Can Chill Without a Cutoff</p>
        </div>
        <div className="timer-container">
          <p className="tag" ref={tagRef}>
            Can you stop the timer on exactly{" "}
            <span className="red-text">5.50</span> seconds?
          </p>
          <div className="timer" ref={timerDisplayRef}>
            {/* Apply a class to prevent animations while running */}
            <p className={`time ${running ? "running" : ""}`} ref={timeRef}>
              00:00
            </p>
            <div className="units" ref={unitsRef}>
              <p className="seconds">Seconds</p>
              <p className="centiseconds">Centiseconds</p>
            </div>
          </div>
          <div className="reward-container">
            <p
              className="reward-message"
              ref={rewardRef}
              style={{ opacity: 0 }}
            >
              <RedSpan>Almost</RedSpan> tapped greatness. But you&apos;re still
              cooler than inorganic chemistry. 🧪
            </p>
            <p
              className="reward-message"
              ref={perfectRewardRef}
              style={{ opacity: 0 }}
            >
              <RedSpan>AIR 1 </RedSpan>in Reflexology 🏆 Even Heisenberg
              couldn&apos;t predict that stop.
            </p>
          </div>
        </div>
        <div className="cta-wrapper">
          <div className="cta-container" ref={ctaRef}>
            {!running && displayTime.seconds === 0 && displayTime.centiseconds === 0 ? (
              <button className="primary-cta" onClick={handleStart}>
                Start
              </button>
            ) : running ? (
              <button className="primary-cta" onClick={handleStop}>
                Pause
              </button>
            ) : null}
            {!running &&
              ((displayTime.seconds > 0 && displayTime.centiseconds >= 0) ||
                (displayTime.seconds == 0 && displayTime.centiseconds > 0)) && (
                <button className="primary-cta" onClick={handleReset}>
                  Reset
                </button>
              )}
          </div>
        </div>
      </div>
    </section>
  );
})`
  width: 100%;
  font-family: var(--font-exo);
  padding: 44px 0;
  background: #fff;
  padding-bottom: 84px;

  @media (min-width: 992px) {
    padding-bottom: unset;
    padding: 100px 0 214px 0;
  }

  @media (min-width: 992px) {
    padding: 140px 0 235px 0;
  }

  .container {
    max-width: 1500px;
    display: flex;
    flex-direction: column;
    gap: 34px;
    margin: auto;
    align-items: center;

    @media (min-width: 992px) {
      gap: 48px;
    }

    @media (min-width: 1800px) {
      gap: 76px;
    }

    h2,
    p {
      margin: 0;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      gap: 18px;
      will-change: transform, opacity;

      @media (min-width: 992px) {
        gap: 6px;
      }

      @media (min-width: 1950px) {
        gap: 9px;
      }
      .title {
        color: #000c2d;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-align: center;

        @media (min-width: 992px) {
          font-size: 46px;
        }
        @media (min-width: 1800px) {
          font-size: 65px;
        }
      }

      .subtitle {
        font-family: var(--font-fustat);
        color: #000;
        text-align: center;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        @media (min-width: 992px) {
          font-size: 22px;
        }
        @media (min-width: 1800px) {
          font-size: 31.2px;
        }
      }
    }

    .red-text {
      color: #ff2626;
    }

    .timer-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .tag {
        font-family: var(--font-fustat);
        color: #000;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        width: 75%;
        text-align: center;
        will-change: transform, opacity;

        @media (min-width: 992px) {
          max-width: unset;
          width: unset;
          font-size: 25.542px;
        }
        @media (min-width: 1950px) {
          font-size: 36.31px;
        }
      }

      .timer {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        will-change: transform, opacity, scale;
        font-size: 81px;
        max-width: 5ch;

        @media (min-width: 992px) {
          font-size: 140px;
        }

        @media (min-width: 1950px) {
          font-size: 200.289px;
        }

        .time {
          color: #ff2626;
          font-size: 81px;
          text-align: center;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: capitalize;
          min-width: 5ch; /* Fix for layout shift */
          font-variant-numeric: tabular-nums; /* Use monospace numbers */
          font-family: var(--font-exo);
          padding-top: 16px;
          transform-origin: center center;
          will-change: transform, opacity, scale;
          backface-visibility: hidden; /* Reduce flickering */
          -webkit-font-smoothing: antialiased; /* Smoother text rendering */

          /* Add specific class to prevent any transitions/animations while running */
          &.running {
            transition: none !important;
            animation: none !important;
            transform: none !important; /* Force no transform while running */
          }

          @media (min-width: 992px) {
            padding: 0 20px;
            font-size: 140px;
          }

          @media (min-width: 1950px) {
            font-size: 200.289px;
          }
        }

        .units {
          display: flex;
          width: 100%;
          justify-content: center;
          transition: opacity 0.3s ease;

          @media (min-width: 992px) {
            width: 100%;
          }

          .seconds,
          .centiseconds {
            margin: auto;
            text-align: center;
            width: 100%;
            color: #000;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            @media (min-width: 992px) {
              font-size: 26px;
            }
            @media (min-width: 1800px) {
              font-size: 36.9px;
            }
          }
        }
      }

      .reward-container {
        min-height: 50px; /* Fixed height to prevent layout shift */
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        position: relative;
        min-width: 39ch;

        @media (min-width: 992px) {
          min-height: 60px;
          min-width: 45ch;
        }
      }

      .reward-message {
        position: absolute;
        color: #000;
        font-weight: 600;
        font-size: 16.5px;
        width: 75%;
        text-align: center;
        will-change: transform, opacity;
        top: 30px;

        @media (min-width: 992px) {
          font-size: 18px;
          font-size: 24px;
          width: 45ch;
        }
      }
    }

    .cta-wrapper {
      position: relative;
      overflow: hidden;

      .cta-container {
        padding-top: 20px;
        display: flex;
        gap: 15px;
        will-change: transform, opacity, scale;

        @media (min-width: 992px) {
          padding-top: 20px;
        }
        .primary-cta,
        .reset-btn {
          min-width: 120px;
          border-radius: 9.013px;
          font-family: var(--font-exo);
          border: none;
          padding: 11px 33px;
          color: #fff;
          font-size: 16px;
          font-style: normal;
          line-height: normal;
          cursor: pointer;
          min-width: 185px;
          transition: background-color 0.3s ease;

          &::after {
            content: "";
            position: absolute;
            top: calc(50% - 2.5px + 8px);
            left: calc(50% - 2.5px);
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.4);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%, -50%);
            transform-origin: 50% 50%;
          }


          @media (min-width: 992px) {
            line-height: normal;
            padding: 10px 40px;
            font-size: 16.5px;
            min-width: 313px;
            border-radius: 8.076px;
            padding: 10px 40px;
            font-size: 16.5px;
            gap: 6.73px;
          }

          @media (min-width: 1950px) {
            padding: 13px 58px;
            font-size: 23.521px;
          }
        }

        .primary-cta {
          background: #000;
          color: #fff;

          &:hover {
            background: #333;
          }
        }

        .reset-btn {
          background: #f5f5f5;
          color: #000;

          &:hover {
            background: #e5e5e5;
          }
        }
      }
    }
  }
`;
