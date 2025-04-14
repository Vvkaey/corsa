

export type MentorSessionType = {
    title: string;
    description: string;
    sessionCount: number;
}

export type AccessPlanType = {
    title: string;
    description: string;
    planIcon: React.JSX.Element | undefined;
}

export type CommunityBadgeType = {
    title: string;
    description: string;
    badge: React.JSX.Element | undefined;
}



export type DashboardMetricsType = {
    mentorSession: MentorSessionType;
    accessPlan: AccessPlanType;
    communityBadge: CommunityBadgeType;
}