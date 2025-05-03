import styled from "styled-components";
import {
  maxWidthContainer,
  responsivePadding,
} from "../new_mixins/mixins";

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
    return (
      <section className={className}>
        <div className="container">
          <div className="head-container">
            <h2 className="title">Just Powerful Insights, Weekly.</h2>
            <p className="subtitle">
              Get deep-dive analysis and proven frameworks straight from expert
              mentors.
            </p>
          </div>
          <div className="traits-container">
            <div className="col">
              {insights?.colA &&
                insights?.colA?.map((item, idx) => {
                  return (
                    <div className="col-item" key={idx}>
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
            <div className="col">
              {insights?.colB &&
                insights?.colB?.map((item, idx) => {
                  return (
                    <div className="col-item" key={idx}>
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
      max-width: unset;
        flex-direction: row;
        padding: unset;
        justify-content: center;
      }

      &::before {
        content: "";
        position: absolute;
        width: 80%;
        top: 0;
        left: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          #c2c2c2 2.5%,
          #000 58.5%,
          #c2c2c2 95.5%
        );
        display: none;

        @media (min-width: 992px) {
          display: unset;
          margin: auto;
          left: 10%;
        }
      }

      &::after {
        content: "";
        position: absolute;
        width: 80%;
        bottom: 0;
        left: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          #c2c2c2 2.5%,
          #000 58.5%,
          #c2c2c2 95.5%
        );
        display: none;

        @media (min-width: 992px) {
          display: unset;
          margin: auto;
           left: 10%;
        }
      }

      .col {
        width: 100%;
        display: flex;
        flex-direction: column;
        @media (min-width: 992px) {
          padding: 51px 0;
          width: 33.33%;
          gap: 99px;
        }

        .col-item {
          position: relative;
          display: flex;
          gap: 12.5px;
          align-items: flex-start;
          padding: 23px 0;

          @media (min-width: 992px) {
            padding: unset;
            gap: 13px;
          }

          .icon-container {
            position: relative;
            top: 0;

            @media (min-width: 992px) {
              top: 4px;
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
