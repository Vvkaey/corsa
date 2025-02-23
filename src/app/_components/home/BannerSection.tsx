import styled from "styled-components";
import { containerSidePadding } from "./styleConstants";
import { Circled } from "@/app/_assets/icons";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";

interface BannerItemProps {
  head: string | React.ReactNode;
  description: string | React.ReactNode;
}

interface BannerProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  banners: BannerItemProps[];
}

export const BannerSection = styled(
  ({
    className,
    bannerContent,
  }: {
    className?: string;
    bannerContent?: BannerProps;
  }) => {
    const { width } = useWindowSize();

    return (
      <section className={className}>
        <div className="banner-container">
          <div className="title-container">
            <h3 className="title">{bannerContent?.title}</h3>
            <div className="circled-container">
              {width && width > 992 ? (
                <Circled />
              ) : (
                <Circled width={128} height={62} />
              )}
            </div>
          </div>
          <p className="subtitle">{bannerContent?.description}</p>
          <div className="banner-items-container">
            <div className="banner-items">
              {bannerContent?.banners?.map((item, idx) => {
                return (
                  <div className="banner-item" key={idx}>
                    <h3 className="head">{item?.head}</h3>
                    <p className="description">{item?.description}</p>
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
  padding: 50px 0;
  font-family: var(--font-geist-sans);
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;

  @media (min-width: 992px) {
    display: flex;
    padding: 100px 0;
  }

  .banner-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;

    @media (min-width: 992px) {
      padding: 0 170px;
    }

    .title-container {
      position: relative;
      // border : 2px solid blue;
      .title {
        margin: 0;
        color: #000;
        text-align: center;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        ${containerSidePadding}

        @media (min-width: 992px) {
          font-size: 62px;
        }
      }

      .circled-container {
        position: absolute;
        top: -40%;
        right: 39.5%;

        @media (min-width: 992px) {
          top: -32%;
          right: 38.5%;
        }

        svg {
          position: absolute;
        }
      }
    }

    .subtitle {
      margin: 0;
      color: #000;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 22.717px */
      max-width: 56ch;
      ${containerSidePadding}

      @media (min-width: 992px) {
        font-size: 18px;
      }
    }

    .banner-items-container {
      position: relative;
      display: flex;
      width: 530px;
      padding: 20px 0;

      @media (min-width: 992px) {
        width: unset;
        padding: 20px 83px;
        border-left: rgba(0, 0, 0, 0.25) 1px solid;

        &::before {
          display: inline;
          position: absolute;
          left: -11px;
          top: calc(10% - 11px);
          content: "";
          height: 22px;
          width: 22px;
          background-color: #fff;
          border: 1px solid #000;
          border-radius: 50%;
          display: inline-block;
        }
      }

      .banner-items {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 7px;
        max-width: 1030px;
        flex-grow: 0;

        @media (min-width: 992px) {
          gap: 10px;
        }

        .banner-item {
          display: flex;
          flex-direction: column-reverse;
          padding: 10px;
          width: 175px;
          height: 237px;
          background: red;
          border-radius: 13.052px;
          border: 2px solid #000;
          background: #0c0c0c;
          overflow: hidden;
          gap: 24px;
          flex-grow: 0;
          justify-content: space-between;

          &:nth-child(odd) {
            padding: 43px 16px 40px 39px;

            @media (min-width: 992px) {
             padding: 39px 18px 17px 18px;
            }
          }

          &:nth-child(even) {
            padding: 43px 29px 40px 16px;

            @media (min-width: 992px) {
              padding: 39px 18px 17px 18px;
            }
          }

          @media (min-width: 992px) {           
            width: 283px;
            height: 282px;
          }

          .head {
            margin: 0;
            background: linear-gradient(
              180deg,
              #d3a662 -9.49%,
              #fff 66.17%,
              #fff 78.69%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            font-size: 34.085px;
            font-style: normal;
            font-weight: 800;
            line-height: 119.982%; /* 40.896px */
            letter-spacing: -1.363px;
            text-transform: uppercase;

            @media (min-width: 992px) {
              font-size: 48px;
              letter-spacing: -1.92px;
            }
          }

          .description {
            height: 80px;
            margin: 0;
            color: #fff;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 141.979%; /* 25.556px */

            @media (min-width: 992px) {
              font-size: 18px;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
`;
