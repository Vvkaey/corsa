import styled from "styled-components";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";

const TitleSubtitle = ({
  title,
  subtitle,
  redspan
}: {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  redspan?: string | React.ReactNode;
}) => {
  return (
    <TitleSubtitleContainer>
      <Title>{title}<RedSpan>{redspan}</RedSpan></Title>
      <SubTitle>{subtitle}</SubTitle>
    </TitleSubtitleContainer>
  );
};

export default TitleSubtitle;

const TitleSubtitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  ${maxWidthContainer};
  ${sectionResponsivePadding()};

  @media (min-width: 992px) {  
    gap: 22px;
  }
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-exo);
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  max-width: 90%;

  @media (min-width: 992px) {
  max-width: 70%;
    leading-trim: both;
    text-edge: cap;
    font-size: 96.669px;
  }
`;

const SubTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.979%; /* 22.717px */
   max-width: 90%;
  @media (min-width: 992px) {
  max-width: 58%;
    leading-trim: both;
    text-edge: cap;
    font-size: 28.432px;
  }
`;

const RedSpan = styled.span`
color : #FF2626;
`
