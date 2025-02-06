"use client";
import styled from "styled-components";
import { sectionPadding } from "./styleConstants";
import Image from "next/image";
import { JSX } from "react";
// import { ShadowHeading } from "../global/shadowHeading";

export const IconShowcase = styled(
  ({
    className,
    head,
    subHead,
    icons,
  }: {
    className?: string;
    head?: string | JSX.Element;
    subHead?: string | JSX.Element;
    icons?: Record<string, string>[];
  }) => {
    return (
      <section className={className}>
        {/* <ShadowHeading /> */}
        <div className="content">
          {head ? (
            <h3 className="head">
              {/* Gain exclusive insights and access an unparalleled tribe of
              mentors. */}
              {head}
            </h3>
          ) : null}
          {subHead ? <h4 className="sub-head"> {subHead}</h4> : null}
          {icons?.length ? (
            <div className="icon-container">
              <div className="icon">
                {" "}
                <Image src={"/iconA.svg"} alt="not-found-image" fill />
              </div>
              <div className="icon">
                {" "}
                <Image src={"/iconB.svg"} alt="not-found-image" fill />
              </div>
              <div className="icon">
                {" "}
                <Image src={"/iconC.svg"} alt="not-found-image" fill />
              </div>
              <div className="icon">
                {" "}
                <Image src={"/iconD.svg"} alt="not-found-image" fill />
              </div>
              <div className="icon">
                {" "}
                <Image src={"/iconE.svg"} alt="not-found-image" fill />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
)`
  width: 100%;
  background: #fff;
  font-family: var(--font-geist-sans);
  text-align : center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    h3.head {
      margin: 0;
      color: #000;
      font-size: 30px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    h4.sub-head {
      margin: 0;
      color: #5f5f5f;
      font-size: 26px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .icon-container {
      padding-top: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      width: 100%;
      gap: 85px;

      .icon {
        position: relative;
        width: 78px;
        height: 78px;

        img {
          position: absolute;
          object-fit: contain;
        }
      }
    }
  }
`;

export const HeroSection = styled(
  ({
    className,
    head,
    subHead,
    primaryCta,
    secondaryCta,
    headB,
    subHeadB,
    icons,
    compactContainerB = false
  }: {
    className?: string;
    head?: string | JSX.Element;
    subHead?: string | JSX.Element;
    primaryCta?: string;
    secondaryCta?: string;
    headB?: string | JSX.Element;
    subHeadB?: string | JSX.Element;
    icons?: Record<string, string>[];
    compactContainerB?: boolean;
  }) => {
    return (
      <section className={className}
      style={{gap : compactContainerB ? "20px" : "90px"}}
      >
        {/* <ShadowHeading /> */}
        <div className="content">
          {head ? <h2 className="head">{head}</h2> : null}
          {subHead ? <h3 className="sub-head">{subHead}</h3> : null}
          {primaryCta || secondaryCta ? (
            <div className="cta-container">
              <button className="primary-cta">{primaryCta}</button>
              <button className="secondary-cta">{secondaryCta}</button>
            </div>
          ) : null}
        </div>
        <IconShowcase head={headB} subHead={subHeadB} icons={icons}/>
      </section>
    );
  }
)`
  width: 100%;
  ${sectionPadding}
  background : #fff;
  font-family: var(--font-geist-sans);
  display: flex;
  flex-direction: column;
  gap: 90px;
  

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    h2.head {
      margin: 0;
      color: #000c2d;
      font-size: 85.365px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: capitalize;
      text-align: center;
    }

    h3.sub-head {
      margin: 0;
      color: #626161;
      font-size: 26.04px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: capitalize;
    }

    .cta-container {
      padding-top: 39px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      .primary-cta {
        border-radius: 15.013px;
        border: 1.699px solid #fae3ca;
        background: #ff2626;
        padding: 14.5px 29px;
        color: #fff;
        font-family: Fustat;
        font-size: 19.843px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
      }

      .secondary-cta {
        border-radius: 15.013px;
        border: 1.699px solid #e03233;
        padding: 14.5px 29px;
        background: transparent;
        color: #ff2626;
        font-size: 19.843px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
      }
    }
  }
`;
