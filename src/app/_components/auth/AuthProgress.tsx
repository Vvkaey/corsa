"use client";

import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";

export const AuthProgress = styled(({ className }: { className?: string }) => {

    const router = useRouter();
    const searchParams = useSearchParams(); // Replaces router.query
  
    useEffect(() => {
      const token = searchParams.get("token"); // Get token from URL query params
  
      if (token) {
        // Store token in localStorage or cookies
        localStorage.setItem("token", token);
  
        // Redirect user to dashboard
        router.push("/book");
      }else {
        // If no token, redirect 
        const timeout = setTimeout(() => {
          router.push("/book");
        }, 10000); 
  
        // Cleanup timeout when component unmounts or token appears
        return () => clearTimeout(timeout);
      }
    }, [searchParams, router]);





  return (
    <section className={className}>
      <div className="img-container">
        <Image src="/authbg.jpg" alt="auth-bg" fill />
      </div>
      <div className="progress">
        <h1>
          Authenticating
          <span className="dots" />
        </h1>
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


    &::after{
    z-index : 3;
        position : absolute;
        top : 0;
        right : 0;
        display : block;
        content : "";
        height : 100%;
        width : 50%;
        box-shadow:  -25vw 5px 100px 20px inset #000;
        }

         &::before{
          z-index : 3;
        position : absolute;
        top : 0;
        left : 0;
        display : block;
        content : "";
        height : 100%;
         width : 50%;
         box-shadow:  25vw -5px 100px 20px inset #000;
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
    justify-content: center;
    align-items: center;
     backdrop-filter: blur(1.5px);
    background: rgba(0, 0, 0, 0.4);

    h1 {
      font-size: 35px;

      @media (min-width: 992px) {
       font-size: 85px;
       letter-spacing : 5px;
       color : rgba(255, 255, 255, 0.85)
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
