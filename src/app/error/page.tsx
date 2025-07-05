"use client";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalUIContext } from "../_utils/hooks/globalUI";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../_components/new_mixins/mixins";
import { useWindowSize } from "../_utils/hooks/useWindowSize";
import Video from "../_components/ui/video";

const ErrorContent = styled(({ className }: { className?: string }) => {
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
          <h1 className="head">
            Sorry, something went wrong.
            <br /> Please try agian after some time.
          </h1>
          <p className="subhead">
            It seems like we are encountering some issues at our side. Please
            try again.
          </p>
          {/* <div className="img-container">
            <Image src={"/dog.png"} alt="not-found-image" fill />
          </div> */}
          <button className="go-back-cta" onClick={handleClick}>
            Refresh
          </button>
        </div>
      </div>
      <div className="bg-img-container">
        {/* {width < 992 ? (
          <Image src={"/error_mobile.png"} alt="bg-not-found-image" fill />
        ) : (
          <Image src={"/error.png"} alt="bg-not-found-image" fill />
        )} */}
      
         <Video
          url={
            width < 992
              ? "/compressed_sorry/Sorry_Mobile.webm"
              : "/compressed_sorry/Sorry_Desktop.webm"
          }
        />
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

  @media (max-width: 991px) {
    padding-bottom: 20px;
  }

  .bg-img-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 80%;
    opacity: 0.85;
    margin-top: 12%;

    @media (min-width: 992px) {
      margin-top: unset;
      width: 70%;
      height: 80%;
    }

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
    height: 50%;
    margin-top: 32%;

    @media (min-width: 992px) {
      height: 100%;
      margin-top: unset;
    }
    .content {
     position: relative;
      height: 100%;
      padding: 80px 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      text-align: left;
      ${maxWidthContainer};
       z-index: 9;

      .head {
        font-family: var(--font-exo);
        color: #fff;
        text-align: center;
        leading-trim: both;
        text-edge: cap;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 139%; /* 50.04px */

        @media (min-width: 992px) {
          font-size: 32px;

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
        margin: 15px auto 0;
        max-width: 28ch;
        @media (min-width: 992px) {
          color: #fff;
          font-size: 24px;
          text-align: left;
          margin: unset;
          max-width: 38ch;
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
        padding: 10px 24px;
        color: #fff;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        line-height: 1.4;
        font-family: var(--font-fustat);
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: fit-content;
        overflow: hidden;
        margin: 42px auto 20px;
        z-index: 2;
        min-height: 44px;
        box-sizing: border-box;

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
          line-height: normal;
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

const ErrorPage = () => {
  return (
    <ErrorContent />
  );
};
export default ErrorPage;
