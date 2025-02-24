import styled from "styled-components";

export const TimerSection = styled(({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="container">
        <div className="head-container">
          <h2 className="title">Reflexes Pay Off! (10% off on membership)</h2>
          <p className="subtitle">
            Time it just right, and we&apos;ll share the code!
          </p>
        </div>
        <div className="timer-container">
          <p className="tag">
            Can you stop the timer on exactly{" "}
            <span className="red-text">5.50</span> seconds?
          </p>
          <div className="timer">
            <p className="time">00 : 00</p>

            <div className="units">
              <p className="seconds">Seconds</p>
              <p className="centiseconds">Centiseconds</p>
            </div>
          </div>
        </div>
        <div className="cta-container">
          <button className="primary-cta">Start</button>
        </div>
      </div>
    </section>
  );
})`
  width: 100%;
  font-family: var(--font-geist-sans);
  padding: 44px 0;
  background : #fff;
  padding-bottom : 84px;

   @media (min-width: 992px) {
      padding: 100px 0;
       padding-bottom : 200px;
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

    h2,
    p {
      margin: 0;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      gap: 18px;

      @media (min-width: 992px) {
        gap: unset;
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
      }

      .subtitle {
        color: #000;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        @media (min-width: 992px) {
          font-size: 22px;
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
        color: #000;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        max-width: 24ch;
        @media (min-width: 992px) {
          max-width: unset;
          font-size: 25.542px;
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

          @media (min-width: 992px) {
            padding: 0 20px;
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
          }
        }
      }
    }

    .cta-container {
      padding-top: 79px;

      @media (min-width: 992px) {
        padding-top: 62px;
      }
      .primary-cta {
        min-width: 220px;
        border-radius: 9.013px;
        border: 1.699px solid #fae3ca;
        background: #000;
        padding: 12px;
        color: #fff;
        font-size: 17.67px;
        font-style: normal;
        line-height: normal;

        @media (min-width: 992px) {
          font-size: 18.14px;
        }
      }
    }
  }
`;
