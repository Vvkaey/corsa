import styled from "styled-components";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { RedSpan } from "../dashboard/styled";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";

const ContactUs = () => {
    const { width } = useWindowSize();
    const isMobile = (width ?? 0) < 768;
  return (
    <ContactUsContainer>
      <ContactUsTitle>
        Not sure which plan is right for you or{" "}
        <RedSpan>got questions?</RedSpan>
      </ContactUsTitle>
      <Divider />
      <ContactUsLineItems>
        <LineItem>
          We&apos;ll help clear things up!  {" "}
          {isMobile ? <br/> :  null}
          <br/>
          <RedSpan>Book a call </RedSpan>{" "}
          
        </LineItem>
      </ContactUsLineItems>
    </ContactUsContainer>
  );
};

export default ContactUs;

const ContactUsContainer = styled.section`
  width: 100%;
  ${sectionResponsivePadding()};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    359deg,
    rgba(255, 238, 205, 0.58) 3.74%,
    #fff 71.5%
  );
   padding-top: 180px;
    padding-bottom: 110px;


  @media (min-width: 992px) {
  margin-top : 40px;
    padding-top: 99px;
    padding-bottom: 250px;
  }

  @media (min-width: 1950px) {
    padding-top: 140px;
  }
`;

const ContactUsTitle = styled.h3`
  ${maxWidthContainer};
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media (min-width: 992px) {
    font-size: 28px;
  }
    @media (min-width: 1950px) {
    font-size: 40px;
  }
`;

const ContactUsLineItems = styled.div`
  ${maxWidthContainer};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media (min-width: 992px) {
    font-size: 24.6px;
  }

   @media (min-width: 1950px) {
    font-size: 35px;
  }
`;

const LineItem = styled.p`
  width: 100%;
  text-align: center;
`;

const Divider = styled.div`
  ${maxWidthContainer};

  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(194, 194, 194, 0.8) 8.87%,
    #000 58.5%,
    rgba(194, 194, 194, 0.8) 86.47%
  );
  margin: 38px 0;

  @media (min-width: 992px) {
    margin: 45px 0;
  }

  @media (min-width: 1950px) {
    margin: 64px 0;
  }
`;
