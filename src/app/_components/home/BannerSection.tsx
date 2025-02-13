import styled from "styled-components";
import { sectionPadding } from "./styleConstants";

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
    return (
      <section className={className}>
        <div className="banner-container">
          <h3 className="title">{bannerContent?.title}</h3>
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
              {/* <div className="banner-item">
                <h3 className="head">guidance</h3>
                <p className="description">
                  Get one-on-one support to navigate challenges with confidence.
                </p>
              </div>
              <div className="banner-item">
                <h3 className="head">guidance</h3>
                <p className="description">
                  Get one-on-one support to navigate challenges with confidence.
                </p>
              </div>
              <div className="banner-item">
                <h3 className="head">guidance</h3>
                <p className="description">
                  Get one-on-one support to navigate challenges with confidence.
                </p>
              </div>
              <div className="banner-item">
                <h3 className="head">guidance</h3>
                <p className="description">
                  Get one-on-one support to navigate challenges with confidence.
                </p>
              </div>
              <div className="banner-item">
                <h3 className="head">guidance</h3>
                <p className="description">
                  Get one-on-one support to navigate challenges with confidence.
                </p>
              </div>
              <div className="banner-item">
                <h3 className="head">guidance</h3>
                <p className="description">
                  Get one-on-one support to navigate challenges with confidence.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    );
  }
)`
  position: relative;
  width: 100%;
  height: 100vh;
  ${sectionPadding}
  font-family: var(--font-geist-sans);
  display: none;
  justify-content: center;
  align-items: center;

  @media (min-width : 992px){
    display: flex;
  }

  .banner-container {
    padding: 0 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .title {
      margin: 0;
      color: #000;
      text-align: center;
      font-size: 82px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: capitalize;

      .circled {
      }
    }

    .subtitle {
      margin: 0;
      color: #000;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 34.075px */
      max-width: 56ch;
    }

    .banner-items-container {
      position: relative;
      display: flex;
      border-left: rgba(0, 0, 0, 0.25) 1px solid;
      padding: 30px 83px;
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

      .banner-items {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        max-width: 1030px;
        flex-grow: 0;

        .banner-item {
          display: flex;
          flex-direction: column-reverse;
          padding: 10px;
          width: 309px;
          height: 311px;
          background: red;
          border-radius: 13.052px;
          border: 2px solid #000;
          background: #0c0c0c;
          overflow: hidden;
          gap: 24px;
          flex-grow: 0;

          .head {
            margin: 0;
            font-size: 70.168px;
            font-style: normal;
            font-weight: 400;
            line-height: 119.982%; /* 128.582px */
            letter-spacing: -7.287px;
            background: linear-gradient(
              180deg,
              #d3a662 0%,
              #fff 86.72%,
              #fff 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
          }

          .description {
            height: 80px;
            margin: 0;
            color: #fff;
            font-size: 18.279px;
            font-style: normal;
            font-weight: 500;
            line-height: 141.979%; /* 25.953px */
            padding: 0 27px;
          }
        }
      }
    }
  }
`;
