// Badge.tsx
import React from "react";
import styled from "styled-components";
import { UserStatus } from "../../../_types/user_status.types";
import Image from "next/image";

/**
 * Badge types enumeration
 * 3: Premium - User has both active sessions and an active subscription
 * 2: Subscriber - User has only an active subscription
 * 1: Basic - User has only active sessions
 * 0: Free - User has neither active sessions nor an active subscription
 */
export enum BadgeType {
  FREE = 0,
  BASIC = 1,
  SUBSCRIBER = 2,
  PREMIUM = 3,
}

/**
 * Badge configuration based on badge type
 */
interface BadgeConfig {
  label: string;
  color: string;
  background: string;
  image?: string;
}

/**
 * Badge configuration mapping
 */
const BADGE_CONFIG: Record<BadgeType, BadgeConfig> = {
  [BadgeType.FREE]: {
    label: "Free",
    color: "#6B7280",
    background: "#F3F4F6",
    image: "",
  },
  [BadgeType.BASIC]: {
    label: "Basic",
    color: "#1E40AF",
    background: "#DBEAFE",
    image: "/header/user.svg",
  },
  [BadgeType.SUBSCRIBER]: {
    label: "Subscriber",
    color: "#047857",
    background: "#D1FAE5",
    image: "/header/user.svg",
  },
  [BadgeType.PREMIUM]: {
    label: "Premium",
    color: "#9F1239",
    background: "#FEE2E2",
    image: "/header/user.svg",
  },
};

/**
 * Styled badge component
 */
const BadgeContainer = styled.div<{ config: BadgeConfig }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) => props.config.color};
  background-color: ${(props) => props.config.background};
`;

const BadgeProfileImgContainer = styled.div<{ config: BadgeConfig }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  filter: invert(0.5);
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: invert(0);
  }

  img {
    filter: invert(1);
  }
`;

/**
 * Determine the badge type based on user status
 * @param userStatus The user status object
 * @returns The appropriate badge type
 */
const determineBadgeType = (userStatus: UserStatus): BadgeType => {
  //   const hasActiveSessions = userStatus.sessions.available > 0;
  //   const hasActiveSubscription = userStatus.subscription.active;

  const badgeType = userStatus.badge;

  switch (badgeType) {
    case 3:
      return BadgeType.PREMIUM;
    case 2:
      return BadgeType.SUBSCRIBER;
    case 1:
      return BadgeType.BASIC;
    case 0:
      return BadgeType.FREE;
    default:
      return BadgeType.FREE;
  }
};

interface BadgeProps {
  userStatus: UserStatus;
  className?: string;
}

/**
 * Badge component that displays user status
 * @param userStatus The user status object
 * @param className Optional className for styling
 */
export const Badge: React.FC<BadgeProps> = ({ userStatus, className }) => {
  // Determine the badge type based on the user status
  const badgeType = determineBadgeType(userStatus);

  // Get the corresponding badge configuration
  const config = BADGE_CONFIG[badgeType];

  return (
    <BadgeContainer className={className} config={config}>
      {config.label}
    </BadgeContainer>
  );
};

export const BadgeProfileImg: React.FC<BadgeProps> = ({
  userStatus,
  className,
}) => {
  // Determine the badge type based on the user status
  const badgeType = determineBadgeType(userStatus);

  // Get the corresponding badge configuration
  const config = BADGE_CONFIG[badgeType];

  return (
    <BadgeProfileImgContainer className={className} config={config}>
      {config.image && (
        <Image
          src={config.image}
          alt={config.label}
          fill
          style={{ borderRadius: "50%" }}
        />
      )}
    </BadgeProfileImgContainer>
  );
};
