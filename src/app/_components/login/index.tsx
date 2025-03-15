import styled from "styled-components";

// import { useState } from "react";
// import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoginForm from "../auth/LoginForm";
import Link from "next/link";

const GoogleSignInButton = styled(({ className }: { className?: string }) => {
  console.log(process.env.NEXT_PUBLIC_API_URL);

  const handleGoogleLogin = () => {
    // Simply redirect to backend's Google auth initiation endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button onClick={handleGoogleLogin} className={className}>
      Sign in with Google
    </button>
  );
})`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 32px;
  border: 2px solid #fff;
  border-radius: 16px;
  background: transparent;
  color: #fff;
  cursor: pointer;

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
  const router = useRouter();
  return (
    <section className={className}>
      <div className="root-container">
        <div className="left-panel">
          <div className="logo-container">
            <Image src="/footer/corsaFooter.svg" fill alt="corsa-logo" />
          </div>
          <div className="login-block">
            <GoogleSignInButton />
            <div className="horizontal-divider"></div>
            <div className="register-block">
              <input
                type="email"
                className="email"
                placeholder="Enter email address"
              />
              <button className="continue" onClick={() => router.push("/book")}>
                Continue
              </button>
            </div>
          </div>
          <LoginForm />
          <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </p>
        </div>
        </div>
        <div className="right-panel">
          <div className="bg-img-container-top">
            <Image src={"/login/dotted.png"} alt="dotted-image" fill />
          </div>
          <div className="bg-img-container-bottom">
            <Image src={"/login/dotted.png"} alt="dotted-image" fill />
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
    font-family: var(--font-geist-sans);
    display: flex;
    height: 100vh;
    overflow: hidden;

    .left-panel,
    .right-panel {
      width: 50%;
      height: 100%;
    }

    .left-panel {
      padding: 100px 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .logo-container {
        position: relative;
        width: 100%;
        height: 40px;
        margin-bottom: 40px;

        img {
          object-fit: contain;
          width: auto;
          height: 100%;
        }
      }

      .login-block {
        display: flex;
        flex-direction: column;
        gap: 55px;

        .horizontal-divider {
          position: relative;
          width: 100%;
          height: 1.5px;
          background: rgb(91, 90, 90);
          border-radius: 8px;

          &::after {
            position: absolute;
            top: -18px;
            left: calc(50% - 38px);
            content: "or";
            font-size: 22px;
            background: #000;
            padding: 5px 30px;
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
      .text {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 52px;
        span {
          color: red;
        }
      }

      .bg-img-container-top,
      .bg-img-container-bottom {
        position: absolute;
        width: 100%;
        height: 50%;

        img {
          opacity: 0.6;
          filter: invert(1);
          object-fit: fill;
          width: 100%;
          height: auto;
        }
      }

      .bg-img-container-bottom {
        top: 0;
      }

      .bg-img-container-bottom {
        -webkit-transform: scaleY(-1);
        transform: scaleY(-1);
        bottom: 0;
        top: unset;
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
