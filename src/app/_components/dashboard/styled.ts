import styled from "styled-components";
import { sectionResponsivePadding } from "../new_mixins/mixins";
// import { sectionResponsivePadding } from "../new_mixins/mixins";

export const BadgeSectionContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #9f9d9d 3.35%, #0e0e0e 50.52%, #0e0e0e 143.11%);
  @media (min-width: 992px) {
    background: url("/2078.svg") center center fixed;
    background-size: cover;
  }  
`;

export const MainSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 1500px;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  align-items: center;

  padding: 65px 117px 100px;
  ${sectionResponsivePadding()};
  z-index: 1;
  @media (min-width: 992px) {
    background: linear-gradient(0deg, #9f9d9d 3.35%, #0e0e0e 50.52%, #0e0e0e 143.11%);
      box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.25);
    gap: 17px;
  }  
`;

export const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-exo);
  font-size: 25.7px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  max-width: 18ch;

  @media (min-width: 992px) {
    font-size: 40px;
    max-width: unset;
  }
`;

export const Subtitle = styled.p`
  color: #c7c7c7;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  max-width: 35ch;

  @media (min-width: 992px) {
    font-size: 23px;
    max-width: unset;
  }
`;

export const RedSpan = styled.span`
  color: #ff2626;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
  padding: 35px 0;
  margin-top: 5px;
  width: 100%;

  @media (min-width: 992px) {
    margin-top: 17px;
    flex-direction: row;
    width: unset;
      gap: 48px;
  }
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.9) 31.5%,
    rgba(131, 131, 131, 0.9) 85%
  );
  padding: 0 15px;
  height: 92px;
  width: 100%;
  z-index: 2;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 992px) {
    height: 367px;
    width: 297px;
    align-items: center;
    justify-content: unset;
    padding: 32px 15px;
    flex-wrap: unset;
  }
`;

export const CardTitle = styled.div`
  color: #000;
  width: 60%;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 14.9px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (min-width: 992px) {
    text-align: center;
    font-size: 21px;
    width: unset;
  }
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
  width: 60%;
  color: #000;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 6px;


  @media (min-width: 992px) {
    text-align: center;
    font-size: 20px;
    width: 70%;
    max-width: unset;
    padding-top: unset;
  }
`;

export const Count = styled.p`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
 
  @media (min-width: 992px) {
    display: unset;
    font-size: 64.16px;
    height: unset;
    text-align: unset;
    margin-top: 48px;
    font-weight: 800;
  }
`;

export const IconContainer = styled.div`
  margin-top: 48px;

  @media (max-width: 992px) {
    margin-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    @media (max-width: 992px) {
      object-fit: contain;
      width: auto;
      height: 62px;
    }
  }
`;