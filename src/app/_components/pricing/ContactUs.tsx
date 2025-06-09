import styled from "styled-components";
import {
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { RedSpan } from "../dashboard/styled";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { ArrowRightWhite } from "@/app/_assets/icons";
import { TypeformSnippet } from "../global/TypeformSnippet";
import { useContext } from "react";
import { ModalContext } from "../global/Modal";
import CalendlyEmbed from "../book/CalendlyEmbed";

export const ApplyMembershipTFModal = styled(
  ({
    className,
    trackingParams,
  }: {
    className?: string;
    trackingParams?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
  }) => {
    return (
      <div className={className}>
        <TypeformSnippet
          typeformId="A5udDxOR"
          frameTitle="Apply for Ultrawork"
          className="typeform-container"
          trackingParams={trackingParams}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    );
  },
)`
  height: 100%;
  width: 100%;

  .typeform-container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #ffffff;
  }
`;

const ContactUs = () => {
  const { width } = useWindowSize();
  const isMobile = (width ?? 0) < 992;
      const ModalClient = useContext(ModalContext);

  // Calendly will be initiated once Book a call is clicked
  const onBookCallClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    ModalClient.set(
      <CalendlyEmbed url="https://calendly.com/vivek-strodaclub/30min" />
    );
    ModalClient.setCloseButtonTheme('light');
    ModalClient.show();
  };


  return (
    <ContactUsContainer>
      <ContactUsTitle>
        Not sure which plan is right for you or{" "}
        <RedSpan>got questions?</RedSpan>
      </ContactUsTitle>
      <Divider />
      <ContactUsLineItems>
        <LineItem>
          We&apos;ll help clear things up! {isMobile ? <br /> : null}
          <br />
          <FlatButton onClick={onBookCallClick}>
            <RedSpan>Book a call </RedSpan>
            <ArrowRightWhite
              fill="#FF2626"
              width={isMobile ? 25 : (width ?? 0) > 1950 ? 35 : 27.5}
              height={isMobile ? 14 : (width ?? 0) > 1950 ? 19.6 : 15.4}
            />
          </FlatButton>{" "}
          
        </LineItem>
      </ContactUsLineItems>
    </ContactUsContainer>
  );
};

export default ContactUs;


const FlatButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-bottom: 1px solid #000;
  padding: 1px 7.5px 3px 4px;

  @media (min-width: 992px) {
    font-size: 24.6px;
    padding: 2px 15px 5px 10px;
  }

  @media (min-width: 1950px) {
    font-size: 35px;
  }
`;

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
    margin-top: 40px;
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

