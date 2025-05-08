import styled from "styled-components";

// import { useState } from "react";
// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import LoginForm from "../auth/LoginForm";
import { GoogleIcon } from "@/app/_assets/icons";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/_utils/hooks/useAuth";
// import Link from "next/link";

const GoogleSignInButton = styled(({ className }: { className?: string }) => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;
  // const searchParams = useSearchParams();

  // Get the redirect path from the URL (same as used in your login component)
  // const redirectPath = searchParams.get("redirect") || "/";

  const handleGoogleLogin = () => {
    // Append the redirect parameter to your Google auth URL
    // const redirectUrl = encodeURIComponent(redirectPath);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button onClick={handleGoogleLogin} className={className}>
      <GoogleIcon
        width={isMobile ? 16 : (width ?? 0) > 1950 ? 29 : 20}
        height={isMobile ? 16 : (width ?? 0) > 1950 ? 29 : 20}
      />{" "}
      Continue with google
    </button>
  );
})`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 35px;
  border-radius: 8px;
  border: 2px solid #e6e6e6;
  background: transparent;
  color: #fff;
  cursor: pointer;
  gap: 10px;
  color: #fff;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-items: center;

  @media (min-width: 992px) {
    padding: 12px 26px;
    font-size: 16px;
  }

  @media (min-width: 1950px) {
    padding: 15px 35px;
    font-size: 22.754px;
  }

  &:hover {
    box-shadow: 0 0 5px 1px #fff;
  }

  &:focus {
    outline: none;
    box-shadow: 2px #fff;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }

  .content {
    display: flex;
    font-size: 20px;
    justify-content: center;
    align-items: center;

    .img-container {
      position: relative;
      width: 35px;
      height: 35px;
      margin-right: 14px;

      img {
        object-fit: contain;
        aspect-ratio: 377/384;
      }
    }
  }
`;

export const LoginSection = styled(({ className }: { className?: string }) => {
  // const router = useRouter();
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // Get the redirect path from search params
  const redirectPath = searchParams.get("redirect") || "/";

  // If already authenticated, redirect to intended destination
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, redirectPath, router, loading]);

  return (
    <section className={className}>
      <div className="root-container">
        <div className="left-panel">
          <div className="logo-container">
            <Image src="/header/company_logo_white.svg" fill alt="corsa-logo" />
          </div>
          <div className="login-block">
            {!isOTPRequested ? <GoogleSignInButton /> : null}
            {!isOTPRequested ? (
              <div className="horizontal-divider"></div>
            ) : null}
            <div className="register-block">
              <LoginForm setIsOTPRequested={setIsOTPRequested} />
            </div>
          </div>
        </div>
        <div className="right-panel">
          {/* {!isMobile ? (
            <div className="bg-img-container-top">
              <Image src={"/login/dotted.png"} alt="dotted-image" fill />
            </div>
          ) : null} */}
          <div className="bg-img-container">
            {isMobile ? (
              <Image
                src={"/login/airboard-mobile.png"}
                alt="airboard-image"
                fill
              />
            ) : (
              <Image
                src={"/login/airboard_login.png"}
                alt="dotted-image"
                fill
              />
            )}
          </div>
          <div className="text">
            <p>
              CONNECT <span>.</span> EVOLVE <span>.</span> REINVENT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
})`
  background: yellow;
  position: relative;
  width: 100%;
  background: #fff;

  .root-container {
    position: relative;
    background: #000;
    font-family: var(--font-exo);
    display: flex;
    flex-direction: column-reverse;
    height: 100vh;
    overflow: hidden;

    @media (min-width: 992px) {
      flex-direction: row;
    }

    .left-panel,
    .right-panel {
      width: 100%;
      height: 64%;

      @media (min-width: 992px) {
        width: 50%;
        height: 100%;
      }
    }

    .left-panel {
      padding: 10px 30px;
      display: flex;
      flex-direction: column;

      @media (min-width: 992px) {
        padding: 100px 150px;
        justify-content: center;
      }

      .logo-container {
        position: relative;
        width: 70%;
        margin: 0 15%;
        height: 100px;
        margin-bottom: 20px @media (min-width: 992px) {
          margin-bottom: 40px;
        }

        img {
          object-fit: contain;
          width: auto;
          height: 100%;
        }
      }

      .login-block {
        display: flex;
        flex-direction: column;
        gap: 30px;

        @media (min-width: 992px) {
          gap: 55px;
        }

        .horizontal-divider {
          position: relative;
          width: 100%;
          height: 1.5px;
          background: rgb(91, 90, 90);
          border-radius: 8px;

          &::after {
            position: absolute;
            top: -21px;
            left: calc(50% - 38px);
            content: "or";
            font-size: 22px;
            background: #000;
            padding: 5px 30px;
            color: #fff;

            @media (min-width: 992px) {
              top: -18px;
            }
          }
        }

        .register-block {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 18px;

          .email,
          .continue,
          .continue-btn {
            width: 100%;
          }

          .email,
          .continue {
            padding: 18px 32px;
            border: 2px solid #fff;
            border-radius: 16px;
            background: transparent;
            font-size: 20px;
          }

          .continue {
            background: #fff;
            color: #000;
            cursor: pointer;
          }
        }
      }
    }

    .right-panel {
      position: relative;
      @media (max-width: 992px) {
        height: 36%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text {
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-family: var(--font-fustat);
        font-size: 21.2px;
        font-style: normal;
        font-weight: 800;
        line-height: 141.979%; /* 85.287px */
        letter-spacing: -0.42px;
        text-transform: uppercase;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.4) 0%,
          rgba(0, 0, 0, 0.8) 50%,
          rgba(0, 0, 0, 0.4) 100%
        );
        z-index: 1;
        width: 100%;

        span {
          color: red;
        }

        @media (min-width: 992px) {
          position: relative;
          height: 100%;
          font-size: 42.071px;
          line-height: 141.979%; /* 85.287px */
          letter-spacing: -1.201px;
          width: unset;
          color: #fff;
          z-index: 10;
          background: transparent;
        }

        @media (min-width: 2000px) {
          font-size: 52px;
        }

        @media (min-width: 3000px) {
          font-size: 68px;
        }
      }

      // .bg-img-container-top,
      .bg-img-container {
        position: absolute;
        width: 100%;
        height: 50%;

        @media (min-width: 992px) {
          height: 100%;
          // display: none;
          z-index: 0;
          // width: 70vw;
        }

        img {
          opacity: 1;
          object-fit: contain;
          width: 100%;
          height: auto;
          z-index: 0;

          @media (min-width: 992px) {
            position: absolute;
            object-fit: cover;
            height: 100vh;
            width: auto;
          }
        }
      }

      .bg-img-container {
        bottom: 0;
        top: unset;

        @media (max-width: 992px) {
          height: 100%;
          -webkit-transform: scaleY(-1);
          transform: scaleY(-1);
        }
      }
    }
  }
`;
