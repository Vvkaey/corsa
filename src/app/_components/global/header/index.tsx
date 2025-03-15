"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState, useCallback } from "react";
import styled from "styled-components";

/**
 * `HamOverlay` is a styled component that renders a full-screen menu overlay for mobile navigation.
 */
const HamOverlay = styled(({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <button className="ham-item">Newsletter</button>
      <button className="ham-item">Apply as mentor</button>
      <button className="ham-item">Q & A</button>
    </div>
  );
})`
  position: fixed;
  background: rgba(0, 0, 0, 0.95);
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
    background: transparent;
    text-align: left;
    opacity: 0.6;
    border: none;
    cursor: pointer;

    &:hover,
    &:active {
      opacity: 1;
    }
  }
`;

/**
 * `Header` is a styled component that renders the website's header, including:
 * - A logo
 * - Navigation links
 * - A mobile hamburger menu
 *
 * @returns {JSX.Element | null} The header component, or `null` if the page is in lite mode or should not display a header.
 */
export const Header = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext);
  const pathname = usePathname();
  const { width } = useWindowSize();

  // State for managing the mobile navigation menu
  const [showHamMenu, setShowHamMenu] = useState<boolean>(false);

  /**
   * Toggles the visibility of the mobile menu.
   */
  const handleHamClick = useCallback(() => {
    setShowHamMenu((prev) => !prev);
  }, []);

  // Hide header if liteUI is enabled or the page is in the NO_HEADER_FOOTER_PAGES list
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
            <Link href="#membership-section" shallow={true} className="nav-item">
              Newsletter
            </Link>
            <Link href="#membership-section" shallow={true} className="nav-item">Apply as mentor</Link>
            <Link href="#faq-section" shallow={true} className="nav-item">
              Q & A
            </Link>
            <button className="nav-item user-container"></button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {width && width < 992 && (
          <button className="hamburger" onClick={handleHamClick} aria-label="Toggle navigation menu">
            {!showHamMenu ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
                <path d="M1 1H25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 8H25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 15H25" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" viewBox="0 0 26 16" fill="none">
                <path d="M1 1H25" stroke="red" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 8H25" stroke="red" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 15H25" stroke="red" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      {showHamMenu && <HamOverlay />}
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
    justify-content: space-between;

    @media (min-width: 992px) {
      margin: 22px 120px;
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
        display: flex;
        flex-direction: row;
        gap: 18px;
        font-family: var(--font-fustat);

        .nav-item {
          color: rgb(255, 255, 255);
          opacity: 0.65;
          transition: opacity 0.3s ease-in-out;
          cursor: pointer;
          background : none;
          border : none;

          &:hover {
            opacity: 1;
          }

          @media (min-width: 992px) {
            font-size: 16px;
            font-weight: 800;
          }

          @media (min-width: 1800px) {
            font-size: 22.746px;
          }
        }
      }
    }

    .hamburger {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;
