import styled from "styled-components";
import Image from "next/image";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";

interface ColItemProps {
  icon?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}

interface ColProps {
  colA: Array<ColItemProps>;
  colB: Array<ColItemProps>;
  colC: Array<ColItemProps>;
}

export const MembershipSection = styled(
  ({ className, traits }: { className?: string; traits?: ColProps }) => {
    const { width } = useWindowSize();

    return (
      <section className={className}>
        <div className="wrapper">
          {width && width < 992 ? (
            <div className="head-container">
              <h2 className="title">
                Your All-in-One <span className="red-text">Membership</span>
              </h2>
              <p className="subtitle">
                Your next big move starts here. Subscribe to our yearly plan and
                learn from the best.
              </p>
            </div>
          ) : null}
          <div className="container">
            {width && width > 992 ? (
              <div className="head-container">
                <h2 className="title">
                  Your All-in-One <span className="red-text">Membership</span>
                </h2>
                <p className="subtitle">
                  Your next big move starts here. Subscribe to our yearly plan
                  and learn from the best.
                </p>
              </div>
            ) : null}
            <div className="traits-container">
              <div className="col">
                {traits?.colA &&
                  traits?.colA?.map((item, idx) => {
                    return (
                      <div className="col-item" key={idx}>
                        {item?.icon ? (
                          <div className="icon-container">
                            <Image
                              src={item?.icon}
                              alt={item?.icon}
                              width={21}
                              height={21}
                            />
                          </div>
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
                {traits?.colB &&
                  traits?.colB?.map((item, idx) => {
                    return (
                      <div className="col-item" key={idx}>
                        {item?.icon ? (
                          <div className="icon-container">
                            <Image
                              src={item?.icon}
                              alt={item?.icon}
                              width={21}
                              height={21}
                            />
                          </div>
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
                {traits?.colC &&
                  traits?.colC?.map((item, idx) => {
                    return (
                      <div className="col-item" key={idx}>
                        {item?.icon ? (
                          <div className="icon-container">
                            <Image
                              src={item?.icon}
                              alt={item?.icon}
                              width={21}
                              height={21}
                            />
                          </div>
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
            <div className="pricing-container">
              <div className="price-text">
                <p className="price">
                  ₹749 <span className="tenure">/ Year</span>
                </p>
                <p className="striked-price">₹899</p>
              </div>
              <div className="cta-container">
                <button className="primary-cta">Subscribe Now</button>
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
  font-family: var(--font-geist-sans);
   padding : 100px 0;
  margin: auto;

  .wrapper {
    background: #000;
    position: relative;
    width: 100%;
    font-family: var(--font-geist-sans);
    max-width: 1500px;
    margin: auto;
    padding-bottom: 0;
    border-radius: none;
    padding-top: 37px;
    padding-bottom: 85px;

    @media (min-width: 992px) {
      border-radius: 30.016px;
      padding-top: 45px;
      padding-bottom: unset;
    }

    h2,
    p,
    h3 {
      margin: 0;
    }

    .red-text {
      color: #ff2626;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 36px;
      border-bottom: 0.5px solid
        linear-gradient(90deg, #c2c2c2 2.5%, #000 58.5%, #c2c2c2 95.5%);

      @media (min-width: 992px) {
        gap: 18.37px;
      }

      .title {
        position: relative;

        width: fit-content;
        border-radius: 19.502px;
        background: #000;
        color: #fff;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        padding: 35px 60px 25px 60px;
        text-align: center;

        @media (min-width: 992px) {
          font-size: 30px;
          padding: 35px 60px 22px 60px;
          text-align: unset;
          bottom: 20px;
        }
      }

      .subtitle {
        max-width: 30ch;
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 25.556px */

        @media (min-width: 992px) {
          max-width: 45ch;
          color: #000;
          font-size: 18px;
        }
      }
    }

    .container {
      margin: 15px 0px 0px 0px;
      border-radius: 18px;
      background: #fff;
      padding: 0 29px;

      @media (min-width: 992px) {
        padding: 0 65px;
        margin: 45px 117px 0px 117px;
        border-radius: 19.506px 19.506px 0px 0px;
      }

      .traits-container {
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: column;
        padding: 19px 0 16px 0;

        @media (min-width: 992px) {
          flex-direction: row;
          padding: unset;
        }

        &::before {
          content: "";
          position: absolute;
          width: 100%;
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
          }
        }

        &::after {
          content: "";
          position: absolute;
          width: 100%;
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
          }
        }

        .col {
          width: 100%;
          display: flex;
          flex-direction: column;
          @media (min-width: 992px) {
            padding: 20px 0;
            width: 33.33%;
            gap: 30px;
          }

          .col-item {
            position: relative;
            display: flex;
            gap: 12.5px;
            align-items: flex-start;
            padding: 33px 0 15px 0;

            @media (min-width: 992px) {
              padding: unset;
            }

            &::after {
              content: "";
              position: absolute;
              width: 100%;
              bottom: 0;
              left: 0;
              height: 1px;
              background: linear-gradient(
                90deg,
                #c2c2c2 2.5%,
                #000 58.5%,
                #c2c2c2 95.5%
              );

              @media (min-width: 992px) {
                display: none;
              }
            }

            .icon-container {
              position: relative;
              top: 4px;

              @media (min-width: 992px) {
                top: 7px;
              }

              img {
                object-fit: cover;
              }
            }

            .text {
              display: flex;
              flex-direction: column;
              gap: 13px;

              @media (min-width: 992px) {
                gap: unset;
              }

              .title {
                color: #000;
                font-size: 18px;
                font-style: normal;
                font-weight: 800;
                line-height: 141.979%;
              }

              .description {
                color: #000;
                font-size: 15px;
                font-style: normal;
                font-weight: 400;
                line-height: 141.979%;

                @media (min-width: 992px) {
                  max-width: 30ch;
                  font-weight: 700;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }

      .pricing-container {
        display: flex;
        flex-direction: column;
        padding: 40px 0;
        justify-content: space-around;
        align-items: center;
        gap: 29px;

        @media (min-width: 992px) {
          flex-direction: row;
          align-items: unset;
          gap: unset;
          padding: 19px 0px 32px 0px;
        }

        .price-text {
          color: #000;
          display: flex;
          align-items: flex-end;
          gap: 10px;

          .price {
            font-size: 28px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: capitalize;

            .tenure {
              font-size: 18px;
            }
          }

          .striked-price {
            color: #6e6e6e;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: capitalize;
            text-decoration: line-through;
          }
        }

        .cta-container {
          .primary-cta {
            min-width: 220px;
            width: 40vw;
            border-radius: 10.079px;
            border: 1.171px solid #ff2626;
            background: #ff2626;
            padding: 12px;
            color: #fff;
            font-weight: 800;
            font-size: 17.67px;
            font-style: normal;
            line-height: normal;

            @media (min-width: 992px) {
              font-size: 14px;
              width: unset;
            }
          }
        }
      }
    }
  }
`;
