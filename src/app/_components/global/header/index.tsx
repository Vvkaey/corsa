"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import Image from "next/image";
// import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState, useCallback } from "react";
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

    const redirectToDashboard = useCallback(() => {
      const href = isAuthenticated
        ? "/dashboard"
        : "/login?redirect=/dashboard";

      if (router) {
        router.push(href);
        if (setShowMenu) setShowMenu(false);
      }
    }, [router, setShowMenu, isAuthenticated]);

    const logoutUser = useCallback(() => {
      logout();
      if (setShowMenu) setShowMenu(false);
    }, [logout, setShowMenu]);

    return (
      <div className={className}>
        <button className="ham-item" onClick={redirectToDashboard}>
          Dashboard
        </button>
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
  position: absolute;
  right: -50%;
  top: 0;
  z-index: ${(props) => (props.showMenu ? "20" : "-1")};
  max-height: ${({ showMenu }) => (showMenu ? "1000px" : "0")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
  overflow: hidden;
  transform: ${({ showMenu }) =>
    showMenu ? "translateY(0)" : "translateY(70%)"};
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
    position: absolute;
    right: -50%;
    top: -23px;
  }

  button.ham-item {
    color: #060606;
    font-family: var(--font-fustat);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background: transparent;
    text-align: left;
    opacity: 0.6;
    border: none;
    cursor: pointer;
    padding: 16px 0;
    border-bottom: 1px solid #ddd;

    &:hover,
    &:active {
      opacity: 1;
    }
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
        // alert("DesktopHam Clicked ")

        setShowMenu(!showMenu);
      }
    }, [setShowMenu, showMenu]);

    return <button className={className} onClick={onButtonClick} />;
  }
)`
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 50px;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 8;
  opacity: ${({ showMenu }) => (showMenu ? "1" : "0")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 992px) {
    top: 0;
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
    setShowMenu,
  }: {
    className?: string;
    showMenu?: boolean;
    setShowMenu?: (showMenu: boolean) => void;
  }) => {
    const router = useRouter();
    console.log("HamOverlay", showMenu);
    const { isAuthenticated, logout } = useAuth();

    const redirectToLogin = useCallback(() => {
      if (router) {
        router.push("/login");
        if (!setShowMenu) return;
        setShowMenu(false);
      }
    }, [router, setShowMenu]);

    const redirectToDashboard = useCallback(() => {
      const href = isAuthenticated
        ? "/dashboard"
        : "/login?redirect=/dashboard";
      if (router) {
        router.push(href);
        if (setShowMenu) setShowMenu(false);
      }
    }, [router, setShowMenu, isAuthenticated]);

    const logoutUser = useCallback(() => {
      logout();
      router.push("/");
    }, [logout, router]);

    const onButtonClick = useCallback(() => {
      if (setShowMenu) {
        setShowMenu(!showMenu);
      }
    }, [setShowMenu, showMenu]);

    return (
      <div className={className} onClick={onButtonClick}>
        <div className="group-container">
          <button className="ham-item" onClick={redirectToDashboard}>
            Dashboard
          </button>
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
      </div>
    );
  }
)`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 47px;
  left: 0;
  height: 100vh;

  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 11;

  @media (min-width: 992px) {
    top: 0;
    display: none;
  }

  .group-container {
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    background: #fff;
    padding: 24px 28px 290px;
    border-radius: 0px 0px 12px 12px;

    z-index: ${({ showMenu }) => (showMenu ? "20" : "-1")};
    max-height: ${({ showMenu }) => (showMenu ? "1000px" : "0")};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: top;
    overflow: hidden;
    transform: ${({ showMenu }) =>
      showMenu ? "translateY(0)" : "translateY(70%)"};
    height: ${({ showMenu }) => (showMenu ? "auto" : "0")};
    opacity: ${({ showMenu }) => (showMenu ? "1" : "0")};
    visibility: ${({ showMenu }) => (showMenu ? "visible" : "hidden")};
    pointer-events: ${({ showMenu }) => (showMenu ? "auto" : "none")};

    @media (min-width: 992px) {
      width: 380px;
      position: absolute;
      right: 0;
    }

    button.ham-item {
      color: #060606;
      font-family: var(--font-fustat);
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      background: transparent;
      text-align: left;
      opacity: 0.6;
      border: none;
      cursor: pointer;
      padding: 16px 0;
      border-bottom: 1px solid #ddd;

      &:hover,
      &:active {
        opacity: 1;
      }
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
  const router = useRouter();

  // State for managing the mobile navigation menu
  const [showHamMenu, setShowHamMenu] = useState<boolean>(false);
  const [showDeskHamMenu, setShowDeskHamMenu] = useState<boolean>(false);
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

  /**
   * Toggles the visibility of the mobile menu.
   */
  const handleHamClick = useCallback(() => {
    setShowHamMenu((prev) => !prev);
  }, []);

  // const StatusBadge = styled(Badge)`
  //   margin-left: auto;
  // `;

  // Hide header if liteUI is enabled or the page is in the NO_HEADER_FOOTER_PAGES list
  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;

  // if (loading) {
  //   return (
  //     <ProfileContainer>
  //       <div>Loading user profile...</div>
  //     </ProfileContainer>
  //   );
  // }

  // if (error) {
  //   return (
  //     <ProfileContainer>
  //       <div>Error: {error}</div>
  //     </ProfileContainer>
  //   );
  // }

  // if (!userStatus) {
  //   return (
  //     <ProfileContainer>
  //       <div>No user data available</div>
  //     </ProfileContainer>
  //   );
  // }

  const OnLogoClick = () => {
    if (router && pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <header className={className}>
      <div className="nav-container">
        <div className="left-pan">
          <button className="image-container" onClick={OnLogoClick}>
            <Image src="/header/company_logo_white.svg" fill alt="corsa-logo" />
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
        {width && width < 992 && (
          <button
            className="hamburger"
            onClick={handleHamClick}
            aria-label="Toggle navigation menu"
          >
            {!showHamMenu ? (
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
        )}
      </div>
      {showHamMenu && (
        <HamOverlay showMenu={showHamMenu} setShowMenu={setShowHamMenu} />
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
  z-index: 10;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.3);
  ${sectionResponsivePadding()}

  @media (min-width: 992px) {
    background: rgb(0, 0, 0);
    border-bottom: none;
  }

  .nav-container {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    ${maxWidthContainer};
    overflow: hidden;
    padding: 14px 0;

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
    }
  }
`;
