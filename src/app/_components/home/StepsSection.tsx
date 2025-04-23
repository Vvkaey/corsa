import styled from "styled-components";
import Image from "next/image";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import TitleSubtitle from "./TitleSubtitle";

interface FlowColAProps {
  img: string;
  title?: string;
  width?: number;
  height?: number;
  top?: string;
  right?: string;
  transform?: string;
}

interface FlowColBProps {
  img: string;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

interface FlowColCProps {
  img: string;
}

interface FlowProps {
  colA: FlowColAProps;
  colB: FlowColBProps;
  colC: FlowColCProps;
}

export const StepsSection = styled(
  ({
    className,
    flowItems,
  }: {
    className?: string;
    flowItems?: FlowProps[];
  }) => {
    return (
      <section className={className}>
        <div className="steps-container">
          <TitleSubtitle
            title={`"We've got your back, 
Let's `}
            redspan={`Make it happen."`}
            subtitle={`"No fluff. No big promises. Just real conversations 
with mentors who get things done. Here's how we help you step up."`}
          />
          <div className="steps">
            {flowItems?.map((item, idx) => (
              <div className="step" key={idx}>
                <div className="text-container">
                  <div className="text-a">
                    <div className="icon-container">
                      {/* <Image src={item?.colB?.img} alt={item?.colB?.img} fill /> */}
                    </div>
                  </div>
                  <div className="text-b">
                    <h2 className="title">{item?.colB?.title}</h2>
                    <p className="description">{item?.colB?.subtitle}</p>
                  </div>
                </div>
                <div className="media-container">
                  <div className="img-container">
                    {" "}
                    <Image src={item?.colC?.img} alt={item?.colC?.img} fill />
                  </div>
                </div>
                <p className="mbl-description">{item?.colB?.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
)`
  position: relative;
  font-family: var(--font-exo);
  padding: 70px 0 0 0;
  margin: auto;
  background: #fff;

  @media (min-width: 992px) {
    width: 100%;
  }

  .steps-container {
    border-radius: 18px 18px 0 0;
    background: #000;
    width: 100%;
    margin: auto;
    padding: 73.5px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 22px;

    @media (min-width: 992px) {
      border-radius: 20.987px 20.987px 0 0;
      padding: 150px 0 152px 0;
      gap: 120px;
    }
    .steps {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      ${maxWidthContainer};
      ${sectionResponsivePadding()};
      gap: 20px;

      @media (min-width: 992px) {
        gap: unset;
      }

      .step {
        position: relative;
        display: flex;
        padding: 39.5px 0;
        align-items: center;
        flex-direction: column;
        gap: 13px;

        @media (min-width: 992px) {
          flex-direction: row;
          padding: 52.5px 0;
          min-height: calc(512px + (2 * 52.5px));
          gap: unset;
          justify-content: space-between;
        }

        &:nth-child(even) {
          @media (min-width: 992px) {
            flex-direction: row-reverse;
          }
        }

        &:nth-child(1) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "🚀";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);
                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "🚀";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(2) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "⏳";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);

                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "⏳";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(3) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "🛸";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);

                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "🛸";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        &:nth-child(4) {
          .text-a {
            .icon-container {
              position: relative;
              &::before {
                @media (min-width: 992px) {
                  position: relative;
                  content: "☕";
                  top: -20%;
                  right: 0;
                  font-family: var(--font-exo);

                  text-align: center;
                  font-size: 90.909px;
                  font-style: normal;
                  font-weight: 600;
                  line-height: 119.982%; /* 109.075px */
                  letter-spacing: 1.818px;
                  text-transform: uppercase;
                }
              }
            }
          }
          .title {
            &::before {
              position: relative;
              content: "☕";
              top: 20%;
              right: 8px;
              font-family: var(--font-exo);
              font-size: 23.893px;
              font-style: normal;
              font-weight: 600;
              line-height: 119.982%; /* 28.667px */

              @media (min-width: 992px) {
                position: absolute;
                top: 14%;
                left: -10px;
                content: "";
                height: 80%;
                width: 2px;
                background: #ff2626;
                border-radius: 25px;
              }
            }
          }
        }

        .text-container {
          position: relative;
          width: 100%;
          display: flex;
          gap: 8px;
          justify-content: flex-start;

          @media (min-width: 992px) {
            justify-content: center;
            width: 50%;
            flex-direction: column;
            gap: 19px;
            max-width: 400px;
          }

          @media (min-width: 1592px) {
            max-width: 700px;
          }

          .text-a {
            .icon-container {
              position: relative;
              width: 80px;
              height: 83px;
              top: 7px;
              display: none;
              @media (min-width: 992px) {
                display: block;
              }
            }
          }

          .text-b {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            color: #fff;
            gap: 8px;
            width: 90%;
            flex-shrink: 0;
            margin: 0 auto;

            @media (min-width: 992px) {
              width: unset;
              flex-direction: column;
              justify-content: unset;
              align-items: unset;
              gap: 40px;
            }

            .title {
              position: relative;
              margin: 0;
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-transform: capitalize;
              text-align: center;
               max-width: 18ch;

              @media (min-width: 992px) {
                text-align: left;
                font-size: 36px;
                max-width: 16ch;
              }
            }

            .description {
              font-family: var(--font-fustat);
              margin: 0;
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 141.979%; /* 25.556px */
              display: none;
              @media (min-width: 992px) {
                display: unset;
                max-width: 70%;
                font-size: 20px;
              }
            }
          }
        }

        .media-container {
          display: flex;
          width: 100%;
          height: 258px;
          border-radius: 8px;
          position: relative;
          background: #fff;
          justify-content: center;
          align-items: center;
          overflow: hidden;

          @media (min-width: 992px) {
            border-radius: 25px;
            width: calc(639px + 58px);
            height: calc(512px + 62px);
            justify-self: flex-end;
          }

          .img-container {
            background: #fff;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
            position: relative;
            overflow: hidden;

            @media (min-width: 992px) {
              max-width: 639px;
              height: 100%;
              max-height: 512px;
            }

            img {
              position: absolute;
              object-fit: contain;
              width: 100%;
              height: auto;
            }
          }
        }

        .mbl-description {
          font-family: var(--font-fustat);
          margin: 0;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          color: #d4d4d4;
          text-align: center;
          line-height: 141.979%; /* 25.556px */
          max-width: 85%;
          @media (min-width: 992px) {
            display: none;
          }
        }
      }
    }
  }
`;
