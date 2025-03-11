"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

import styled from "styled-components";

const HamOverlay = styled(({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <button className="ham-item">Newsletter</button>
      <button className="ham-item">Apply as mentor</button>
      <button className="ham-item">Q & A</button>
      <button className="ham-item"></button>
    </div>
  );
})`
  position: fixed;
  background: rgba(0, 0, 0, 0.95);
  // border-top : 1px solid red;
  top: 50px;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 11;

  @media (min-width: 992px) {
    display: none;
  }

  button.ham-item {
    font-size: 25px;
    padding: 18px auto;
    background: transparent;
    text-align: left;
    opacity: 0.6;
    border: none;

    &:hover,
    &:active {
      opacity: 1;
    }
  }
`;

export const Header = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext);
  const pathname = usePathname();
  const { width } = useWindowSize();

  const [showHamMenu, setShowHamMenu] = useState<boolean>(false);

  const handleHamClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setShowHamMenu((prev: boolean) => !prev);
  };

  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;
  return (
    <header className={className}>
      <div className="nav-container">
        <div className="left-pan">
          <div className="image-container">
            <Image src="/footer/corsaFooter.svg" fill alt="corsa-logo" />
          </div>
        </div>
        <div className="right-pan">
          <div className="nav-items">
            <div className="nav-item">Newsletter</div>
            <div className="nav-item">Apply as mentor</div>
            <div className="nav-item">Q & A</div>
            <div className="nav-item user-container"></div>
          </div>
          {/* <div className="highlighted-nav">Contact us</div> */}
        </div>
        {/* For mobile navigation */}
        {width && width < 992 ? (
          <button className="hamburger" onClick={handleHamClick}>
            {showHamMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                viewBox="0 0 26 16"
                fill="none"
              >
                <path
                  d="M1 1H25"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 8H25"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 15H25"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="16"
                viewBox="0 0 26 16"
                fill="none"
              >
                <path
                  d="M1 1H25"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 8H25"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 15H25"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        ) : null}
      </div>
      {!showHamMenu ? <HamOverlay /> : null}
    </header>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: rgb(0, 0, 0);
  backdrop-filter: blur(10px);
  font-family: var(--font-geist-sans);
  z-index: 10;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.3);

  @media (min-width: 992px) {
    background: rgb(0, 0, 0);
    border-bottom: none;
  }

  .nav-container {
    margin: 15px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;

    @media (min-width: 992px) {
      margin: 22px 120px;
      // border: none;
      border: 1px solid #fff;
    }

    @media (min-width: 1600px) {
      margin: 22px auto;
      max-width: 1500px;
    }

    @media (min-width: 1800px) {
      margin: 30px auto;
    }

    .left-pan {
      display: flex;
      justify-content: center;
      align-items: center;

      .image-container {
        position: relative;
        width: 152px;
        height: 16px;

        @media (min-width: 992px) {
          width: 280px;
          height: 30px;
        }

        img {
          object-fit: contain;
          width: 100%;
          height: auto;
        }
      }
    }

    .right-pan {
      color: rgb(255, 255, 255);
      display: none;
      flex-direction: row;
      gap: 43px;

      @media (min-width: 992px) {
        display: flex;
      }

      .nav-items {
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 18px;
        font-family: var(--font-fustat);

        .nav-item {
          color: #fff;

          @media (min-width: 992px) {
            font-size: 16px;
            font-style: normal;
            font-weight: 800;
            line-height: normal;
          }

          @media (min-width: 1800px) {
            font-size: 22.746px;
          }
        }

        .user-container {
          border-radius: 50%;

          background-color: #aeaeae;

          @media (min-width: 992px) {
            width: 31px;
            height: 31px;
          }

          @media (min-width: 1800px) {
            width: 44.07px;
            height: 44.07px;
          }
        }
      }

      .highlighted-nav {
        margin: auto;
        color: rgba(255, 0, 0, 0.65);
        white-space: nowrap;
      }
    }

    .hamburger {
      position: relative;
      background: transparent;
      border: none;
    }
  }
`;
