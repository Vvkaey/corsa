import styled from "styled-components";
import { sectionResponsivePadding } from "../new_mixins/mixins";

const SubscriptionStickyCtaSection = styled.section<{ $show: boolean }>`
  width: 100vw;
  height: 70px;
  position: fixed;
  bottom: ${({ $show }) => ($show ? "0" : "-80px")};
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  ${sectionResponsivePadding()};
  transition: bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
  transform-origin: bottom center;
  will-change: bottom, opacity;

  &::before {
    content: "";
    position: absolute;
    bottom: -1px; /* Extend the shadow higher */
    left: 0;
    right: 0;
    width: 100%;
    height: 1px; /* Give the shadow element a height */
    box-shadow: 0 1px 44px 85px rgba(0, 0, 0, 0.78);
  }

  @media (min-width : 992px){
  display : none;
  }
`;

const CTA = styled.button`
  background: #ff2626;
  color: #fff;
  font-family: var(--font-exo);
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  margin: 0 10%;
  width: 100%;
  z-index: 101;
  font-size: 16px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

import { useEffect, useState } from "react";

const SubscriptionStickyCta = ({
  showStickyCta = false,
}: {
  showStickyCta?: boolean;
}) => {
  // Add a slight delay to the animation for a smoother entrance
  const [delayedShow, setDelayedShow] = useState(showStickyCta);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showStickyCta) {
      // Show immediately when true
      setDelayedShow(true);
    } else {
      // Add a small delay when hiding to allow the animation to complete
      timeout = setTimeout(() => {
        setDelayedShow(false);
      }, 50);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showStickyCta]);

  return (
    <SubscriptionStickyCtaSection $show={delayedShow}>
      <CTA>Subscribe Me</CTA>
    </SubscriptionStickyCtaSection>
  );
};

export default SubscriptionStickyCta;
