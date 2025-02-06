"use client";

import styled from "styled-components";
import { sectionPadding } from "./styleConstants";
import Image from "next/image";
import { ShadowHeading } from "../global/shadowHeading";

interface FlowColBProps {
  img: string;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}

interface FlowColCProps {
  img: string;
}

interface FlowProps {
  colA: string | React.ReactNode;
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
            {
                flowItems?.map((item, idx) => (
                    <div className="flow-item" key={idx}>
            <div className="content-a">
              <ShadowHeading title={item?.colA} />
            </div>
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
                ))
            }
          {/* <div className="flow-item">
            <div className="content-a">
              <ShadowHeading title="Flow 1" />
            </div>
            <div className="content-b">
              <div className="icon-container">
                <Image src={"/flow/flow-a.svg"} alt="flow-image" fill />
              </div>
              <h3 className="title">Book a Slot</h3>
              <p className="sub-title">Schedule a session with a mentor.</p>
            </div>
            <div className="content-c">
              <div className="ss-container">
                <Image src={"/flow/flow-ss-b.svg"} alt="flow-image" fill />
              </div>
            </div>
          </div>
          <div className="flow-item">
            {" "}
            <div className="content-a">
              <ShadowHeading title="Flow 1" />
            </div>
            <div className="content-b">
              <div className="icon-container">
                <Image src={"/flow/flow-b.svg"} alt="flow-image" fill />
              </div>
              <h3 className="title">Book a Slot</h3>
              <p className="sub-title">Schedule a session with a mentor.</p>
            </div>
            <div className="content-c"></div>
          </div>
          <div className="flow-item">
            {" "}
            <div className="content-a">
              <ShadowHeading title="Flow 1" />
            </div>
            <div className="content-b">
              <div className="icon-container">
                <Image src={"/flow/flow-c.svg"} alt="flow-image" fill />
              </div>
              <h3 className="title">Book a Slot</h3>
              <p className="sub-title">Schedule a session with a mentor.</p>
            </div>
            <div className="content-c"></div>
          </div>
          <div className="flow-item">
            {" "}
            <div className="content-a">
              <ShadowHeading title="Flow 1" />
            </div>
            <div className="content-b">
              <div className="icon-container">
                <Image src={"/flow/flow-d.svg"} alt="flow-image" fill />
              </div>
              <h3 className="title">Book a Slot</h3>
              <p className="sub-title">Schedule a session with a mentor.</p>
            </div>
            <div className="content-c"></div>
          </div>
          <div className="flow-item">
            {" "}
            <div className="content-a">
              <ShadowHeading title="Flow 1" />
            </div>
            <div className="content-b">
              <div className="icon-container">
                <Image src={"/flow/flow-e.svg"} alt="flow-image" fill />
              </div>
              <h3 className="title">Book a Slot</h3>
              <p className="sub-title">Schedule a session with a mentor.</p>
            </div>
            <div className="content-c"></div>
          </div> */}
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

  .flow-container {
    padding: 0 170px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .flow-item {
      position: relative;
      width: 100%;
      height: 460px;
      //   border: 1px solid blue;
      display: flex;

      &::before {
        display: inline;
        position: absolute;
        left: -11px;
        top: calc(50% - 11px);
        content: "";
        height: 22px;
        width: 22px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 50%;
        display: inline-block;
      }

      .content-a,
      .content-b,
      .content-c {
        height: 100%;
      }

      .content-a {
        border-left: 1px solid #000;
        width: 28%;
        display: flex;
        padding-left: 37px;

        &>div{
         background : #f9f9f9;
        }
       
      }

      .content-b {
        width: 29%;

        display: flex;
        flex-direction: column;
        gap: 16px;
        justify-content: center;

        .icon-container {
          position: relative;
          width: 78px;
          height: 78px;

          img {
            position: absolute;
            object-fit: contain;
          }
        }

        .title {
          margin: 0;
          color: #000;
          font-size: 30.423px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: capitalize;
        }

        .sub-title {
        max-width : 70%;
          margin: 0;
          color: rgba(0, 0, 0, 0.66);
          font-size: 19.123px;
          font-style: normal;
          font-weight: 800;
          line-height: 141.979%; /* 27.15px */
        }
      }

      .content-c {
        position: relative;
        height: 428px;
        margin: 16px 0;
        width: 43%;
        border-radius: 19.67px;
        border: 0.678px solid #000;
        background: linear-gradient(180deg, #fff 0%, #ffeac8 100%);
        display: flex;
        align-items: flex-end;

        .ss-container {
          width: 100%;
          position: relative;
          height: 344px;

          img {
            position: absolute;
            bottom: 0;
          }
        }
      }
    }
  }
`;
