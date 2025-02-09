import Image from "next/image";
import styled from "styled-components";
import { sectionPadding } from "./styleConstants";

export const QuotationSection = styled(
  ({
    className,
    description,
    author
  }: {
    className?: string;
    description?: string | React.ReactNode;
    author?: string | React.ReactNode;
  }) => {
    return (
      <section className={className}>
        <div className="img-container">
          <Image src={"/quotation/quote.png"} alt="quotation-img" fill />
        </div>
        <div className="content">
          <p className="quote">
            {description}
          </p>
          <p className="author">{author}</p>
        </div>
      </section>
    );
  }
)`
 ${sectionPadding}
  position: relative;
  height: 100vh;
  width: 100%;
  font-family: var(--font-geist-sans);

  .img-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    img {
      position: absolute;
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 17px;
    z-index: 5;
    background: rgba(0, 0, 0, 0.4);

    .quote {
      margin: 0;
      position: relative;
      color: #fff;
      text-align: center;
      font-size: 39px;
      font-style: normal;
      font-weight: 600;
      line-height: 119.982%; /* 46.793px */
      letter-spacing: 0.78px;
      text-transform: uppercase;
    }

    .author {
      margin: 0;
      color: #898989;
      text-align: center;
      font-size: 26px;
      font-style: normal;
      font-weight: 300;
      line-height: 119.982%; /* 31.195px */
      letter-spacing: 0.52px;
      z-index: 2;
    }
  }
`;
