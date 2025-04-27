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
}

const ThankyouScreen = ({
  title,
  subtitle,
  descriptionTop,
  descriptionBottom,
  ctaGrid,
}: ThankyouScreenProps) => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const router = useRouter();

  const redirect = useCallback(() => {
    router.replace("/");
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (secondsLeft <= 0) {
      redirect();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    // Clean up timer
    return () => clearTimeout(timer);
  }, [secondsLeft, redirect]);

  useEffect(() => {
    if(!window) return;
    // Trigger mentorship update event when this component mounts
    // This ensures data is refreshed after a successful payment
    window.dispatchEvent(new Event("mentorship-update"));
  }, []);

  return (
    <ThankyouContainer>
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
          <SecondaryCTA onClick={redirect}>Home</SecondaryCTA>
        </CTAContainer>
      </ThankyouBox>
      <Note>
        Redirecting in {secondsLeft} seconds. You are being redirected to the
        homepage
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
  padding: 56px 10px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  gap: 40px;

  @media (min-width: 992px) {
    width: unset;
    padding: 60px 190px;
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
    font-family: --var(--font-exo);
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

  &:hover {
    background: #e61f1f;
    border-color: #e61f1f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 38, 38, 0.25);
  }

  &:active {
    background: #d61919;
    border-color: #d61919;
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(255, 38, 38, 0.25);
  }

  @media (min-width: 992px) {
    padding: 21px 94px;
    font-size: 21.42px;
  }
`;

const SecondaryCTA = styled(HomeCTA)`
  background: transparent;
  color: #ff2626;

  &:hover {
    background: rgba(255, 38, 38, 0.15);
    border-color: #e61f1f;
    color: #e61f1f;
  }

  &:active {
    background: rgba(255, 38, 38, 0.2);
    border-color: #d61919;
    color: #d61919;
  }
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
