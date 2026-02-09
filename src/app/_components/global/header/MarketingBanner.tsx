"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { maxWidthContainer } from "../../new_mixins/mixins";

interface BannerMessage {
  text: string;
  link: string;
}


const bannerMessages: BannerMessage[] = [
  {
    text: "Live session with an IITian + Insight Plan",
    link: "https://app.youform.com/forms/skcvecci",
  },
  {
    text: "Register here 🎯",
    link: "https://app.youform.com/forms/skcvecci",
  },
];

const BannerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #000000;
  color: #ffffff;
  z-index: 40;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  // &:hover {
  //   background: #1a1a1a;
  // }

  @media (max-width: 767px) {
    height: 32px;
    padding: 8px 12px;
  }

  @media (min-width: 992px) {
    padding: 10px 0;
  }
`;

const BannerContent = styled.div`
  ${maxWidthContainer};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  position: relative;
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 992px) {
    font-size: 14px;
  }
`;

const MessageText = styled.span.withConfig({
  shouldForwardProp: (prop: string | number) => prop !== "isVisible",
})<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.5s ease;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  width: 100%;
  max-width: 100%;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 1.4;
  color: #ffffff;

  /* Desktop positioning */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateY(${({ isVisible }) => (isVisible ? 0 : "10px")});

  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 1.2;
    position: static;
    transform: none;
    display: block;
    width: 100%;
    text-align: center;
  }
`;

// const CloseButton = styled.button`
//   position: absolute;
//   right: 16px;
//   top: 50%;
//   transform: translateY(-50%);
//   background: transparent;
//   border: none;
//   color: #ffffff;
//   cursor: pointer;
//   font-size: 18px;
//   opacity: 0.7;
//   transition: opacity 0.2s ease;
//   z-index: 5;

//   &:hover {
//     opacity: 1;
//   }

//   @media (min-width: 992px) {
//     right: 0;
//   }
// `;

export const MarketingBanner = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Transition between messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % bannerMessages.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleBannerClick = () => {
    const currentMessage = bannerMessages[currentMessageIndex];
    window.open(currentMessage.link, '_blank');
  };

  return (
    <BannerContainer onClick={handleBannerClick}>
      <BannerContent>
        <MessageText isVisible={isVisible}>
          {bannerMessages[currentMessageIndex].text}
        </MessageText>
        {/* <CloseButton onClick={handleCloseBanner} aria-label="Close banner">
          ×
        </CloseButton> */}
      </BannerContent>
    </BannerContainer>
  );
};
