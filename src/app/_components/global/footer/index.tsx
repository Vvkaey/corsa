"use client"; // Ensures the component runs only on the client-side

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants"; // List of pages where the footer should be hidden
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI"; // Context for global UI settings
import Image from "next/image"; // Optimized image handling in Next.js
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Hook to get the current page pathname
import { useContext } from "react"; // Hook to access React context
import styled from "styled-components"; // Allows for modular CSS using Styled Components

export const Footer = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext); // Access global UI settings
  const pathname = usePathname(); // Get the current route
  const router = useRouter();

  // Hide footer if lite mode is enabled or if the page is in NO_HEADER_FOOTER_PAGES
  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;

  const onApplyMentorClick = () => {
     if(router){
      router.push("/apply-for-mentor");
     }
  }

  return (
    <div className={className}>
      <div className="container">
        {/* Main content area of the footer */}
        <div className="content">
          {/* Left section with greeting and CTA button */}
          <div className="left-block">
            <p className="cheers">Cheers!</p>
            <div className="cta-container">
              <button className="primary-button" onClick={onApplyMentorClick} >Apply as mentor</button>
            </div>
          </div>

          {/* Right section with contact info and legal links */}
          <div className="right-block">
            <div className="contact-container">
              <p className="tagline">Reach out to us!</p>
              <p className="email">connect@corsaclub.io</p>
            </div>
            <div className="tnc-container">
              <Link  href={"/privacy-policy"} className="privacy-policy">Privacy policy</Link>
              <Link  href={"/terms-and-conditions"} className="tnc">Terms of service</Link>
            </div>
          </div>
        </div>

        {/* Copyright text */}
        <p className="copyright">© 2025 CorsaClub</p>

        {/* Footer logo */}
        <div className="logo-container">
          <Image src="/footer/corsaFooter.svg" fill alt="corsa-logo" />
        </div>
      </div>
    </div>
  );
})`
  /* Footer styling */
  width: 100vw;
  background: rgb(0, 0, 0);

  .container {
    max-width: 1500px;
    margin: auto;
    backdrop-filter: blur(10px); /* Glassmorphism effect */
    font-family: var(--font-exo);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 21px;

    @media (min-width: 992px) {
      gap: 50px;
      margin: 0px 120px;
    }

    @media (min-width: 1600px) {
      margin: 0px auto;
    }

    @media (min-width: 1800px) {
      gap: 72px;
      margin: 30px auto;
    }

    /* Copyright text */
    .copyright {
      color: #fff;
      font-size: 16px;
      font-weight: 800;
      padding: 0 24px;
      font-family: var(--font-fustat);

      @media (min-width: 992px) {
        font-size: 18px;
        padding: 0 60px 0 0;
      }

      @media (min-width: 1800px) {
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
      }

      /* Left block: greeting and CTA */
      .left-block {
        padding: 59px 24px 44px;

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

          @media (min-width: 1800px) {
            font-size: 45.491px;
          }
        }

        /* CTA button */
        .cta-container {
          padding-top: 24px;
          font-family: var(--font-fustat);

          @media (min-width: 992px) {
            padding-top: 48px;
          }

          @media (min-width: 1800px) {
            padding-top: 74.5px;
          }

          .primary-button {
            border-radius: 8px;
            border: 0.635px solid #ffeac8;
            color: #fff;
            font-size: 14px;
            font-weight: 800;
            background: none;
            padding: 9px 40px;
            width: 100%;
            cursor: pointer;
            white-space: nowrap;

            @media (min-width: 992px) {
              border-radius: 11.673px;
              border: 0.834px solid #ffeac8;
              font-size: 18px;
              max-width: 347px;
              padding: 10.8px 50px;
              transition: all 5ms ease-in;

              /* Button hover effect */
              &:hover {
                background: rgb(31, 31, 31);
                box-shadow: 0 0 7px 1px #ffeac8;
              }
            }

            @media (min-width: 1800px) {
              font-size: 25.589px;
            }
          }
        }
      }

      /* Right block: Contact & Legal Links */
      .right-block {
        display: flex;
        justify-content: space-between;
        font-family: var(--font-fustat);
        padding: 0 24px;

        @media (min-width: 992px) {
          padding: 68px 0px 0px 60px;
          gap: 92px;
          width: 50%;
          justify-content: flex-end;
        }

        /* Contact Info */
        .contact-container {
          display: flex;
          flex-direction: column;
          gap: 5px;

          @media (min-width: 1800px) {
            gap: 22px;
          }

          .tagline {
            color: #fff;
            font-size: 16px;
            font-weight: 800;

            @media (min-width: 992px) {
              font-size: 18px;
            }

            @media (min-width: 1800px) {
              font-size: 25.589px;
            }
          }

          .email {
            color: #c1c1c1;
            font-size: 16px;
            font-weight: 500;

            @media (min-width: 992px) {
              font-size: 18px;
            }

            @media (min-width: 1800px) {
              font-size: 25.589px;
            }
          }
        }

        /* Privacy & Terms */
        .tnc-container {
          display: flex;
          flex-direction: column;
          gap: 5px;

          @media (min-width: 1800px) {
            gap: 22px;
          }

          .privacy-policy,
          .tnc {
            color: #fff;
            font-size: 16px;
            font-weight: 800;

            @media (min-width: 992px) {
              font-size: 18px;
            }

            @media (min-width: 1800px) {
              font-size: 25.589px;
            }
          }
        }
      }
    }

    /* Logo styling */
    .logo-container {
      position: relative;
      width: 90%;
      height: 180px;
      margin: auto;

      @media (min-width: 992px) {
        height: 200px;
        width: 100%;
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
