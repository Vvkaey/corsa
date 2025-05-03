import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";

export const TimerSection = styled(({ className }: { className?: string }) => {
  const [displayTime, setDisplayTime] = useState({
    seconds: 0,
    centiseconds: 0,
  });
  const [running, setRunning] = useState(false);
  const [reward, setReward] = useState(false);

  const { width } = useWindowSize();

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

      // Update only if values change
      if (
        seconds !== timeValuesRef.current.seconds ||
        centiseconds !== timeValuesRef.current.centiseconds
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

  const formatTime = useCallback(() => {
    return `${String(displayTime.seconds).padStart(2, "0")}:${String(
      displayTime.centiseconds
    ).padStart(2, "0")}`;
  }, [displayTime]);

  const handleStart = () => {
    if (!running) {
      // Don't reset the elapsed time, just start from current time
      timerRef.current.startTime = null;
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);

    // Store the total elapsed time when stopping
    if (timerRef.current.startTime) {
      const currentTime = performance.now();
      timerRef.current.elapsedBeforeStop +=
        currentTime - timerRef.current.startTime;
    }

    // Check for reward condition
    if (displayTime.seconds > 5 && displayTime.centiseconds > 0) {
      setReward(true);
    } else {
      setReward(false);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setReward(false);
    timerRef.current.startTime = null;
    timerRef.current.elapsedBeforeStop = 0; // Reset the elapsed time
    setDisplayTime({ seconds: 0, centiseconds: 0 });
  };

  return (
    <section className={className}>
      <div className="container">
        <div className="head-container">
          <h2 className="title">
            Flex your reflex here.
            {width && width < 992 ? <br /> : null} (No scorecards)
          </h2>
          <p className="subtitle">You Can Chill Without a Cutoff</p>
        </div>
        <div className="timer-container">
          <p className="tag">
            Can you stop the timer on exactly{" "}
            <span className="red-text">5.50</span> seconds?
          </p>
          <div className="timer">
            <p className="time">{formatTime()}</p>
            <div className="units">
              <p className="seconds">Seconds</p>
              <p className="centiseconds">Centiseconds</p>
            </div>
          </div>
          <div className="reward-container">
            {reward && (
              <p className="reward-message">
                Congratulations! You&apos;ve earned a mentor session!
              </p>
            )}
          </div>
        </div>
        <div className="cta-container">
          {!running ? (
            <button className="primary-cta" onClick={handleStart}>
              Start
            </button>
          ) : (
            <button className="primary-cta" onClick={handleStop}>
              Stop
            </button>
          )}
          {!running && displayTime.seconds > 0 && (
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          )}
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
          width: 70%;
          justify-content: center;

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

        @media (min-width: 992px) {
          min-height: 60px;
        }
      }

      .reward-message {
        color: #ff2626;
        font-weight: 600;
        font-size: 18px;
        width: 75%;
        text-align: center;

        @media (min-width: 992px) {
          font-size: 24px;
        }
      }
    }

    .cta-container {
      padding-top: 20px;
      display: flex;
      gap: 15px;

      @media (min-width: 992px) {
        padding-top: 20px;
      }
      .primary-cta,
      .reset-btn {
        min-width: 120px;
        border-radius: 9.013px;
        border : none;
        padding: 16px 28px;
        font-size: 13.292px;
        font-style: normal;
        line-height: normal;
        cursor: pointer;
        min-width: 185px;

        @media (min-width: 992px) {
          font-size: 18.14px;
           min-width: 313px;
        }

        @media (min-width: 1800px) {
          font-size: 25.8px;
        }
      }

      .primary-cta {
        background: #000;
        color: #fff;
      }

      .reset-btn {
        background: #f5f5f5;
        color: #000;
      }
    }
  }
`;
