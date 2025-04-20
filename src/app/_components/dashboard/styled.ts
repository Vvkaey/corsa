import styled from "styled-components";

export const BadgeSectionContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("/2078.svg") center center fixed;
`;

export const MainSection = styled.section`
position: relative;
  width: 100%;
  max-width: 1500px;
  border-radius: 17px;
  background: linear-gradient(
    0deg,
    #9f9d9d 3.35%,
    #0e0e0e 50.52%,
    #0e0e0e 143.11%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 17px;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.25);
  padding: 65px 117px 100px;
  z-index: 1;
`;

export const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-exo);
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Subtitle = styled.p`
  color: #c7c7c7;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 23px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const RedSpan = styled.span`
  color: #ff2626;
`;

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 35px 0;
  margin-top: 17px;
`;

export const Card = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.9) 31.5%,
    rgba(131, 131, 131, 0.9) 85%
  );
  padding: 32px 15px;
  height: 367px;
  width: 297px;
  z-index: 2;
`;

export const CardTitle = styled.div`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const Divider = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 38, 38, 0) 0%,
    #cc1e1e 48.97%,
    rgba(153, 23, 23, 0) 100%
  );
  height: 1px;
  width: 100%;
  margin: 24px 0 17px 0;
`;

export const TagLine = styled.p`
  color: #000;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-width: 14ch;
`;

export const Count = styled.p`
color: #000;
leading-trim: both;
text-edge: cap;
  font-family: var(--font-exo);
font-size: 64.16px;
font-style: normal;
font-weight: 800;
line-height: normal;
margin-top : 48px;
`

export const IconContainer = styled.div`
margin-top : 48px;
`