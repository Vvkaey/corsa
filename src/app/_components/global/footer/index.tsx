"use client"; // Ensures the component runs only on the client-side

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants"; // List of pages where the footer should be hidden
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI"; // Context for global UI settings
import Image from "next/image"; // Optimized image handling in Next.js
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Hook to get the current page pathname
import { useContext } from "react"; // Hook to access React context
import styled from "styled-components"; // Allows for modular CSS using Styled Components
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../../new_mixins/mixins";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { ModalContext } from "../Modal";
import { ApplyMembershipTFModal } from "../../pricing/ContactUs";

export const Footer = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext); // Access global UI settings
  const pathname = usePathname(); // Get the current route
  const router = useRouter();
  const {width} = useWindowSize();
  const ModalClient = useContext(ModalContext);

  // Hide footer if lite mode is enabled or if the page is in NO_HEADER_FOOTER_PAGES
  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;

  const onApplyMentorClick = () => {
    if (router) {
      router.push("/apply-for-mentor");
    }
  };

  const onReachOutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let url = 'website';
    if (window) {
      url = window.location.hostname + window.location.pathname;
    }
    ModalClient.set(
      <ApplyMembershipTFModal
        trackingParams={{
          utm_source: url,
          utm_medium: 'footer-cta',
        }}
      />,
    );
    ModalClient.setCloseButtonTheme('light');
    ModalClient.show();
  };

  return (
    <div className={className}>
      <div className="container">
        {/* Main content area of the footer */}
        <div className="content">
          {/* Left section with greeting and CTA button */}
          <div className="left-block">
            <p className="cheers">Cheers!</p>
            <div className="cta-container">
              <button className="primary-button" onClick={onApplyMentorClick}>
                Apply as mentor
              </button>
            </div>
          </div>

          {/* Right section with contact info and legal links */}
          <div className="right-block">
            <button
              className="primary-button"
              onClick={onReachOutClick}
              style={{
                background: "#fff",
                color: "#000",
              }}
            >
              Reach out to us!
            </button>
          </div>
        </div>

        {/* Copyright text */}
        <div className="copyright-container">
          {(width ?? 0) > 992 ? <p className="copyright">© 2025 Strodaclub</p> : null}
          <div className="tnc-container">
            <Link href={"/privacy-policy"} className="privacy-policy">
              Privacy policy
            </Link>
            <Link href={"/terms-and-conditions"} className="tnc">
              Terms of service
            </Link>
          </div>
        </div>
       {(width ?? 0) < 992 ? <div className="copyright-container">
          <p className="copyright">© 2025 Strodaclub</p>
          </div> : null}

        {/* Footer logo */}
        <div className="logo-container">
          <Image src="/header/company_logo_white.svg" fill alt="corsa-logo" />
        </div>
      </div>
    </div>
  );
})`
  /* Footer styling */
  width: 100vw;
  background: rgb(0, 0, 0);

  .container {
    margin: auto;
    backdrop-filter: blur(10px); /* Glassmorphism effect */
    font-family: var(--font-exo);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 21px;
    ${maxWidthContainer};
    ${sectionResponsivePadding()};

    @media (min-width: 992px) {
      gap: 50px;
      // height: 95vh;
      justify-content: flex-end;
    }

    @media (min-width: 1600px) {
      margin: 0px auto;
    }

    @media (min-width: 1950px) {
      gap: 72px;
      margin: 30px auto 0;
    }

    /* Copyright text */
    .copyright {
      padding: 7px 0;
      color: #c7c7c7;
      font-family: var(--font-exo);
      font-size: 14.671px;
      font-style: normal;
      font-weight: 800;
      line-height: 119.982%; /* 17.602px */
      @media (min-width: 992px) {
        font-size: 18px;
        padding: 0 60px 0 0;
        padding-top: 18px;
      }

      @media (min-width: 1950px) {
        padding-top: 24px;
        font-size: 25.589px;
      }
    }

    /* Main content layout */
    .content {
      display: flex;
      flex-direction: column;

      @media (min-width: 992px) {
        flex-direction: row;
        margin-top: 12px;
      }

      @media (min-width: 1950px) {
        margin-top: 50px;
      }


      .primary-button {
        position: relative;
        border-radius: 8px;
        border: 0.635px solid #ffeac8;
        color: #fff;
        font-size: 16px;
        font-weight: 800;
        background: none;
        padding: 11px 33px;
        width: 100%;
        cursor: pointer;
        white-space: nowrap;
        font-family: var(--font-fustat);
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%, -50%);
          transform-origin: 50% 50%;
        }

        @media (min-width: 992px) {
          border-radius: 11.673px;
          border: 0.834px solidrgb(14, 10, 4);
          max-width: 347px;
          padding: 10px 40px;
          font-size: 16.5px;
          transition: all 5ms ease-in;
        }

        @media (min-width: 1950px) {
          padding: 13px 58px;
          font-size: 23.521px;
        }
      }

      /* Left block: greeting and CTA */
      .left-block {
        padding: 86px 0px 9px;

        @media (min-width: 992px) {
          padding: 68px 60px 0px 0px;
          width: 50%;
        }

        .cheers {
          color: #fff;
          font-size: 28px;
          font-weight: 800;

          @media (min-width: 992px) {
            font-size: 32px;
          }

          @media (min-width: 1950px) {
            font-size: 45.491px;
          }
        }

        /* CTA button */
        .cta-container {
          padding-top: 58px;
          font-family: var(--font-fustat);

          @media (min-width: 992px) {
            padding-top: 48px;
          }

          @media (min-width: 1950px) {
            padding-top: 74.5px;
          }
        }
      }

      /* Right block: Contact & Legal Links */
      .right-block {
        display: flex;
        justify-content: space-between;
        font-family: var(--font-fustat);
        // border: 2px double red;
        // background: grey;

        @media (min-width: 992px) {
          padding: 68px 0px 0px 60px;
          gap: 92px;
          width: 50%;
          justify-content: flex-end;
          align-items: flex-end;
        }

        /* Contact Info */
        .contact-container {
          @media (min-width: 992px) {
            height: fit-content;
            border-radius: 5.625px;
            border: 1.416px solid #fff;
            background: #fff;
            color: #000;
            leading-trim: both;
            text-edge: cap;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #fff;
            font-family: var(--font-fustat);
            font-size: 17.992px;
            font-style: normal;
            font-weight: 800;
            line-height: 141.979%; /* 25.545px */
            padding: 15px 50px;
          }
        }
      }
    }

    /* Privacy & Terms */
    .tnc-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 5px;
      margin-top: 17px;

      @media (min-width: 992px) {
        flex-direction: row;
margin-top: unset;
        align-items: flex-end;
        gap: 12px;
      }

      @media (min-width: 1950px) {
        gap: 22px;
      }

      .privacy-policy,
      .tnc {
        color: #c7c7c7;
        font-family: var(--font-fustat);
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 141.979%; /* 22.717px */

        @media (min-width: 992px) {
          font-size: 18px;
          color: #c7c7c7;
          leading-trim: both;
          text-edge: cap;
          font-family: var(--font-fustat);
          font-style: normal;
          font-weight: 500;
          line-height: 141.979%; /* 25.545px */

          &:hover {
            text-decoration: underline;
          }
        }

        @media (min-width: 1950px) {
          font-size: 25.589px;
        }
      }
    }

    .copyright-container {
      // border: 2px solid red;

      @media (min-width: 992px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    /* Logo styling */
    .logo-container {
      position: relative;
      width: 100%;
      height: 40px;
      margin: auto;
      margin-bottom: 322px;
      padding-top: 8px;

      @media (min-width: 992px) {
       padding-top: unset;
        height: 130px;
        width: 100%;
        margin: 0 0 65px 0;
      }

      @media (min-width: 1950px) {
        margin-bottom: 92.7px;
        height: 185px;
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
