"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI";
import Image from "next/image";
// import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";

export const Footer = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext);
  const pathname = usePathname();

  //   const {width} = useWindowSize()

  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;
  return (
    <div className={className}>
      <div className="container">
        <div className="content">
          <div className="left-block">
            <p className="cheers">Cheers!</p>
            <div className="cta-container">
              <button className="primary-button">Apply as mentor</button>
            </div>
          </div>
          <div className="right-block">
            <div className="contact-container">
              <p className="tagline">Reach out to us!</p>
              <p className="email">connect@corsaclub.io</p>
            </div>
            <div className="tnc-container">
              <p className="privacy-policy">Privacy policy</p>
              <p className="tnc">Terms of service</p>
            </div>
          </div>
        </div>
        <p className="copyright">© 2025 CorsaClub</p>
        <div className="logo-container">
          <Image src="/footer/corsaFooter.svg" fill alt="corsa-logo" />
        </div>
      </div>
    </div>
  );
})`
  width: 100vw;
  background: rgb(0, 0, 0);
  .container {
    max-width: 1500px;
    margin: auto;

    backdrop-filter: blur(10px);
    font-family: var(--font-geist-sans);
    z-index: 10;
    font-family: var(--font-geist-sans);
    display: flex;
    flex-direction: column;
    gap: 21px;
    @media (min-width: 992px) {
      gap: 50px;
    }
    .copyright {
      color: #fff;
      font-size: 16px;
      font-style: normal;
      font-weight: 800;
      line-height: 141.979%; /* 22.717px */
      padding: 0 24px;

      @media (min-width: 992px) {
        font-size: 18px;
        padding: 0 60px;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      @media (min-width: 992px) {
        flex-direction: row;
      }

      .left-block {
        padding: 59px 24px 44px;
        @media (min-width: 992px) {
          padding: 68px 60px 0px;
          width: 50%;
        }

        .cheers {
          color: #fff;
          font-size: 28px;
          font-style: normal;
          font-weight: 800;
          line-height: 119.982%; /* 33.595px */

          @media (min-width: 992px) {
            font-size: 32px;
          }
        }

        .cta-container {
          padding-top: 24px;
          @media (min-width: 992px) {
            padding-top: 48px;
          }

          .primary-button {
                      font-family: var(--font-fustat);
            border-radius: 8px;
            border: 0.635px solid #ffeac8;
            color: #fff;
            font-size: 14px;
            font-style: normal;
            font-weight: 800;
            line-height: 141.979%; /* 19.877px */
            width: 100%;
            background: none;
            padding: 9px 40px;
            width: 100%;

            @media (min-width: 992px) {
              border-radius: 11.673px;
              border: 0.834px solid #ffeac8;
              color: #fff;
              font-size: 18px;
              width: 247px;
              padding: 10.8px 50px;
            }
          }
        }
      }

      .right-block {
        display: flex;
        justify-content: space-between;

        padding: 0 24px;
        @media (min-width: 992px) {
          padding: 68px 60px 0px;
          gap: 92px;
          width: 50%;
          justify-content: unset;
        }

        .contact-container {
          display: flex;
          flex-direction: column;
          gap: 5px;

          .tagline {
            font-family: var(--font-fustat);
            color: #fff;
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: 141.979%; /* 22.717px */

            @media (min-width: 992px) {
              font-size: 18px;
            }
          }

          .email {
            font-family: var(--font-fustat);
            color: #c1c1c1;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 141.979%; /* 22.717px */

            @media (min-width: 992px) {
              font-size: 18px;
            }
          }
        }

        .tnc-container {
          display: flex;
          flex-direction: column;
          gap: 5px;

          .privacy-policy,
          .tnc {
            color: #fff;
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: 141.979%; /* 22.717px */
             font-family: var(--font-fustat);

            @media (min-width: 992px) {
              font-size: 18px;
            }
          }
        }
      }
    }

    .logo-container {
      position: relative;
      width: 90%;
      height: 250px;
      margin: auto;

      @media (min-width: 992px) {
        height: 200px;
      }

      img {
        position: absolute;
        object-fit: contain;
        width: 100%;
        height: auto;
      }
    }
  }
`;
