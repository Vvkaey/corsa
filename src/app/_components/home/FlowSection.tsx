"use client";

import styled from "styled-components";
import { sectionPadding } from "./styleConstants";
import Image from "next/image";
// import { ShadowHeading } from "../global/shadowHeading";

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

export const FlowSection = styled(
  ({
    className,
    flowItems,
  }: {
    className?: string;
    flowItems?: FlowProps[];
  }) => {
    return (
      <section className={className}>
        <div className="flow-container">
          {flowItems?.map((item, idx) => (
            <div className="flow-item" key={idx}>
              <div className="content-a">
                {/* <ShadowHeading title={item?.colA} /> */}
                <div className="absolute-icon-container">
                  <Image
                    src={item?.colA?.img}
                    alt={item?.colA?.img}
                    width={item?.colA?.width}
                    height={item?.colA?.height}
                    style={{
                      top: item?.colA?.top,
                      right: item?.colA?.right,
                      transform: item?.colA?.transform,
                    }}
                    //  fill
                  />
                </div>
              </div>
              <div className="content-bc">
                <div className="content-b">
                  <div className="icon-container">
                    <Image src={item?.colB?.img} alt={item?.colB?.img} fill />
                  </div>
                  <h3 className="title">{item?.colB?.title}</h3>
                  <p className="sub-title">{item?.colB?.subtitle}</p>
                </div>
                <div className="content-c">
                  <div className="ss-container">
                    <Image src={item?.colC?.img} alt={item?.colC?.img} fill />
                  </div>
                </div>
              </div>
              <div className="content-d">
                {/* <div className="ss-container">
                  <Image src={item?.colC?.img} alt={item?.colC?.img} fill />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
)`
  ${sectionPadding}
  position : relative;
  width: 100%;
  background: #f9f9f9;
  font-family: var(--font-geist-sans);
  display: flex;
  justify-content: center;
  // border : 1px solid black;

  .flow-container {
    // padding: 0 170px;
    max-width: 1440px;
    width: 100%;
    display: flex;
    gap: 32px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border : 1px solid black;

    .flow-item {
      position: relative;
      width: 100%;
      height: 380px;
      display: flex;
      // overflow: hidden;

      // &::before {
      //   display: inline;
      //   position: absolute;
      //   left: -11px;
      //   top: calc(50% - 11px);
      //   content: "";
      //   height: 22px;
      //   width: 22px;
      //   background-color: #fff;
      //   border: 1px solid #000;
      //   border-radius: 50%;
      //   display: inline-block;
      // }

      // .content-a,
      // .content-b,
      // .content-c {
      //   height: 100%;
      // }

      .content-a {
        // border-left: 1px solid #000;
        // border: 1px solid #000;
        width: 20%;
        display: flex;
        padding-left: 37px;

        & > div {
          background: #f9f9f9;
        }

        .absolute-icon-container {
          width: 100%;
          position: relative;
          height: 100%;
          // border: 1px solid #000;

          img {
            // border: 1px solid red;
            position: absolute;
            bottom: 0;
            object-fit: contain;
          }
        }
      }

      .content-bc {
        padding: 75px 62px 0px 62px;
        width: 60%;
        border-radius: 20.987px;
        border: 0.724px solid #fff;
        background: #000;
        position: relative;
        display: flex;

        .content-b {
          padding-top: 43px;
          position: relative;
          width: 48%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          color: #fff;
          // justify-content: center;
          .icon-container {
            position: relative;
            width: 54px;
            height: 54px;

            img {
              position: absolute;
              object-fit: contain;
              filter: invert(1);
            }
          }

          .title {
            margin: 0;
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: capitalize;
          }

          .sub-title {
            max-width: 70%;
            margin: 0;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 141.979%; /* 25.556px */
          }
        }

        .content-c {
          position: relative;
          width: 52%;
          border-top-left-radius: 19.67px;
          border-top-right-radius: 19.67px;
          display: flex;
          align-items: flex-end;
          background: #ffffff;
          padding-top : 27px;

          .ss-container {
            width: 100%;
            position: relative;
            height: 100%;

            img {
              position: absolute;
              top: 25%;
              width: 100%;
              height: auto;
            }
          }
        }
      }

      .content-d {
        width: 20%;
        height: 100%;
        // border: 1px solid red;
      }
    }
  }
`;
