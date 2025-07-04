"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import Image from "next/image";
// import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
// import { Badge } from "../Badge";
import {
  headerSpacing,
  maxWidthContainer,
  sectionResponsivePadding,
} from "../../new_mixins/mixins";
import { BadgeProfileImg } from "../Badge";
import { useAuth } from "@/app/_contexts/AuthContext";

// const ProfileContainer = styled.div`
//   padding: 2rem;
//   max-width: 800px;
//   margin: 0 auto;
//   background-color: #ffffff;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

export const DesktopNavItems = styled(
  ({
    className,
    setShowMenu,
    showMenu,
  }: {
    className?: string;
    setShowMenu: (showMenu: boolean) => void;
    showMenu: boolean | undefined;
  }) => {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const redirectToLogin = useCallback(() => {
      if (router) {
        router.push("/login");
        setShowMenu(!showMenu);
      }
    }, [router, setShowMenu, showMenu]);

    const logoutUser = useCallback(() => {
      logout();
      if (setShowMenu) setShowMenu(false);
    }, [logout, setShowMenu]);

    return (
      <div className={className}>
        {!isAuthenticated ? <></> : <p className="ham-item">Hi There!</p>}
        {!isAuthenticated ? (
          <button className="ham-item" onClick={redirectToLogin}>
            Login
          </button>
        ) : (
          <button className="ham-item" onClick={logoutUser}>
            Logout
          </button>
        )}
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #fff;
  padding: 24px 28px 290px;
  border-radius: 0px 0px 12px 12px;
  width: 380px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
  max-height: ${({ showMenu }) => (showMenu ? "1000px" : "0")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
  overflow: hidden;
  transform: ${({ showMenu }) =>
    showMenu ? "translateY(0)" : "translateY(-100%)"};
  height: ${({ showMenu }) => (showMenu ? "auto" : "0")};
  opacity: ${({ showMenu }) => (showMenu ? "1" : "0")};
  visibility: ${({ showMenu }) => (showMenu ? "visible" : "hidden")};
  pointer-events: ${({ showMenu }) => (showMenu ? "auto" : "none")};
  ${headerSpacing()};

  @media (min-width: 992px) {
    position: fixed;
    top: 0;
    right: 0;
  }

  @media (min-width: 2500px) {
    position: fixed;
    right: 0;
    top: 0;
  }
`;

export const DesktopHamOverlay = styled(
  ({
    className,
    setShowMenu,
    showMenu,
  }: {
    className?: string;
    setShowMenu?: (showMenu: boolean) => void;
    showMenu?: boolean;
  }) => {
    const onButtonClick = useCallback(() => {
      if (setShowMenu) {
        setShowMenu(!showMenu);
      }
    }, [setShowMenu, showMenu]);

    return <button className={className} onClick={onButtonClick} />;
  }
)`
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 0;
  opacity: ${({ showMenu }) => (showMenu ? "1" : "0")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;

  @media (min-width: 992px) {
    width: 300vw;
  }
`;

/**
 * `HamOverlay` is a styled component that renders a full-screen menu overlay for mobile navigation.
 */
export const HamOverlay = styled(
  ({
    className,
    showMenu,
    children,
  }: {
    className?: string;
    showMenu?: boolean;
    children?: React.ReactNode;
  }) => {
    return (
      <div className={className}>
        <div className="group-container" data-showmenu={showMenu}>
          {children}
        </div>
      </div>
    );
  }
)`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 47px;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  @media (min-width: 992px) {
    top: 0;
    display: none;
  }
  .group-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    min-height: 300px;
    max-width: 90vw;
    background: #fff;
    border-radius: 0px 0px 12px 12px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
    transform: ${({ showMenu }) =>
      showMenu ? "translateY(0)" : "translateY(-100%)"};
    opacity: ${({ showMenu }) => (showMenu ? "1" : "0")};
    padding: 24px 28px 290px;
    z-index: 30;
    visibility: ${({ showMenu }) => (showMenu ? "visible" : "hidden")};
    pointer-events: ${({ showMenu }) => (showMenu ? "auto" : "none")};
    @media (min-width: 992px) {
      width: 380px;
      right: 0;
      left: unset;
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
  const pathname = usePathname();
  const { width } = useWindowSize();
  const router = useRouter();

  // State for managing the mobile navigation menu
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showDeskHamMenu, setShowDeskHamMenu] = useState<boolean>(false);

  // Close menus when route changes
  useEffect(() => {
    setShowMobileMenu(false);
    setShowDeskHamMenu(false);
  }, [pathname]);

  // Hide header if the page is in NO_HEADER_FOOTER_PAGES
  if (pathname && NO_HEADER_FOOTER_PAGES.includes(pathname)) {
    return null;
  }

  // const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   // Fetch user status from the API
  //   const fetchUserStatus = async () => {
  //     try {
  //       setLoading(true);

  //       // Example API call to fetch user status
  //       const response = await fetch("/api/user");

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user status");
  //       }

  //       const data = (await response.json()) as UserStatus;
  //       setUserStatus(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Unknown error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserStatus();
  // }, []);

  const OnLogoClick = () => {
    if (router && pathname !== "/") {
      router.push("/");
     
    }
    setShowMobileMenu(false);
  };

  // MobileNavItems: same logic as DesktopNavItems, but styled for mobile drawer
  const MobileNavItems = ({
    setShowMenu,
    showMenu,
  }: {
    setShowMenu: (show: boolean) => void;
    showMenu: boolean;
  }) => {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const redirectToLogin = useCallback(() => {
      if (router) {
        router.push("/login");
        setShowMenu(!showMenu);
      }
    }, [router, setShowMenu, showMenu]);

    const logoutUser = useCallback(() => {
      logout();
      if (setShowMenu) setShowMenu(false);
    }, [logout, setShowMenu]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {isAuthenticated && <p className="ham-item">Hi There!</p>}
        {!isAuthenticated ? (
          <button className="ham-item" onClick={redirectToLogin}>
            Login
          </button>
        ) : (
          <button className="ham-item" onClick={logoutUser}>
            Logout
          </button>
        )}
      </div>
    );
  };

  return (
    <header className={className}>
      <div className="nav-container" id="nav-container">
        <div className="left-pan">
          <button className="image-container" onClick={OnLogoClick}>
            <Image src="/header/company_logo_white.svg" fill alt="stroda-logo" />
          </button>
        </div>
        <div className="right-pan">
          <div className="nav-items">
            {/* <Link href="/dashboard" shallow={true} className="nav-item">
              Dashboard
            </Link> */}
            <BadgeProfileImg
              setShowMenu={setShowDeskHamMenu}
              showMenu={showDeskHamMenu}
            />
            {/* <StatusBadge userStatus={userStatus} /> */}
            {/* <button className="nav-item user-container"></button> */}
          </div>
          {showDeskHamMenu ? (
            <DesktopHamOverlay
              setShowMenu={setShowDeskHamMenu}
              showMenu={showDeskHamMenu}
            />
          ) : null}
        </div>

        {/* Mobile Navigation */}
        {width && width < 992 && !showMobileMenu && (
          <button
            className="hamburger"
            style={{ position: "absolute", top: 13.5, right: 18, zIndex: 1300 }}
            onClick={() => setShowMobileMenu((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
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
        )}
      </div>
      {/* Mobile Side Drawer */}
      {width && width < 992 && showMobileMenu && (
        <>
          <button
            className="hamburger close"
            style={{
              position: "absolute",
              top: 10,
              right: 18,
              zIndex: 35,
              background: "transparent",
              border: "none",
              filter: "invert(1)",
            }}
            onClick={() => setShowMobileMenu(false)}
            aria-label="Close navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 26 26"
              fill="none"
            >
              <line
                x1="2"
                y1="2"
                x2="24"
                y2="24"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="24"
                y1="2"
                x2="2"
                y2="24"
                stroke="black"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="mobile-drawer"
            onClick={() => setShowMobileMenu(false)}
          >
            <div
              className="drawer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <MobileNavItems
                setShowMenu={setShowMobileMenu}
                showMenu={showMobileMenu}
              />
            </div>
          </div>
        </>
      )}
    </header>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // width: 100%;
  background: rgb(0, 0, 0);
  backdrop-filter: blur(10px);
  font-family: var(--font-exo);
  z-index: 30;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.3);
  isolation: isolate;

  @media (min-width: 992px) {
    background: rgb(0, 0, 0);
    border-bottom: none;
    ${sectionResponsivePadding()}
  }

  .nav-container {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    ${maxWidthContainer};
    overflow: hidden;
    padding: 14px 0;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    z-index: 22;
    background: #0e0e0e;

    @media (min-width: 992px) {
      padding: unset;
      margin: 16px 0;
      overflow: unset;
    }

    @media (min-width: 1950px) {
      margin: 23px auto;
    }

    .left-pan {
      display: flex;
      justify-content: center;
      align-items: center;

      .image-container {
        position: relative;
        background: transparent;
        width: 182px;
        height: 16px;
        cursor: pointer;
        border: none;

        @media (min-width: 992px) {
          width: 300px;
          height: 26px;
        }

        img {
          height: 100%;
          width: auto;
          object-fit: cover;
          flex-shrink: 0;
          aspect-ratio: 230.63/22.71;

          @media (min-width: 992px) and (max-width: 1950px) {
            transform: scale(0.85);
          }
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
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 18px;
        font-family: var(--font-fustat);
        align-items: center;
        justify-content: center;

        @media (min-width: 992px) {
          position: unset;
          gap: 51px;
        }

        @media (min-width: 2500px) {
          position: relative;
        }

        .login-nav-btn {
          font-size: 17.5px;
          font-weight: 800;
          font-family: var(--font-fustat);
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;

          @media (max-width: 992px) {
            display: none;
          }

          @media (min-width: 1950px) {
            font-size: 23.5px;
          }
        }

        .nav-item {
          color: rgb(255, 255, 255);
          opacity: 0.65;
          transition: opacity 0.3s ease-in-out;
          cursor: pointer;
          background: none;
          border: none;
          leading-trim: both;
          text-edge: cap;

          font-style: normal;
          font-weight: 800;
          line-height: normal;

          &:hover {
            opacity: 1;
          }

          @media (min-width: 992px) {
            font-size: 22.746px;
          }
        }
      }
    }

    .hamburger {
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
       z-index: 50;
      
      @media (min-width: 992px) {
        display: none;
      }
      &.close {
        background: transparent !important;
        border: none;
         filter: invert(1);
         z-index: 50;
       
      }
    }
  }

  /* Mobile Drawer Styles */
  .mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 20;
    display: flex;
    justify-content: flex-end;
    transition: background 0.3s;
    @media (min-width: 992px) {
      display: none;
    }
    .drawer-content {
      position: relative;
      top: 40px;
      background: #fff;
      width: 100vw;
      height: 100vh;
      box-shadow: -2px 0 16px rgba(0, 0, 0, 0.08);
      border-radius: 0px 0px 12px 12px;
      padding: 32px 24px 32px 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      transform: translateX(0);
      animation: slideInDrawer 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
  @keyframes slideInDrawer {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Shared ham-item styles for both desktop and mobile */
  .ham-item {
    color: #060606;
    font-family: var(--font-fustat);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background: transparent;
    text-align: left;
    opacity: 0.6;
    padding: 16px 0;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
    transition: opacity 0.2s;
  }
  button.ham-item {
    border: none;
    outline: none;
    background: transparent;
    text-align: left;
    width: 100%;
    cursor: pointer;
    opacity: 0.6;
    padding: 16px 0;
    border-bottom: 1px solid #ddd;
    font-family: var(--font-fustat);
    font-size: 18px;
    font-weight: 700;
    transition: opacity 0.2s;
  }
  .ham-item:hover,
  .ham-item:active,
  button.ham-item:hover,
  button.ham-item:active {
    opacity: 1;
  }
`;
