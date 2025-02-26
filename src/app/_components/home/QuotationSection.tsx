import Image from "next/image";
import styled from "styled-components";
export const QuotationSection = styled(
  ({
    className,
    description,
    author,
  }: {
    className?: string;
    description?: string | React.ReactNode;
    author?: string | React.ReactNode;
  }) => {
    return (
      <section className={className}>
        <div className="img-container">
          <Image src={"/quotation/q_vid.gif"} alt="quotation-img" fill priority={true}/>
        </div>
        <div className="content">
          <p className="quote">{description}</p>
          <p className="author">{author}</p>
        </div>
      </section>
    );
  }
)`
  margin: 100px 0;
  position: relative;
  height: 100vh;
  width: 100%;
  font-family: var(--font-geist-sans);

  margin: 70px 0;

  @media (min-width: 992px) {
    margin: 100px 0;
  }

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
    gap: 130px;
    z-index: 5;
    background: rgba(0, 0, 0, 0.4);
    @media (min-width: 992px) {
      gap: 14px;
    }
    .quote {
      width: 90%;
      margin: 0;
      position: relative;
      color: #fff;
      text-align: center;
      font-size: 28px;
      font-style: normal;
      font-weight: 600;
      line-height: 119.982%; /* 46.793px */
      text-transform: uppercase;
      letter-spacing: 0.56px;
      @media (min-width: 992px) {
        font-size: 32.5px;
        letter-spacing: 0.78px;
      }
    }
    .author {
      margin: 0;
      color: #898989;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: 119.982%; /* 31.195px */
      letter-spacing: 0.32px;
      z-index: 2;
      @media (min-width: 992px) {
        font-size: 21.6px;
        letter-spacing: 0.52px;
      }
    }
  }
`;
