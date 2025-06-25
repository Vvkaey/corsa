import Image from "next/image";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { responsivePadding } from "../../new_mixins/mixins";

export enum GridType {
  SOLO = "solo",
  DOUBLE = "double",
}

interface ThankyouScreenProps {
  title: string;
  subtitle: string;
  descriptionTop?: string;
  descriptionBottom?: string;
  ctaGrid: GridType;
  isMentorApplication?: boolean;
}

const ThankyouScreen = ({
  title,
  subtitle,
  descriptionTop,
  descriptionBottom,
  ctaGrid,
  isMentorApplication = false,
}: ThankyouScreenProps) => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [mentorshipUpdateTriggered, setMentorshipUpdateTriggered] = useState(false);
  const router = useRouter();

  const redirect = useCallback(() => {
    if(isMentorApplication){
      router.replace("/");
    }else
    router.replace("/dashboard");
  }, [router, isMentorApplication]);

  // Timer effect
  useEffect(() => {
    if (secondsLeft <= 0) {
      //  redirect();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    // Clean up timer
    return () => clearTimeout(timer);
  }, [secondsLeft, redirect]);

  useEffect(() => {
    if(!window || mentorshipUpdateTriggered) return;
    
    // Add a small delay to ensure payment verification is complete
    // and the backend has processed the payment
    const triggerMentorshipUpdate = () => {
      console.log("🎉 Payment successful! Triggering mentorship update from ThankyouScreen");
      console.log("📊 This will update user status, badge, and subscription state");
      window.dispatchEvent(new Event("mentorship-update"));
      setMentorshipUpdateTriggered(true);
    };

    // Delay the update to ensure backend processing is complete
    const timer = setTimeout(triggerMentorshipUpdate, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [mentorshipUpdateTriggered]);

  return (
    <ThankyouContainer
    style={{
      zIndex : `${isMentorApplication ? "40" : "unset"}`
    }}
    >
      <ThankyouBox>
        <TickContainer>
          <Image src="/payment-success.png" alt="tick" fill />
        </TickContainer>
        <BoxHead>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </BoxHead>
        <BoxDescription>
          <p>{descriptionTop}</p>
          <p>{descriptionBottom}</p>
        </BoxDescription>
        <CTAContainer>
          {ctaGrid === GridType.DOUBLE ? (
            <HomeCTA onClick={redirect}>Dashboard</HomeCTA>
          ) : null}
          {isMentorApplication ? <HomeCTA onClick={redirect}>Home</HomeCTA> : <SecondaryCTA onClick={redirect}>Home</SecondaryCTA>}
        </CTAContainer>
      </ThankyouBox>
      <Note>
        Redirecting in {secondsLeft} seconds. You are being redirected to the
        {isMentorApplication ? " home page" : " dashboard"}.
      </Note>
    </ThankyouContainer>
  );
};

export default ThankyouScreen;

const ThankyouContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  padding-top: 80px;
  gap: 22px;
  ${responsivePadding()}
  transition: all 0.3s ease;


  @media (min-width: 992px) {
    gap: 18px;
  }

  @media (min-width: 1600px) {
    gap: 30px;
  }
    
`;

const ThankyouBox = styled.div`
  border-radius: 17px;
  background: linear-gradient(
    0deg,
    #0e0e0e 0%,
    #0e0e0e 66.46%,
    #9f9d9d 134.59%
  );
  width: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  padding: 56px 20px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  gap: 40px;

   @media (max-width: 380px) {
   padding: 18px 20px 15px;
  }

  @media (min-width: 992px) {
    width: unset;
    padding: 35px 100px;
    gap: 25px;
  }

  @media (min-width: 1600px) {
    width: unset;
    padding: 60px 190px;
    gap: 36px;
  }

   @media (min-width: 1992px) {
    gap: 63px;
  }
`;

const TickContainer = styled.div`
  position: relative;
  height: 105px;
  width: 109px;
  margin-bottom : 23px;: 

  @media (min-width: 992px) {
    height: 170px;
    width: 174px;
      margin: auto;
  }
`;

const BoxHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: var(--font-fustat);
  leading-trim: both;

  h2 {
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 150%;

    @media (min-width: 992px) {
      font-size: 45.77px;
      line-height: 150%;
    }
  }

  p {
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 30.214px; /* 170.312% */

    @media (min-width: 992px) {
      font-size: 26px;
      line-height: 44.281px; /* 170.312% */
    }
  }
`;

const BoxDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: var(--font-fustat);
  color: #c8c8c8;
  leading-trim: both;
  text-edge: cap;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  gap: 12px;

  @media (min-width: 992px) {
    font-size: 22px;
    line-height: 49.638px; /* 225.626% */
  }
`;

const CTAContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  margin-top: 22px;
  width: 70%;

  @media (min-width: 992px) {
    margin-top: unset;
  }
`;

const HomeCTA = styled.button`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14.42px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border-radius: 7.286px;
  border: 1.821px solid #ff2626;
  background: #ff2626;
  width: 100%;
  padding: 9px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (min-width: 992px) {
    padding: 18px 94px;
    font-size: 21.42px;
  }

   @media (min-width: 1600px) {
    padding: 19px 94px;
    font-size: 21.42px;
  }
`;

const SecondaryCTA = styled(HomeCTA)`
  background: transparent;
  color: #fff;
`;

const Note = styled.p`
  color: #4e4e4e;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  line-height: 18px; /* 246.007% */
  max-width: 30ch;

  @media (min-width: 992px) {
    max-width: unset;
    font-size: 18px;
    line-height: 44.281px; /* 170.312% */
  }
`;
