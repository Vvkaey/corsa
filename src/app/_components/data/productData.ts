
export type BenefitProps = { id: number; text: string }


export type CheckoutPlanProps = {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  benefits: BenefitProps[];
  buttonText: string;
  productType: string;
  subscribedCta?: string;
  addOnCTa?: string;
};

export type PricingDataProps = {
  title: string;
  subtitle: string;
  plans: CheckoutPlanProps[];
}


export const pricingData = {
  title: "Get straight to the ",
  subtitle:
    "Your next big move starts here. Subscribe to our yearly plan and learn from the best.",
  plans: [
    {
      id: 1,
      name: "Insight Access Plan",
      price: 1299,
      period: "Year",
      description: "Curated insights and exclusive benefits",
      benefits: [
        { id: 1, text: "Weekly Wraps" },
        { id: 2, text: "Mock Assessments" },
        { id: 3, text: "AMA Sessions" },
      ],
      buttonText: "Subscribe Insight",
      subscribedCta: "Insight Subscribed",
      addOnCTa: "Add On Insight",
      productType: "newsletter_subscription"

    },
    {
      id: 2,
      name: "Mentor Access Plan",
      price: 2499,
      period: "Year",
      description: "Advanced features for growing businesses",
      benefits: [
        { id: 1, text: "One-on-one mentor session" },
        { id: 2, text: "Mentor feedback after each session" },
        { id: 3, text: "Priority Query Support" },
        { id: 4, text: "Extended Session Access" },
      ],
      buttonText: "Subscribe Mentor",
      subscribedCta: "Mentor Subscribed",
      addOnCTa: "Add On Mentor",
      productType: "session_pack"

    },
    {
      id: 3,
      name: "Membership Access Plan",
      price: 3499,
      period: "Year",
      description: "Everything you need for large organizations",
      benefits: [
        { id: 1, text: "Weekly Wraps" },
        { id: 2, text: "Mock Assessments" },
        { id: 3, text: "AMA Sessions" },
        { id: 4, text: "One-on-one mentor session" },
        { id: 5, text: "Mentor feedback after each session" },
        { id: 6, text: "Priority Query Support" },
        { id: 7, text: "Extended Session Access" },
      ],
      buttonText: "Subscribe Membership",
      subscribedCta: "Membership Subscribed",
      addOnCTa: "",
      productType: "combo_pack"

    },
  ],
} satisfies PricingDataProps;

export type ComparisonPropertyValueProps = {
  id: string;
  value: string | boolean;
};


export type ComparisonDataProps = {
  title: string;
  id: number;
  price?: string;
  cta?: string;
  redirection?: string;
  insider_pass: ComparisonPropertyValueProps;
  community_spotlights: ComparisonPropertyValueProps;
  one_on_one_session: ComparisonPropertyValueProps;
  mentor_feedback: ComparisonPropertyValueProps;
  weekly_wraps: ComparisonPropertyValueProps;
  mock_assessments: ComparisonPropertyValueProps;
  ama_sessions: ComparisonPropertyValueProps;
  priority_queue_support: ComparisonPropertyValueProps;
  extended_session_access: ComparisonPropertyValueProps;
  access_to_events: ComparisonPropertyValueProps;
  member_benefits: ComparisonPropertyValueProps;
  leaderboard_events: ComparisonPropertyValueProps;
  content_library: ComparisonPropertyValueProps;
  exclusive_merch_access: ComparisonPropertyValueProps;
};





export const COMPARISON_DATA = [
  {
    title: "Insight Access",
    id: 0,
    price: "₹ 1,299",
    cta: "Subscribe",
    redirection: "",
    insider_pass: {
      id: "insider_pass",
      value: true,
    },
    community_spotlights: {
      id: "community_spotlights",
      value: true,
    },
    one_on_one_session: {
      id: "one_on_one_session",
      value: "0",
    },
    mentor_feedback: {
      id: "mentor_feedback",
      value: false,
    },
    weekly_wraps: {
      id: "weekly_wraps",
      value: true,
    },
    mock_assessments: {
      id: "mock_assessments",
      value: true,
    },
    ama_sessions: {
      id: "ama_sessions",
      value: true,
    },
    priority_queue_support: {
      id: "priority_queue_support",
      value: false,
    },
    extended_session_access: {
      id: "extended_session_access",
      value: false,
    },
    access_to_events: {
      id: "access_to_events",
      value: true,
    },
    member_benefits: {
      id: "member_benefits",
      value: true,
    },
    leaderboard_events: {
      id: "leaderboard_events",
      value: true,
    },
    content_library: {
      id: "content_library",
      value: true,
    },
    exclusive_merch_access: {
      id: "exclusive_merch_access",
      value: true,
    },
  },
  {
    title: "Mentor Access",
    id: 1,
    price: "₹ 2,499",
    cta: "Subscribe",
    redirection: "",
    insider_pass: {
      id: "insider_pass",
      value: true,
    },
    community_spotlights: {
      id: "community_spotlights",
      value: true,
    },
    one_on_one_session: {
      id: "one_on_one_session",
      value: "5",
    },
    mentor_feedback: {
      id: "mentor_feedback",
      value: true,
    },
    weekly_wraps: {
      id: "weekly_wraps",
      value: false,
    },
    mock_assessments: {
      id: "mock_assessments",
      value: true,
    },
    ama_sessions: {
      id: "ama_sessions",
      value: false,
    },
    priority_queue_support: {
      id: "priority_queue_support",
      value: true,
    },
    extended_session_access: {
      id: "extended_session_access",
      value: true,
    },
    access_to_events: {
      id: "access_to_events",
      value: false,
    },
    member_benefits: {
      id: "member_benefits",
      value: true,
    },
    leaderboard_events: {
      id: "leaderboard_events",
      value: true,
    },
    content_library: {
      id: "content_library",
      value: false,
    },
    exclusive_merch_access: {
      id: "exclusive_merch_access",
      value: true,
    },
  },
  {
    title: "Membership Access",
    id: 2,
    price: "₹ 3,199",
    cta: "Subscribe",
    redirection: "",
    insider_pass: {
      id: "insider_pass",
      value: true,
    },
    community_spotlights: {
      id: "community_spotlights",
      value: true,
    },
    one_on_one_session: {
      id: "one_on_one_session",
      value: "5",
    },
    mentor_feedback: {
      id: "mentor_feedback",
      value: true,
    },
    weekly_wraps: {
      id: "weekly_wraps",
      value: true,
    },
    mock_assessments: {
      id: "mock_assessments",
      value: true,
    },
    ama_sessions: {
      id: "ama_sessions",
      value: true,
    },
    priority_queue_support: {
      id: "priority_queue_support",
      value: true,
    },
    extended_session_access: {
      id: "extended_session_access",
      value: true,
    },
    access_to_events: {
      id: "access_to_events",
      value: true,
    },
    member_benefits: {
      id: "member_benefits",
      value: true,
    },
    leaderboard_events: {
      id: "leaderboard_events",
      value: true,
    },
    content_library: {
      id: "content_library",
      value: true,
    },
    exclusive_merch_access: {
      id: "exclusive_merch_access",
      value: true,
    },
  },
] satisfies Array<ComparisonDataProps>;

export const PropertyMapper = {
  insider_pass: {
    title: "Insider Pass",
    subtitle: "Curated insights and exclusive benefits.",
  },
  community_spotlights: {
    title: "Community Spotlights",
    subtitle:
      "Get featured for your achievements and milestones on our weekly wraps.",
  },
  one_on_one_session: {
    title: "1-on-1 mentor sessions",
    subtitle:
      "Connect directly one-on-one with IITians and mentors from top institutes for guidance and strategic exam preparation.",
  },
  mentor_feedback: {
    title: "Mentor feedback",
    subtitle:
      "Receive detailed, actionable feedback tailored to your progress and areas for improvement after each session over your email.",
  },
  weekly_wraps: {
    title: "Weekly Wraps",
    subtitle:
      "Receive detailed, actionable feedback tailored to your progress and areas for improvement after each session over your email.",
  },
  mock_assessments: {
    title: "Mock Assessments",
    subtitle:
      "Take monthly mentor-curated practice tests to assess readiness and identify improvement areas.",
  },
  ama_sessions: {
    title: "AMA Sessions",
    subtitle:
      "Participate in live group sessions with elite mentors for in-depth discussion.",
  },
  priority_queue_support: {
    title: "Priority Query Support",
    subtitle:
      "Get priority access to our support team for urgent queries or issues, ensuring swift resolutions.",
  },
  extended_session_access: {
    title: "Extended Session Access",
    subtitle:
      "Opt for additional 1:1 sessions on a pay-per-session basis, allowing you to dive deeper into specific topics or challenges.",
  },
  access_to_events: {
    title: "Access to Events",
    subtitle: "Join monthly events focused on learning exam strategies.",
  },
  member_benefits: {
    title: "Member Benefits",
    subtitle:
      "Access special offers on tools, courses, and exclusive discounts to enhance your preparation.",
  },
  leaderboard_events: {
    title: "Leaderboard Rewards",
    subtitle: "Track your performance, compete, and earn rewards.",
  },
  content_library: {
    title: "Content Library",
    subtitle:
      "Unlock a curated collection of resources, notes, and expert guides.",
  },
  exclusive_merch_access: {
    title: "Access Exclusive Community Merchandise",
    subtitle:
      "Get access to merchandise designed exclusively for our community members.",
  },
};