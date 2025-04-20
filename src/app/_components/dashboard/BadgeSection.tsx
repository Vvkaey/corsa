"use client";

import { useMentorshipContext } from "@/app/_contexts/MentorshipContext";
import { useAuth } from "@/app/_contexts/AuthContext";
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
import styled from "styled-components";
import VideoLoadingScreen from "../global/loading";


const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  pointer-events: none;
`

export const BadgeSection = () => {
  const {
    mentorSession,
    accessPlan,
    communityBadge,
    fetchUserStatus,
    isLoading
  } = useMentorshipContext();
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Only fetch if the user is authenticated
    if (isAuthenticated) {
      console.log("Fetching user status from BadgeSection");
      fetchUserStatus();
    }
  }, [isAuthenticated, fetchUserStatus]);

  return (
    <BadgeSectionContainer>
      {isLoading && (
        <LoadingOverlay>
          <VideoLoadingScreen
            videoSrc="/loading.mp4"
            
            loop={true} />
          {/* <LoadingSpinner /> */}
          {/* <p>Loading your stats...</p> */}
        </LoadingOverlay>
      )}
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