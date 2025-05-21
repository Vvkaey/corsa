"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalUIContext } from "./_utils/hooks/globalUI";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "./_components/new_mixins/mixins";
import { useWindowSize } from "./_utils/hooks/useWindowSize";

const Error404 = styled(({ className }: { className?: string }) => {
  const router = useRouter();
  const GlobalUI = useContext(GlobalUIContext);
  const { width = 1024 } = useWindowSize();

  useEffect(() => {
    if (GlobalUI) {
      GlobalUI.setLiteUI(true);
    }
  }, [GlobalUI]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // alert("clicked");
    router.push("/");
  };

  return (
    <section className={className}>
      <div className="custom-404-container">
        <div className="content">
          <h1 className="head">Oops!</h1>
          <p className="subhead">
            The page you are looking for doesn&apos;t exist or an other error
            occured.
          </p>
          {/* <div className="img-container">
            <Image src={"/dog.png"} alt="not-found-image" fill />
          </div> */}
          <button className="go-back-cta" onClick={handleClick}>
            Go back
          </button>
        </div>
      </div>
      <div className="bg-img-container">
        {width < 992 ? (
          <Image src={"/404_mobile.png"} alt="bg-not-found-image" fill />
        ) : (
          <Image src={"/404.png"} alt="bg-not-found-image" fill />
        )}
      </div>
    </section>
  );
})`
  position: relative;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #000;
  ${sectionResponsivePadding()};
  z-index: 22;

  @media (min-width: 992px) {
    justify-content: unset;
    flex-direction: row;
    padding-top: 208px;
  }

  .bg-img-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.85;

    img {
      position: absolute;
      object-fit: contain;
      object-position: top;
      width: 100%;
      height: auto;
      @media (min-width: 992px) {
        object-position: right;
      }
    }
  }

  .custom-404-container {
    width: 100%;
    height: 40%;

     @media (min-width: 992px) {
       height: 100%;
      }
    .content {
      height: 100%;
      padding: 80px 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      text-align: left;
      ${maxWidthContainer};


      .head {
        font-family: var(--font-exo);
        color: #fff;
        text-align: center;
        leading-trim: both;
        text-edge: cap;
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 139%; /* 50.04px */
        @media (min-width: 992px) {
          font-size: 54px;
          text-align: left;
        }
      }

      .subhead {
        font-family: var(--font-fustat);
        color: #fff;
        text-align: center;
        leading-trim: both;
        text-edge: cap;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 135%; /* 21.6px */
        margin: 0 auto;
        max-width: 28ch;
        @media (min-width: 992px) {
          color: #fff;
          font-size: 24px;
           text-align: left;
           margin: unset;
          max-width: 28ch;
        }
      }

      .img-container {
        position: relative;
        width: 100%;
        height: 600px;
        background: transparent;
        border-radius: 32px;

        img {
          transform: rotate(-84deg);
          position: absolute;
          object-position: center -156px;
          object-fit: contain;
          z-index: 2;
          overflow: visible;
        }

        &:after {
          display: flex;
          justify-content: center;
          align-items: center;
          content: "404";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 772px;
          color: rgba(255, 255, 255, 0.65);
          z-index: 1;
        }
      }

      @keyframes ripple {
        0% {
          opacity: 1;
          transform: scale(0, 0);
        }
        20% {
          opacity: 1;
          transform: scale(25, 25);
        }
        100% {
          opacity: 0;
          transform: scale(40, 40);
        }
      }

      .go-back-cta {
        position: relative;
        border-radius: 8px;
        border: 1.699px solid transparent;
        background: #ff2626;
        padding: 11px 33px;
        color: #fff;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        font-family: var(--font-fustat);
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: fit-content;
        overflow: hidden;
        margin: 20px auto;
        z-index: 2;
        

        &::after {
          content: "";
          position: absolute;
          top: calc(50% - 2.5px + 5px);
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%, -50%);
          transform-origin: 50% 50%;
        }

        &:hover {
          &::after {
            animation: ripple 0.6s ease-out;
          }
        }

        @media (min-width: 992px) {
          margin: 28px 0 0;
          padding: 10px 40px;
          font-size: 16.5px;
          leading-trim: both;
          text-edge: cap;
          will-change: transform, opacity, box-shadow;
          transform: translateZ(0);
        }

        @media (min-width: 1950px) {
          padding: 13px 58px;
          font-size: 23.521px;
        }
      }
    }
  }
`;
export default Error404;
