import styled from "styled-components";
import { CaretUp } from "@/app/_assets/icons";
import { useState } from "react";
import { maxWidthContainer, sectionResponsivePadding } from "../new_mixins/mixins";

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
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </button>
        <div className={`description-wrapper ${showDescription ? "open" : ""}`}>
          <div className={"description"}>{data?.ans}</div>
        </div>
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  width: 95%;

  .ques-container {
    overflow: hidden;
  }

  &:last-child {
    .ques-container {
      border-bottom: none;
    }
  }

  button.ques-container {
    cursor: pointer;
    text-align: left;
    border: none;
    background: transparent;
    position: relative;
    border-bottom: 1.35px solid #d4d4d4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26px 0px;
    background: #fff;
    z-index: 2;

    @media (min-width: 992px) {
      padding: 24px 10px;
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
      max-width: 62%;

      @media (min-width: 992px) {
        font-size: 20px;
        max-width: unset;
      }

      @media (min-width: 1950px) {
        font-size: 28.4px;
      }
    }

    svg {
      transform: rotate(180deg);
    }
  }
  .description-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .description-wrapper.open {
    grid-template-rows: 1fr;
  }

  .description {
    overflow: hidden; /* Critical to hide content when collapsed */
    font-family: var(--font-fustat);
    position: relative;
    color: #000;
    font-size: 16px;
    font-style: normal;
    line-height: 120%;
    padding: 0; /* Start with no padding */
    transition: opacity 0.4s ease 0.1s,
      /* Slight delay on opacity */ transform 0.4s ease, padding 0.4s ease;
    transform: translateY(0);
    opacity: 0; /* Start invisible */

    @media (min-width: 992px) {
    font-size: 17px;
      width: 100%;
    }

    @media (min-width: 1950px) {
        font-size: 20px;
      }
  }

  /* Apply styles when open */
  .description-wrapper.open .description {
    padding: 19px 0px; /* Add padding when open */
    opacity: 1;

    @media (min-width: 992px) {
      padding: 19px 10px;
    }
  }

  /* Styles when closed */
  .description-wrapper:not(.open) .description {
    transform: translateY(-10px);

    @media (min-width: 992px) {
      padding-right: 10px; /* No padding when closed */
      padding-left: 10px; /* No padding when closed */
    }
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
  font-family: var(--font-exo);
  padding: 40px 0 142px 0;
  border-bottom-right-radius: 36px;
  border-bottom-left-radius: 36px;

  @media (min-width: 992px) {
    padding: 96px 0;
  }

  .faq-container {
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
    ${sectionResponsivePadding()};
    ${maxWidthContainer};

    @media (min-width: 992px) {
      gap: unset;
      
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

        @media (min-width: 1950px) {
         font-size: 65px;
        }
      }
    }
    .content-container {
      background: #fff;
    }
  }
`;
