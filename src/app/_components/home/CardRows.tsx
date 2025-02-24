import styled from "styled-components";

export const Card = styled(({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="circle" />
      <div className="quotes">“</div>
      <p className="description">
        The sessions was so insightful and mentor were kind and knowledgeable
      </p>
      <div className="signature">
        <p className="name">Riddhi Shah</p>
        <p className="handle">@riddhi_S</p>
      </div>
    </div>
  );
})`
  background: #fff;
  border-radius: 9.2px;
  padding: 11.2px 13.36px 24.76px 13.36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 160.369px;
  height: 236px;
  flex-shrink: 0;

  @media (min-width: 992px) {
    width: 179px;
    height: 241px;
  }

  .circle {
    width: 28.43px;
    height: 28.43px;
    border-radius: 50%;
    background: #d9d9d9;


 @media (min-width: 992px) {
   width: 31.43px;
    height: 31.43px;
  }

  }

  .quotes {
    color: #ffd797;
    font-size: 37.063px;
    font-style: normal;
    font-weight: 700;
    line-height: 141.979%; /* 52.622px */
  }

  .description {
    margin: 0;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 141.979%; /* 17.037px */

    @media (min-width: 992px) {
    position : relative;
    bottom : 27px;
      font-size: 12px;
    }
  }

  .signature {
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-self: flex-end;
    padding-top: 10px;

    .name {
      margin: 0;
      color: #000;
      font-size: 10px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 11.358px */

      @media (min-width: 992px) {
        font-size: 8px;
      }
    }

    .handle {
      margin: 0;
      color: #5f5f5f;
      font-size: 8px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 8.519px */

      @media (min-width: 992px) {
        font-size: 6px;
      }
    }
  }
`;

export const CardRows = styled(({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <div className="container">
        <div className="head-container">
          <h2 className="title">High Fives</h2>
          <p className="subtitle">
            What <span className="red-text">keeps us going.</span>
          </p>
        </div>
        <div className="cards-container">
          <div className="row">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="row">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
})`
  background: #000;
  width: 100%;
  position: relative;
  font-family: var(--font-geist-sans);
  overflow: hidden;
  padding: 72px 0;

  @media (min-width: 992px) {
    padding: 82px 0;
  }

  .container {
    background: #000;
    display: flex;
    border: 1px solid black;
    margin: auto;
    max-width: 1500px;
    flex-direction: column;
    gap: 66px;

    @media (min-width: 992px) {
      flex-direction: row;
      gap: unset;
      justify-content: space-between;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #000;
      width: 100%;
      @media (min-width: 992px) {
        width: 36%;
        align-items: flex-start;
      }

      h2.title {
        margin: 0;
        color: #fff;
        font-size: 28px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: capitalize;

        @media (min-width: 992px) {
          font-size: 46px;
        }
      }

      p.subtitle {
        margin: 0;
        color: #fff;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 28.396px */

        @media (min-width: 992px) {
          font-size: 20px;
        }
      }

      .red-text {
        color: #ff2626;
      }
    }

    .cards-container {
      background: #000;
      display: flex;
      flex-direction: column;
      gap: 17.48px;

      .row {
        display: flex;
        gap: 17.48px;
        position: relative;
        flex-wrap: wrap;
        justify-content: center;
        @media (min-width: 992px) {
          flex-wrap: nowrap;
          justify-content: unset;
        }

        &:first-child {
          @media (min-width: 992px) {
            left: 72px;
          }
        }

        &:last-child {
          display: none;

          @media (min-width: 992px) {
            display: flex;
          }
        }
      }
    }
  }
`;
