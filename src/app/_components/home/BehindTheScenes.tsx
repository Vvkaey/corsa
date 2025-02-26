import styled from "styled-components";
import { containerSidePadding } from "./styleConstants";
import Image from "next/image";

export const BehindTheScenes = styled(
  ({ className }: { className?: string }) => {
    return (
      <section className={className}>
        <div className="container">
          <div className="head-container">
            <h2 className="title">
              Behind The <span className="red-block">Scenes</span>
            </h2>
            <p className="subtitle">
              How it all comes together. The good and the messy.
            </p>
          </div>
          <div className="content-container">
            <div className="img-container">
              <Image src={"/behindScenes.png"} alt={"/behindScenes.png"} fill />
            </div>
            <p className="text-content">
              Ever felt lost, not knowing what to do next? 🤔 Maybe you’ve had a
              goal in mind 🎯 but no idea how to reach it.
              <br />
              <br /> We get it. 🙌 <br />
              <br /> It’s hard to figure things out alone, the late nights
              worrying if you’re doing the right thing 🌙💭, the frustration of
              feeling stuck 😤. That’s where having the right mentor changes
              everything.
              <br />
              <br /> A mentor isn’t just someone who gives advice, they’ve been
              where you are. 🛤️ They’ve faced the same struggles, made mistakes,
              and figured out what works. 💡 They’re here to guide you, share
              what they’ve learned, and help you take the right steps. 🧭
              Whether it’s figuring out your next move 🪜 or staying motivated
              🔥
              <br />
              <br /> Having the right mentor at the right time makes all the
              difference. It’s the push you need to stop doubting yourself ❌🤔
              and start confidently moving forward. ✅🚀 It’s about knowing
              someone’s got your back 💪 and wants to see you succeed. 🌟
              <br />
              <br /> So, whether you’re here to get help or give it, you’re in
              the right place. Lessss gooo! 🚀🙌
            </p>
          </div>
        </div>
      </section>
    );
  }
)`
  background: #fff;
    padding : 40px 0;
  font-family: var(--font-geist-sans);
  margin: auto;
  padding-top : 84px;

  @media (min-width : 992px){
      padding : 96px 0;
      padding-top : 196px;
  }

  .container {
    // width: 100%;
    display: flex;
    flex-direction: column;
    gap: 21px;
    max-width: 1500px;
     margin: auto;
         ${containerSidePadding}

    @media (min-width: 992px) {
      gap: 17px;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: auto;
      text-align : center;

      @media (min-width: 992px) {
      text-align : unset;
        gap: 16px;
        margin: unset;
      }

      .title {
        margin: 0;
        color: #000;
        font-size: 26px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;

        @media (min-width: 992px) {
          font-size: 46px;
        }

        .red-block {
          color: #fff;
          background: #ff2626;
        }
      }

      .subtitle {
                  font-family: var(--font-fustat);
        margin: 0;
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 22.717px */
        margin : auto;

        @media (min-width: 992px) {
          width: 100%;
           margin : unset;
        }
      }
    }

    .content-container {
      display: flex;
      gap: 52px;
      width: 100%;
      flex-direction: column;
      align-items : center;

      @media (min-width: 992px) {
        flex-direction: row;
      }

      .img-container {
        width: 100%;
        flex-shrink: 0;
        position: relative;
        height: 304px;

        @media (min-width: 992px) {
          width: 26%;
          height: 304px;
        }

        img {
          width: 100%;
          height: auto;
          position: absolute;
          object-fit: contain;
        }
      }

      .text-content {
                  font-family: var(--font-fustat);
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 142.05%; /* 22.728px */
      }
    }
  }
`;
