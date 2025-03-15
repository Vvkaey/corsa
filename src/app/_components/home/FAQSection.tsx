import styled from "styled-components";
import { containerSidePadding } from "./styleConstants";
import { CaretUp } from "@/app/_assets/icons";
import { useState } from "react";

interface FaqDataProps {
  ques?: string | React.ReactNode;
  ans?: string | React.ReactNode;
}

const ContentBox = styled(
  ({ className, data }: { className?: string; data?: FaqDataProps }) => {
    const [showDescription, setShowDescription] = useState(false);
    return (
      <div className={className}>
        <button
          className="ques-container"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          <h3 className="ques">{data?.ques}</h3>
          <CaretUp
            style={{
              transform: `rotate(${showDescription ? "0deg" : "180deg"})`,
            }}
          />
        </button>
        <div
          className={
            showDescription ? "description" : "description hide-description"
          }
        >
          {data?.ans}
        </div>
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  width: 95%;

  button.ques-container {
    cursor : pointer;
    text-align: left;
    border: none;
    background: transparent;
    position: relative;
    border-bottom: 1px solid #d4d4d4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 19px 0px;
    background: #fff;
    z-index: 2;

    @media (min-width: 992px) {
      padding: 19px 10px;
      width: 100%;
    }

    .ques {
                  font-family: var(--font-fustat);
      color: #000;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 25.556px */
      margin: 0;

      @media (min-width: 992px) {
        font-size: 20px;
      }
    }

    svg {
      transform: rotate(180deg);
    }
  }

  .description {
                font-family: var(--font-fustat);
    height: unset;
    position: relative;
    color: #000;
    font-size: 16px;
    font-style: normal;
    line-height: 120%; /* 28.396px */
    padding: 19px 0px;
    transition: all 0.5s ease-in;
    opacity: 1;
    top: 0;
    @media (min-width: 992px) {
      padding: 19px 10px;
      width: 100%;
    }
  }

  .hide-description {
    opacity: 0;
    top: -100%;
    height: 0;
    padding: 0;
  }
`;

export const FAQSection = styled(
  ({
    className,
    title,
    data,
  }: {
    className?: string;
    title?: string;
    data?: FaqDataProps[];
  }) => {
    return (
      <section className={className} id="faq-section">
        <div className="faq-container">
          <div className="title-container">
            <h2 className="title">{title}</h2>
          </div>
          <div className="content-container">
            {data?.length
              ? data.map((data, idx) => {
                  return <ContentBox key={idx} data={data} />;
                })
              : null}
          </div>
        </div>
      </section>
    );
  }
)`
  background: #fff;
  position: relative;
  margin: auto;
  font-family: var(--font-geist-sans);
  padding: 40px 0;
  border-bottom-right-radius : 36px;
  border-bottom-left-radius : 36px;

  @media (min-width: 992px) {
    padding: 96px 0;
  }

  .faq-container {
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 29px;
    ${containerSidePadding}

    @media (min-width: 992px) {
      gap: unset;
      max-width: 1500px;
      flex-direction: row;
    }

    .title-container,
    .content-container {
      @media (min-width: 992px) {
        width: 50%;
      }
    }

    .title-container {
      display: flex;

      .title {
        width: 100%;
        color: #000;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
        margin: 0;

        @media (min-width: 992px) {
          width: 95%;
          font-weight: 800;
          font-size: 46px;
        }
      }
    }
    .content-container {
      background: #fff;
    }
  }
`;
