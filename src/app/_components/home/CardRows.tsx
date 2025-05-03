import styled from "styled-components";
import { maxWidthContainer, sectionResponsivePadding } from "../new_mixins/mixins";

export const Card = styled(({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="quotes">“</div>
      <p className="description">
        Mentoring here has been a rewarding experience. Helping others grow
        while building real connections. Being a mentor on this platform has
        been an incredibly rewarding experience.
      </p>
      <div className="signature">
        <div className="circle" />
        <p className="name">Riddhi Shah</p>
        <p className="handle">IIT DELHI</p>
      </div>
    </div>
  );
})`
  position: relative;
  background: #fff;
  border-radius: 9.2px;
  padding: 55px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 436px;
  flex-shrink: 0;
  font-family: var(--font-fustat);

  @media (min-width: 992px) {
    width: 179px;
    height: 241px;
  }

  .circle {
    position: absolute;
    left: -40px;
    margin-right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #d9d9d9;

    @media (min-width: 992px) {
      width: 31.43px;
      height: 31.43px;
    }
  }

  .quotes {
    position: relative;
    top: 5%;
    color: #a88146;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 136px;
    font-style: normal;
    font-weight: 600;
    line-height: 40%; /* 163.176px */
  }

  .description {
    margin: 0;
    color: #373737;
    font-size: 17.138px;
    font-style: normal;
    font-weight: 600;
    line-height: 141.979%; /* 17.037px */

    @media (min-width: 992px) {
      position: relative;
      bottom: 27px;
      font-size: 12px;
    }
  }

  .signature {
    position: absolute;
    right: 30px;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding-top: 10px;
    bottom: 45px;

    .name {
      margin: 0;
      color: #000;
      font-size: 14px;
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
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 141.979%; /* 8.519px */

      @media (min-width: 992px) {
        font-size: 6px;
      }
    }
  }
`;

const Signature = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;

const DP = styled.div`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  background: #d9d9d9;

  @media (min-width: 992px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1950px) {
    width: 59px;
    height: 59px;
  }
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const FullName = styled.p`
  color: #000;
  font-family: var(--font-fustat);
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%; /* 31.235px */

  @media (min-width: 992px) {
    font-size: 16px;
  }
  @media (min-width: 1950px) {
    font-size: 22px;
  }
`;

const Institute = styled.p`
  color: #5f5f5f;
  font-family: var(--font-fustat);
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%; /* 28.396px */

    @media (min-width: 992px) {
    font-size: 14px;
  }
  @media (min-width: 1950px) {
     font-size: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: center;
  align-items: flex-start;
  margin: 0 30px 0 120px;

  @media (min-width: 992px) {
  margin: 0 0 0 70px;
   gap: 70px;
  }
  @media (min-width: 1950px) {
  margin: 0 30px 0 120px;
   gap: 100px;
}
`;

const Text = styled.div`
  position: relative;
`;

const P = styled.p`
  color: #373737;
  font-family: var(--font-fustat);
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%; /* 34.075px */
  max-width: 40ch;

  @media (min-width: 992px) {
  font-size: 17px;
}

  @media (min-width: 1950px) {
  font-size: 24px;
}
`;
const XLCardContainer = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  padding: 84px 84px 60px 84px;
  border-radius: 14px;
  background: #fff;

  @media (max-width: 992px) {
    display: none;
  }

  @media (min-width: 992px) {
  padding: 59px 73px 46px 55px;
  }

  @media (min-width: 1950px) {
  padding: 84px 84px 60px 84px;
  }
`;

const Quote = styled.div`
  top: -65px;
  left: -130px;
  position: absolute;
  color: #a88146;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 228px;
  font-style: normal;
  font-weight: 600;
  line-height: 119.982%;

  @media (min-width: 992px) {
  font-size: 160px;
  top: -45px;
  left: -90px;

}

@media (min-width: 1950px) {
  font-size: 228px;
  top: -65px;
  left: -130px;
}
`;

const XLCard = () => {
  return (
    <XLCardContainer>
      <Content>
        <Text>
          <P>
            Mentoring here has been a rewarding experience. Helping others grow
            while building real connections. Being a mentor on this platform has
            been an incredibly rewarding experience.
          </P>{" "}
          <Quote>“</Quote>
        </Text>
        <Signature>
          <DP />
          <TextGroup>
            <FullName>Riddhi Shah</FullName>
            <Institute>IIT Delhi</Institute>
          </TextGroup>
        </Signature>
      </Content>
    </XLCardContainer>
  );
};

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
        <XLCard />
        <div className="cards-container">
          <div className="row">
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
  font-family: var(--font-exo);
  overflow: hidden;
  padding: 72px 0 102px 0;

  @media (min-width: 992px) {
    padding: 200px 0;
  }

  .container {
    background: #000;
    display: flex;
    border: 1px solid black;
    margin: auto;
    flex-direction: column;
    gap: 66px;
    ${sectionResponsivePadding()};
    ${maxWidthContainer};

    @media (min-width: 992px) {
      flex-direction: row;
      gap: unset;
      justify-content: space-between;
    }

    .head-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: #000;
      width: 100%;
      gap: 12px;
      // padding-left: 24px;
      @media (min-width: 992px) {
        width: 36%;
        align-items: flex-start;
        gap: 14px;
        // padding-left: unset;
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

         @media (min-width: 1950px) {
          font-size: 65px;
        }
      }

      p.subtitle {
        font-family: var(--font-fustat);
        margin: 0;
        color: #fff;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 141.979%; /* 28.396px */

        @media (min-width: 992px) {
          font-size: 20px;
        }

         @media (min-width: 1950px) {
          font-size: 28px;
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
      width: 100%;
      @media (min-width: 992px) {
        display: none;
      }

      .row {
        display: flex;
        gap: 17.48px;
        position: relative;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
