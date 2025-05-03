import styled from "styled-components";
import {
  // ArrowRightWhite,
  BlankOptionCircle,
  FillOptionCircle,
} from "@/app/_assets/icons";
import { sectionResponsivePadding } from "../new_mixins/mixins";

export const RewardsSection = styled(
  ({ className }: { className?: string }) => {
    return (
      <section className={className}>
        <div className="wrapper">
          <div className="container">
            <div className="left-block">
              <div className="head-container">
                <h3 className="head">Let’s Make It Rewarding</h3>
                <h3 className="subhead">
                  Take a minute and get <span className="red-text">extended time</span>{" "}
                  on first mentor session. Deal?
                </h3>
              </div>
              {/* <div className="email-container">
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="ayush@grappus.com"
                />
                <button className="email-submit-btn">
                  <ArrowRightWhite />
                </button>
              </div> */}
            </div>
            <div className="right-block">
              <div className="tracker">
                <div className="line" />
                <div className="dots">
                  <FillOptionCircle />
                  <FillOptionCircle />
                  <BlankOptionCircle />
                  <BlankOptionCircle />
                  <BlankOptionCircle />
                </div>
              </div>
              <div className="content">
                <p className="question">
                  What do you feel is missing in your learning experience?
                </p>
                <div className="options">
                  <div className="option-element">
                    <FillOptionCircle />
                    <p className="option">Clear explanations of concepts.</p>
                  </div>
                  <div className="option-element">
                    <BlankOptionCircle />
                    <p className="option">A structured study plan.</p>
                  </div>
                  <div className="option-element">
                    <BlankOptionCircle />
                    <p className="option"> More practice problems and tests.</p>
                  </div>
                  <div className="option-element">
                    <BlankOptionCircle />
                    <p className="option">Motivation and guidance.</p>
                  </div>
                </div>
              </div>
              <div className="cta-container">
                <button className="primary-cta">Next</button>
              </div>
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
  padding: 40px 0;
  margin: auto;
  background: #fff;

  @media (min-width: 992px) {
    height: 100vh;
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${sectionResponsivePadding()};
  }

  .wrapper {
    background: #000;
    position: relative;
    width: 100%;
    font-family: var(--font-exo);
    max-width: 1500px;
    margin: auto;
    padding-bottom: 0;
    border-radius: none;
    padding: 68px 0px 84px 0px;

    @media (min-width: 992px) {
      border-radius: 30.016px;
      padding: 45px 0px 45px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-height: 1100px;
    }

    h2,
    p,
    h3 {
      margin: 0;
    }

    .red-text {
      color: #ff2626;
    }

    .container {
      background: #000;
      display: flex;
      flex-direction: column;
      gap: 58px;

      @media (min-width: 992px) {
        padding: 0;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        gap: unset;
      }

      .left-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 55px;
        padding-right: 24px;

        @media (max-width: 992px) {
          ${sectionResponsivePadding()};
        }

        @media (min-width: 992px) {
          padding-right: unset;
          width: 50%;
          padding: 58px 0 32px 0;
          gap: unset;
        }

        .head-container {
          display: flex;
          flex-direction: column;
          gap: 10px;

          @media (min-width: 992px) {
            padding-top: 50px;
            gap: 20px;
          }

          .head {
            text-align: center;
            color: #fff;
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            @media (min-width: 992px) {
              font-size: 36px;
              text-align: unset;
            }
          }

          .subhead {
            font-family: var(--font-fustat);
            color: #fff;
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;

            @media (min-width: 992px) {
              font-size: 20px;
              text-align: unset;
              max-width : 39ch;
            }
          }
        }

        .email-container {
          display: flex;
          gap: 5.84px;
          input {
            color: #000;
            display: flex;
            width: 425.229px;
            padding: 10.769px 16.153px;
            justify-content: center;
            align-items: center;
            gap: 6.73px;
            border-radius: 8.076px;
            border: 0.673px solid #fff;
            background: #fff;
          }

          button {
            display: flex;
            width: 47.526px;
            height: 40.855px;
            padding: 10.769px 16.153px;
            justify-content: center;
            align-items: center;
            gap: 6.73px;
            flex-shrink: 0;
            border-radius: 8.076px;
            border: 1.668px solid #fff;

            svg {
              transform: scale(1.75);
            }
          }
        }
      }

      .right-block {
        border-radius: 19.506px 0px 0px 19.506px;
        padding: 36px 34px 30px 34px;
        background: #fff;
        display: flex;
        flex-direction: column;
        gap: 25px;

        @media (max-width: 992px) {
          margin-left: 16px;
        }

        @media (min-width: 992px) {
          padding: 58px 77px 32px 100px;
          gap: 28px;
          width: 50%;
        }

        .tracker {
          width: 90%;
          height: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .line {
            height: 1px;
            width: 100%;
            background: #c7c7c7;
          }

          .dots {
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 22px;

          @media (min-width: 992px) {
            gap: 43px;
          }

          .question {
            color: #000;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
          }

          .options {
            display: flex;
            flex-direction: column;
            gap: 31px;

            @media (min-width: 992px) {
              gap: 51px;
            }

            .option-element {
              display: flex;
              gap: 12px;
              align-items: center;

              @media (min-width: 992px) {
                gap: 6.7px;
              }

              .option {
                color: #000;
                font-size: 15px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;

                @media (min-width: 992px) {
                  font-size: 16px;
                }
              }
            }
          }
        }

        .cta-container {
          .primary-cta {
            width: 100%;
            display: flex;
            padding: 12px 8.378px;
            gap: 3.491px;
            justify-content: center;
            align-items: center;
            gap: 6.73px;
            flex-shrink: 0;
            border-radius: 9px;
            border: 0.349px solid #ff2626;
            background: #ff2626;
            margin-top : 10px;
            color: #fff;
            font-family: var(--font-exo);
            font-size: 18px;

            @media (min-width: 992px) {
              border-radius: 8.076px;
              border: 0.673px solid #ff2626;
              padding: 10.769px 16.153px;
              gap: 6.73px;
            }
          }
        }
      }
    }
  }
`;
