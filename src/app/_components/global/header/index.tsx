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
        <div className="right-pan">
          <div className="nav-items">
            <div className="nav-item">Newsletter</div>
            <div className="nav-item">Q&A</div>
            <div className="nav-item">Contact us</div>
          </div>
          {/* <div className="highlighted-nav">Contact us</div> */}
        </div>
      </div>
    </div>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: black;
  background: rgb(0, 0, 0);
  backdrop-filter: blur(10px);
  font-family: var(--font-geist-sans);
  z-index : 10;

  .nav-container {
    margin: 8px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;

    .left-pan {
      width: fit-content;
      font-size: 28px;
      font-weight : 700;
      letter-spacing: 5px;
      color: white;
    }

    .right-pan {
      color: rgb(255, 255, 255);
      display: flex;
      flex-direction: row;
      gap: 43px;
      font-size: 20px;

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
  }
`;
