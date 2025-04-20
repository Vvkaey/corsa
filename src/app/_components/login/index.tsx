import styled from "styled-components";

// import { useState } from "react";
// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import LoginForm from "../auth/LoginForm";
import { GoogleIcon } from "@/app/_assets/icons";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { useState } from "react";
// import Link from "next/link";

const GoogleSignInButton = styled(({ className }: { className?: string }) => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;

  const handleGoogleLogin = () => {
    // Simply redirect to backend's Google auth initiation endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button onClick={handleGoogleLogin} className={className}>
      <GoogleIcon width={isMobile ? 16 : 29} height={isMobile ? 16 : 30} />{" "}
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

  return (
    <section className={className}>
      <div className="root-container">
        <div className="left-panel">
          <div className="logo-container">
            <Image src="/logo-svg.svg" fill alt="corsa-logo" />
          </div>
          <div className="login-block">
            { !isOTPRequested ? <GoogleSignInButton /> : null}
            { !isOTPRequested ? <div className="horizontal-divider"></div> : null}
            <div className="register-block">
              <LoginForm setIsOTPRequested={setIsOTPRequested}/>
            </div>
          </div>
        </div>
        <div className="right-panel">
          {!isMobile ? (
            <div className="bg-img-container-top">
              <Image src={"/login/dotted.png"} alt="dotted-image" fill />
            </div>
          ) : null}
          <div className="bg-img-container-bottom">
            {isMobile ? (
              <Image
                src={"/login/airboard-mobile.png"}
                alt="airboard-image"
                fill
              />
            ) : (
              <Image src={"/login/dotted.png"} alt="dotted-image" fill />
            )}
          </div>
          <div className="text">
            <p>
              CONNECT <span>.</span> EVOLVE <span>.</span> REINVENT
              <span>.</span>
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
          height: 100%;
          font-size: 42.071px;
          line-height: 141.979%; /* 85.287px */
          letter-spacing: -1.201px;
          width: unset;
        }

        @media (min-width: 2000px) {
          font-size: 52px;
        }

        @media (min-width: 3000px) {
          font-size: 68px;
        }
      }

      .bg-img-container-top,
      .bg-img-container-bottom {
        position: absolute;
        width: 100%;
        height: 50%;

        img {
          // border: 1px solid red;
          opacity: 1;
          object-fit: contain;
          width: 100%;
          height: auto;

          @media (min-width: 992px) {
            filter: invert(1);
            object-fit: fill;
            opacity: 0.6;
          }
        }
      }

      .bg-img-container-bottom {
        -webkit-transform: scaleY(-1);
        transform: scaleY(-1);
        bottom: 0;
        top: unset;

        @media (max-width: 992px) {
          height: 100%;
        }
      }
    }
  }
`;

// const [error, setError] = useState<string | null>(null);
// const [isLoading, setIsLoading] = useState(false);

// const router = useRouter();

// const handleGoogleLogin = useGoogleLogin({
//   onSuccess: async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Uncomment this line to redirect to your backend auth endpoint
//       window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
//     } catch (err) {
//       setError("Failed to authenticate with Google");
//       console.error("Google authentication error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   },
//   onError: () => {
//     setError("Google authentication failed");
//   },
// });

// const handleGoogleLogin = useGoogleLogin({
//   onSuccess: async (tokenResponse) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Send the token to your backend
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/verify`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: tokenResponse.access_token }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Store user data/token and redirect
//         localStorage.setItem('token', data.data.token);
//         router.push('/book');
//       } else {
//         setError(data.error.message);
//       }
//     } catch (err) {
//       setError("Failed to authenticate with Google");
//       console.error("Google authentication error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   },
//   onError: () => {
//     setError("Google authentication failed");
//   },
// });
