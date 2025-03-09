"use client";
import styled from "styled-components";
import { containerSidePadding, sectionPadding } from "./styleConstants";
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
  text-align: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    h3.head {
      font-family: var(--font-fustat);
      margin: 0;
      color: #333;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      @media (min-width: 992px) {
        font-size: 20px;
      }
    }

    h4.sub-head {
      font-family: var(--font-fustat);
      margin: 0;
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      max-width: 37ch;

      @media (min-width: 992px) {
      text-align : center;
        font-size: 20px;
        max-width: 36ch;
        font-weight: 500;
      }
    }

    .icon-container {
      padding-top: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      width: 100%;
      gap: 13px;

      @media (min-width: 992px) {
        gap: 85px;
        padding-top: 39px;
      }

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
    secondaryHead = false,
    subHead,
    primaryCta,
    onPrimaryCtaClick,
    secondaryCta,
    headB,
    subHeadB,
    icons,
    compactContainerB = false,
  }: {
    className?: string;
    head?: string | JSX.Element;
    secondaryHead?: boolean;
    subHead?: string | JSX.Element;
    primaryCta?: string;
    onPrimaryCtaClick?: ()=>void;
    secondaryCta?: string;
    headB?: string | JSX.Element;
    subHeadB?: string | JSX.Element;
    icons?: Record<string, string>[];
    compactContainerB?: boolean;
  }) => {
    return (
      <section className={className}>
        <div
          className={`${
            compactContainerB
              ? "root-container compact-container"
              : "root-container"
          }`}
        >
          {/* <ShadowHeading /> */}
          <div className="content">
            {head ? (
              <h2 className={secondaryHead ? "secondary-head" : "head"}>
                {head}
              </h2>
            ) : null}
            {subHead ? <h3 className="sub-head">{subHead}</h3> : null}
            {primaryCta || secondaryCta ? (
              <div className="cta-container">
                <button className="primary-cta" onClick={onPrimaryCtaClick}>{primaryCta}</button>
                <button className="secondary-cta">{secondaryCta}</button>
              </div>
            ) : null}
          </div>
          <IconShowcase head={headB} subHead={subHeadB} icons={icons} />
        </div>
      </section>
    );
  }
)`
  position: relative;
  top: 30%;
  width: 100%;
  padding-top: 88px;
  background: #fff;

  @media (min-width: 992px) {
    padding-top: 98px;
  }

  .root-container {
    ${sectionPadding}
    ${containerSidePadding}
    background : #fff;
    font-family: var(--font-geist-sans);
    display: flex;
    flex-direction: column;
    gap: 37px;

    @media (min-width: 992px) {
      gap: 56px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;

      @media (min-width: 992px) {
        gap: 4px;
      }

      h2.head {
        margin: 0;
        color: #000c2d;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        text-align: center;
        max-width: 12ch;

        @media (min-width: 992px) {
          font-size: 70px;
          max-width: unset;
        }
      }

      .secondary-head {
        margin: 0;
        color: #000c2d;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        text-align: center;
        max-width: 32ch;

        @media (min-width: 992px) {
          font-size: 68px;
          max-width: unset;
        }
      }

      h3.sub-head {
        font-family: var(--font-fustat);
        margin: 0;
        color: #626161;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: capitalize;

        @media (min-width: 992px) {
          font-size: 20px;        
        }
      }

      .cta-container {
        padding-top: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 12px;

        @media (min-width: 992px) {
          padding-top: 33px;
          flex-direction: row;
          gap: 16px;
        }

        .primary-cta {
          border-radius: 15.013px;
          border: 1.699px solid #fae3ca;
          background: #ff2626;
          padding: 14px 33px;
          color: #fff;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          font-family: var(--font-fustat);
          cursor : pointer;

          @media (min-width: 992px) {
            padding: 14.5px 29px;
            font-size: 16.5px;
          }
        }

        .secondary-cta {
          border-radius: 15.013px;
          border: 1.699px solid #e03233;
          padding: 14px 33px;
          background: transparent;
          color: #ff2626;
          font-size: 14px;
          font-style: normal;
          font-weight: 800;
          line-height: normal;
          font-family: var(--font-fustat);
          cursor : pointer;


          @media (min-width: 992px) {
            padding: 14.5px 29px;
            font-size: 16.5px;
          }
        }
      }
    }
  }

  .compact-container {
    gap: 12px;
    @media (min-width: 992px) {
      gap: 24px;
    }
  }
`;
