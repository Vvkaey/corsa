"use client";


import { useEffect } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../_contexts/AuthContext";
import VideoLoadingScreen from "../global/loading";

export const AuthProgress = styled(({ className, message = "Authenticating" }: { 
  className?: string;
  message?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading } = useAuth();
  
  useEffect(() => {
    const token = searchParams.get("token");
  
    if (token) {
      // Store token in localStorage
      localStorage.setItem("authToken", token);
  
      // Redirect user to dashboard after a short delay
      const timeout = setTimeout(() => {
        router.push("/");
      }, 1500);
      
      return () => clearTimeout(timeout);
    } else if (!loading) {
      // If no token and not in loading state, set a timeout for redirect
      const timeout = setTimeout(() => {
        router.push("/login");
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [searchParams, router, loading]);

  return (
    <section className={className}>
      <div className="img-container">
        <VideoLoadingScreen videoSrc="/loading.mp4"/>
      </div>
      <div className="progress">
        <h1>
          {loading ? "Verifying authentication" : message}
          <span className="dots" />
        </h1>
        {loading && (
          <div className="loading-indicator">
            <span className="spinner"></span>
          </div>
        )}
      </div>
    </section>
  );
})`
  width: 100vw;
  height: 100vh;
  background: #000;
  font-family: var(--font-exo);
  color: white;
  position: relative;

  .img-container {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    filter: grayscale(0.3);

    &::after {
      z-index: 3;
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      content: "";
      height: 100%;
      width: 50%;
      box-shadow: -25vw 5px 100px 20px inset #000;
    }

    &::before {
      z-index: 3;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: "";
      height: 100%;
      width: 50%;
      box-shadow: 25vw -5px 100px 20px inset #000;
    }

    @media (max-width: 992px) {
      display: none;
    }

    img {
      position: absolute;
      object-fit: contain;
      height: 100%;
      width: auto;
    }
  }

  .progress {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(1.5px);
    background: rgba(0, 0, 0, 0.4);

    h1 {
      font-size: 35px;

      @media (min-width: 992px) {
        font-size: 85px;
        letter-spacing: 5px;
        color: rgba(255, 255, 255, 0.85);
      }
    }
    
    .loading-indicator {
      margin-top: 2rem;
      
      .spinner {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    }

    .dots::after {
      content: "";
      display: inline-block;
      width: 1em;
      text-align: left;
      animation: dots 1.5s steps(3, end) infinite;
    }

    @keyframes dots {
      0% {
        content: "";
      }
      33% {
        content: ".";
      }
      66% {
        content: "..";
      }
      100% {
        content: "...";
      }
    }
  }
`;

export default AuthProgress;