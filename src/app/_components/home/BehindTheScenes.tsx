import styled from "styled-components";
import Image from "next/image";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";

export const BehindTheScenes = styled(
  ({ className, htmlId }: { className?: string; htmlId?: string }) => {
    const { width } = useWindowSize();
    const isMobile = width && width < 992;

    return (
      <section className={className} id={htmlId}>
        <div className="container">
          <div className="head-container">
            <h2 className="title">
              Behind The <span className="red-block">Scenes</span>
            </h2>
            <p className="subtitle">
              How it all comes together.{isMobile ? <br /> : null} The good and
              the messy.
            </p>
          </div>
          <div className="content-container">
            <div className="img-container">
              <Image src={"/behindScenes.png"} alt={"/behindScenes.png"} fill />
            </div>
            <p className="text-content">
              Ever felt lost, not knowing what to do next? 🤔 You&apos;ve set
              your aim on IIT-JEE or another engineering exam 🎯 but have no
              idea how to crack it, or just trying to figure out how to plan
              things after school.
              <br />
              <br /> We get it. 🙌 <br />
              <br /> It&apos;s tough figuring everything out on your own. The
              late nights wondering if you&apos;re studying the right things
              🌙💭, the stress of falling behind or feeling stuck 😤.
              That&apos;s where the right mentor makes all the difference.
              <br />
              <br /> A mentor isn&apos;t just someone who gives advice.
              They&apos;ve actually been through it. 🛤️ Faced the same chapters,
              the same pressure, made mistakes, and figured out what really
              works.
              <br />
              <br /> They&apos;re here to guide you, share proven strategies,
              and help you move ahead with clarity. 🧭 From knowing what to
              focus on 🪜 to planning everything smartly 🔥
              <br />
              <br />
              Our platform gives you access to the insights, strategies, and
              resources you need to plan better. 📚 And the best part? You can
              connect 1-on-1 with mentors from IITs, NITs, BITS and more
              directly. Ask questions, clear doubts, and get structured
              guidance. 🗣️🤝 Lessss goooooooooo! 🙌 🚀
            </p>
          </div>
        </div>
      </section>
    );
  }
)`
  background: #fff;
  padding: 80px 0;
  font-family: var(--font-exo);
  margin: auto;
  padding-top: 84px;

  @media (min-width: 992px) {
    padding: 96px 0;
    padding-top: 196px;
  }

  .container {
    // width: 100%;
    display: flex;
    flex-direction: column;
    gap: 21px;
    margin: auto;
    ${sectionResponsivePadding()};
    ${maxWidthContainer};

    @media (min-width: 992px) {
      gap: 17px;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: auto;
      text-align: center;

      @media (min-width: 992px) {
        text-align: unset;
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

        @media (min-width: 1950px) {
          font-size: 65px;
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
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 22.717px */
        margin: auto;

        @media (min-width: 992px) {
          width: 100%;
          margin: unset;
        }

         @media (min-width: 1950px) {
            font-size: 24px;
        }
      }
    }

    .content-container {
      display: flex;
      gap: 52px;
      width: 100%;
      flex-direction: column;
      align-items: center;

      @media (min-width: 992px) {
        flex-direction: row;
      }

      .img-container {
        width: 100%;
        flex-shrink: 0;
        position: relative;
        height: 304px;

        @media (min-width: 992px) {
          width: 32%;
          height: 455px;
        }

        @media (min-width: 1950px) {
          width: 35%;
          height: 648px;
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
        font-size: 17.5px;
        font-style: normal;
        font-weight: 500;
        line-height: 142.05%; /* 22.728px */
        margin : 0 8px;
        // border : 1px solid #d4d4d4;

        @media (min-width: 1950px) {
        margin : unset;
            font-size: 25px;
        }
      }
    }
  }
`;
