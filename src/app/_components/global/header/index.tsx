"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";

export const Header = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext);
  const pathname = usePathname();
  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;
  return (
    <div className={className}>
      <div className="nav-container">
        <div className="left-pan">CORSA CLUB</div>
        {/* For Desktop navigation */}
        <div className="right-pan">
          <div className="nav-items">
            <div className="nav-item">Newsletter</div>
            <div className="nav-item">Q&A</div>
            <div className="nav-item">Contact us</div>
          </div>
          {/* <div className="highlighted-nav">Contact us</div> */}
        </div>
        {/* For mobile navigation */}
        <button className="hamburger" onClick={() => alert("ham clicked!!")}>
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
        </button>
      </div>
    </div>
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

  @media (min-width: 992px) {
    background: rgb(0, 0, 0);
  }

  .nav-container {
    margin: 15px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;

    @media (min-width: 992px) {
      margin: 8px 40px;
      border: none;
    }

    .left-pan {
      width: fit-content;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 5px;
      color: white;

      @media (min-width: 992px) {
        font-size: 28px;
      }
    }

    .right-pan {
      color: rgb(255, 255, 255);
      display: none;
      flex-direction: row;
      gap: 43px;
      font-size: 20px;

      @media (min-width: 992px) {
        display: flex;
      }

      .nav-items {
        margin: auto;
        display: flex;
        flex-direction: row;
        gap: 18px;
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
