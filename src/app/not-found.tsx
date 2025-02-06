"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalUIContext } from "./_utils/hooks/globalUI";


const Error404 = styled(({ className }: { className?: string }) => {
  const router = useRouter();
  const GlobalUI = useContext(GlobalUIContext);


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
          <p className="subhead">Look like you&apos;re lost in space</p>
          <div className="img-container">
            <Image src={"/dog.png"} alt="not-found-image" fill />
          </div>
          <button className="go-back-cta" onClick={handleClick}>
            Go back
          </button>
        </div>
      </div>
      <div className="bg-img-container">
        <Image src={"/sky.png"} alt="bg-not-found-image" fill />
      </div>
    </section>
  );
})`
  position: relative;
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-top: 48px;
  font-size: 42px;

  .bg-img-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.75;

    img {
      position: absolute;
      object-fit: contain;
      width: 100%;
      height: auto;
    }
  }

  .custom-404-container {
    width: 100%;
    height: 100%;

    .content {
      padding: 80px 100px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;

      .subhead {
        font-size: 34px;
        letter-spacing: 12px;
        text-align: center;
        width: 100%;
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

      .go-back-cta {
        position: relative;
        padding: 30px 66px;
        font-size: 48px;
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: rgba(226, 223, 223, 0.43);
        background: transparent;
        box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.6);
        cursor: pointer;
        z-index: 5;
        filter: invert(0.35);
        &:hover {
          filter: invert(0);
        }
      }
    }
  }
`;
export default Error404;
