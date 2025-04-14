"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

enum BADGES {
  WINGMAN = "WINGMAN",
  MARSHALL = "MARSHALL",
  TACTICAL_ACE = "TACTICAL_ACE",
  TOP_GUN = "TOP_GUN",
}

const badge_mapper = {
  0: BADGES.WINGMAN,
  1: BADGES.MARSHALL,
  2: BADGES.TACTICAL_ACE,
  3: BADGES.TOP_GUN,
};

const badge_config = {
  [BADGES.WINGMAN]: {
    mentorSession: {
      title: "Mentor Sessions",
      description: "Track your growth, stay on top",
      sessionCount: 0,
    },
    accessPlan: {
      title: "Access Plan",
      description: "Nothing's live yet, unlock what's next.",
      planIcon: (
        <Image
          src={"/no-access-plan.svg"}
          alt="No access plan icon"
          width={139}
          height={105.5}
        />
      ),
    },
    communityBadge: {
      title: "Community Badge",
      description: "Subscribe to unlock your mission gear!",
      badge: (
        <Image
          src={"/wingsman-badge.svg"}
          alt="Wingsman badge"
          width={119}
          height={91}
        />
      ),
    },
  },
  [BADGES.MARSHALL]: {
    mentorSession: {
      title: "Mentor Sessions",
      description: "Track your growth, stay on top",
      sessionCount: 0,
    },
    accessPlan: {
      title: "Access Plan",
      description: "Watch your inbox for fresh drops.",
      planIcon: (
        <Image
          src={"/insight-access-plan.svg"}
          alt="Insight access plan icon"
          width={139}
          height={105.5}
        />
      ),
    },
    communityBadge: {
      title: "Community Badge",
      description: "Upgrade for full tactical mentorship.",
      badge: (
        <Image
          src={"/marshall-badge.svg"}
          alt="Marshall badge"
          width={119}
          height={91}
        />
      ),
    },
  },
  [BADGES.TACTICAL_ACE]: {
    mentorSession: {
      title: "Mentor Sessions",
      description: "Track your growth, stay on top",
      sessionCount: 5,
    },
    accessPlan: {
      title: "Access Plan",
      description: "Mentorship is live. Ask what matters.",
      planIcon: (
        <Image
          src={"/mentor-access-plan.svg"}
          alt="Mentor access plan icon"
          width={139}
          height={105.5}
        />
      ),
    },
    communityBadge: {
      title: "Community Badge",
      description: "Add intel support for a full-range advantage.",
      badge: (
        <Image
          src={"/tactical-ace-badge.svg"}
          alt="Tactical ace badge"
          width={119}
          height={91}
        />
      ),
    },
  },
  [BADGES.TOP_GUN]: {
    mentorSession: {
      title: "Mentor Sessions",
      description: "Track your growth, stay on top",
      sessionCount: 5,
    },
    accessPlan: {
      title: "Access Plan",
      description: "You're leading the squad with full throttle!",
      planIcon: (
        <Image
          src={"/membership-access-plan.svg"}
          alt="Membership access plan icon"
          width={139}
          height={105.5}
        />
      ),
    },
    communityBadge: {
      title: "Community Badge",
      description: "Everything meaningful starts here.",
      badge: (
        <Image
          src={"/top-gun-badge.svg"}
          alt="Top gun badge"
          width={119}
          height={91}
        />
      ),
    },
  },
};

export interface MentorshipContextType {
  mentorSession: {
    title: string;
    description: string;
    sessionCount: number;
  };
  accessPlan: {
    title: string;
    description: string;
    planIcon: React.JSX.Element | undefined;
  };
  communityBadge: {
    title: string;
    description: string;
    badge: React.JSX.Element | undefined;
  };
  setMentorSession: React.Dispatch<React.SetStateAction<number>>;
  setAccessPlanDescription: React.Dispatch<React.SetStateAction<string>>;
  setAccessPlanIcon: React.Dispatch<
    React.SetStateAction<React.JSX.Element | undefined>
  >;
  setBadgeDescription: React.Dispatch<React.SetStateAction<string>>;
  setBadgeIcon: React.Dispatch<
    React.SetStateAction<React.JSX.Element | undefined>
  >;
  fetchUserStatus: (token?: string) => Promise<void>;
  isLoading: boolean;
}

const initialMentorshipContext: MentorshipContextType = {
  mentorSession: {
    title: "Mentor Sessions",
    description: "Track your growth, stay on top",
    sessionCount: 0,
  },
  accessPlan: {
    title: "Access Plan",
    description: "Nothing's live yet, unlock what's next.",
    planIcon: (
      <Image
        src={"/no-access-plan.svg"}
        alt="No access plan icon"
        width={139}
        height={105.5}
      />
    ),
  },
  communityBadge: {
    title: "Community Badge",
    description: "Subscribe to unlock your mission gear!",
    badge: (
      <Image
        src={"/wingsman-badge.svg"}
        alt="Wingsman badge"
        width={119}
        height={91}
      />
    ),
  },
  setMentorSession: () => undefined,
  setAccessPlanDescription: () => undefined,
  setAccessPlanIcon: () => undefined,
  setBadgeDescription: () => undefined,
  setBadgeIcon: () => undefined,
  fetchUserStatus: async () => undefined,
  isLoading: false,
};

// MentorshipContext
export const MentorshipContext = createContext<MentorshipContextType>(
  initialMentorshipContext
);

// Custom hook for using context
export const useMentorshipContext = () => {
  const context = useContext(MentorshipContext);
  if (!context) {
    throw new Error(
      "useMentorshipContext must be used within a MentorshipProvider"
    );
  }
  return context;
};

// MentorshipProvider
export const MentorshipProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // State for mentorship session
  const [sessionCount, setSessionCount] = useState(0);

  // State for access plan
  const [accessPlanDescription, setAccessPlanDescription] = useState(
    "Nothing's live yet, unlock what's next."
  );
  const [accessPlanIcon, setAccessPlanIcon] = useState<
    React.JSX.Element | undefined
  >(
    <Image
      src={"/no-access-plan.svg"}
      alt="No access plan icon"
      width={139}
      height={105.5}
    />
  );

  // State for community badge
  const [badgeDescription, setBadgeDescription] = useState(
    "Subscribe to unlock your mission gear!"
  );
  const [badgeIcon, setBadgeIcon] = useState<React.JSX.Element | undefined>(
    <Image
      src={"/wingsman-badge.svg"}
      alt="Wingsman badge"
      width={119}
      height={91}
    />
  );

  // Function to fetch user status
  const fetchUserStatus = useCallback(async (authToken?: string) => {
    const currentToken = authToken || token;
    if (!currentToken) return;

    try {
      setIsLoading(true);
      // Use your environment variable for the base URL
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${BASE_URL}/api/users/status`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user status");
      }

      const data = await response.json();

      // Update session count
      if (data.sessions.available !== undefined) {
        setSessionCount(data.sessions.available);
      }

      // Update access plan
      if (data.badge !== undefined) {
        const badge = badge_mapper[data.badge as keyof typeof badge_mapper];
        const config = badge_config[badge];
        setAccessPlanDescription(
          config.accessPlan.description || accessPlanDescription
        );

        // Update access plan icon if provided

        setAccessPlanIcon(config.accessPlan.planIcon || accessPlanIcon);

        // Update community badge
        if (data.subscription && data.subscription.daysRemaining) {
          setBadgeDescription(
            config.communityBadge.description || badgeDescription
          );

          // Update badge icon if provided
          setBadgeIcon(config.communityBadge.badge || badgeIcon);
        }
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, accessPlanDescription, accessPlanIcon, badgeDescription, badgeIcon]);

  // Effect to fetch user status when token changes or component mounts
  useEffect(() => {
    if (token) {
      fetchUserStatus();
    }
  }, [token, fetchUserStatus]);

  const contextValue = {
    mentorSession: {
      title: "Mentor Sessions",
      description: "Track your growth, stay on top",
      sessionCount,
    },
    accessPlan: {
      title: "Access Plan",
      description: accessPlanDescription,
      planIcon: accessPlanIcon,
    },
    communityBadge: {
      title: "Community Badge",
      description: badgeDescription,
      badge: badgeIcon,
    },
    setMentorSession: setSessionCount,
    setAccessPlanDescription,
    setAccessPlanIcon,
    setBadgeDescription,
    setBadgeIcon,
    fetchUserStatus,
    isLoading,
  };

  return (
    <MentorshipContext.Provider value={contextValue}>
      {children}
    </MentorshipContext.Provider>
  );
};
