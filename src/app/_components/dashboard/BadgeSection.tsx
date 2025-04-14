import { useMentorshipContext } from "@/app/_contexts/MentorshipContext";
import {
  BadgeSectionContainer,
  Card,
  CardsContainer,
  CardTitle,
  Count,
  Divider,
  IconContainer,
  MainSection,
  RedSpan,
  Subtitle,
  TagLine,
  Title,
} from "./styled";
import { useEffect } from "react";


export const BadgeSection = () => {
    const {
mentorSession,
    accessPlan,
    communityBadge,
    fetchUserStatus
    } = useMentorshipContext();

useEffect(() => {
    const fetchData = async () => {
        await fetchUserStatus();
    };
    fetchData();
}, [fetchUserStatus]);



  return (
    <BadgeSectionContainer>
      <MainSection>
        <Title>
          Your Space, <RedSpan>Your Stats.</RedSpan> All in One Place
        </Title>
        <Subtitle>
          Every action here is a chance to learn something real, get clarity,
          and make progress.
        </Subtitle>
        <CardsContainer>
          <Card>
            <CardTitle>
            {mentorSession.title}
            </CardTitle>
            <Divider />
            <TagLine>{mentorSession.description}</TagLine>
            <Count>{mentorSession.sessionCount}</Count>
          </Card>
          <Card>
            <CardTitle>
            {accessPlan.title}
            </CardTitle>
            <Divider />
            <TagLine>{accessPlan.description}</TagLine>
            <IconContainer>
                {accessPlan.planIcon}
            </IconContainer>
          </Card>
          <Card>
            <CardTitle>
            {communityBadge.title}
            </CardTitle>
            <Divider />
            <TagLine>{communityBadge.description}</TagLine>
            <IconContainer>
                {communityBadge.badge}
            </IconContainer>
          </Card>
        </CardsContainer>
      </MainSection>
    </BadgeSectionContainer>
  );
};
