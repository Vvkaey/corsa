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
import { useAuth } from "../_contexts/AuthContext"; // Import the auth context

export enum BADGES {
  WINGMAN = "WINGMAN",
  MARSHALL = "MARSHALL",
  TACTICAL_ACE = "TACTICAL_ACE",
  TOP_GUN = "TOP_GUN",
}

export const badge_mapper = {
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
    subscription: false,
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
  // Other badge configurations remain unchanged
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
    subscription: true,
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
    subscription: true,
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
    subscription: true,
    accessPlan: {
      title: "Access Plan",
      description: "Everything meaningful starts here.",
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
      description: "You're leading the squad with full throttle!",
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
  subscription: boolean;
  setSubscription: React.Dispatch<React.SetStateAction<boolean>>;
  setMentorSession: React.Dispatch<React.SetStateAction<number>>;
  badge: BADGES;
  setBadge: React.Dispatch<React.SetStateAction<BADGES>>;
  setAccessPlanDescription: React.Dispatch<React.SetStateAction<string>>;
  setAccessPlanIcon: React.Dispatch<
    React.SetStateAction<React.JSX.Element | undefined>
  >;
  setBadgeDescription: React.Dispatch<React.SetStateAction<string>>;
  setBadgeIcon: React.Dispatch<
    React.SetStateAction<React.JSX.Element | undefined>
  >;
  fetchUserStatus: () => Promise<void>;
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
  subscription: false,
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
  badge: BADGES.WINGMAN,
  setBadge: () => undefined,
  setSubscription: () => undefined,
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
export const MentorshipProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Use the auth context to get the token
  const { token, isAuthenticated } = useAuth();
  
  // State for mentorship session
  const [sessionCount, setSessionCount] = useState(0);

  // State for access plan
  const [accessPlanDescription, setAccessPlanDescription] = useState(
    "Nothing's live yet, unlock what's next."
  );
  const [subscription, setSubscription] = useState(false);
  const [badge, setBadge] = useState<BADGES>(BADGES.WINGMAN);
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
  const fetchUserStatus = useCallback(async () => {
    if (!token || !isAuthenticated) {
      console.log("Not authenticated or token missing, skipping fetchUserStatus");
      
      // Set default values for non-authenticated users
      setSessionCount(0);
      setAccessPlanDescription("Nothing's live yet, unlock what's next.");
      setAccessPlanIcon(
        <Image
          src={"/no-access-plan.svg"}
          alt="No access plan icon"
          width={139}
          height={105.5}
        />
      );
      setBadgeDescription("Subscribe to unlock your mission gear!");
      setBadge(BADGES.WINGMAN)
      setBadgeIcon(
        <Image
          src={"/wingsman-badge.svg"}
          alt="Wingsman badge"
          width={119}
          height={91}
        />
      );
      
      setIsLoading(false);
      return;
    }
  
    try {
      setIsLoading(true);
  
      const response = await fetch(`/api/user/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user status");
      }
  
      const data = await response.json();
      console.log("User status data:", data);
  
      // Update session count
      if (data.sessions?.available !== undefined) {
        setSessionCount(data.sessions.available);
      }
  
      // Update access plan and badge only if we have valid data
      if (data.badge !== undefined) {
        const badge = badge_mapper[data.badge as keyof typeof badge_mapper] || BADGES.WINGMAN;
        const config = badge_config[badge];
        setBadge(badge || BADGES.WINGMAN);
        
        // Use the config values or fall back to defaults
        setAccessPlanDescription(
          config?.accessPlan?.description ||
            "Nothing's live yet, unlock what's next."
        );
  
        setAccessPlanIcon(
          config?.accessPlan?.planIcon || (
            <Image
              src={"/no-access-plan.svg"}
              alt="No access plan icon"
              width={139}
              height={105.5}
            />
          )
        );
        setSubscription(config?.subscription || false);
  
        setBadgeDescription(
          config?.communityBadge?.description ||
            "Subscribe to unlock your mission gear!"
        );
  
        setBadgeIcon(
          config?.communityBadge?.badge || (
            <Image
              src={"/wingsman-badge.svg"}
              alt="Wingsman badge"
              width={119}
              height={91}
            />
          )
        );
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      
      // Set default values on error
      setSessionCount(0);
      setAccessPlanDescription("Nothing's live yet, unlock what's next.");
      setAccessPlanIcon(
        <Image
          src={"/no-access-plan.svg"}
          alt="No access plan icon"
          width={139}
          height={105.5}
        />
      );
      setBadgeDescription("Subscribe to unlock your mission gear!");
      setBadgeIcon(
        <Image
          src={"/wingsman-badge.svg"}
          alt="Wingsman badge"
          width={119}
          height={91}
        />
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, isAuthenticated]);

  // Effect to fetch user status when token changes or component mounts
  useEffect(() => {
    if (token && isAuthenticated) {
      console.log(
        "Automatically fetching user status because token is available"
      );
      fetchUserStatus();
    }
  }, [token, isAuthenticated, fetchUserStatus]);

    // Listen for custom mentorship-update events (triggered after checkout/purchase)
    useEffect(() => {
      const handleMentorshipUpdate = () => {
        console.log("Mentorship update event received - fetching latest data");
        fetchUserStatus();
      };
  
      // Add event listener for custom event
      window.addEventListener("mentorship-update", handleMentorshipUpdate);
  
      // Cleanup on unmount
      return () => {
        window.removeEventListener("mentorship-update", handleMentorshipUpdate);
      };
    }, [fetchUserStatus]);
  

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
    subscription,
    setSubscription,
    setMentorSession: setSessionCount,
    setAccessPlanDescription,
    setAccessPlanIcon,
    setBadgeDescription,
    setBadgeIcon,
    badge,
    setBadge,
    fetchUserStatus,
    isLoading,
  };

  return (
    <MentorshipContext.Provider value={contextValue}>
      {children}
    </MentorshipContext.Provider>
  );
};
