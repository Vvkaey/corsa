"use client";

import React from "react";
import styled from "styled-components";
import Video from "../../ui/video";


interface VideoLoadingScreenProps {
  videoSrc: string;
  message?: string;
  onVideoEnd?: () => void;
  loop?: boolean;
  className?: string;
}

const VideoLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 9999;
  overflow: hidden;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (min-width: 992px) {
    width: 25%;
    height: auto;
  }

  /* Override the Video component's absolute positioning for loading screen */
  & > div {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
  }
  
  /* Target the ReactPlayer inside */
  & .react-player__preview,
  & video {
    object-fit: contain !important;
  }
`;

const ContentOverlay = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  max-width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: var(--font-exo, sans-serif);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LoadingDots = styled.span`
  display: inline-block;

  &::after {
    content: "";
    animation: dots 1.5s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      content: "";
    }
    40% {
      content: ".";
    }
    60% {
      content: "..";
    }
    80%,
    100% {
      content: "...";
    }
  }
`;

/**
 * VideoLoadingScreen - A loading screen component that uses the Video component
 *
 * @param videoSrc - Path to the MP4 video file
 * @param message - Loading message to display (default: "")
 * @param onVideoEnd - Optional callback function when video ends (Note: Video component doesn't support this)
 * @param loop - Whether to loop the video (default: true) - Video component already loops by default
 * @param className - Optional class name for additional styling
 */
const VideoLoadingScreen: React.FC<VideoLoadingScreenProps> = ({
  videoSrc,
  message = "",
  className,
}) => {
  // Note: The Video component doesn't expose onEnded callback
  // If you need this functionality, you might need to modify the Video component

  return (
    <VideoLoadingContainer className={className}>
      <VideoWrapper>
        <Video url={videoSrc} />
      </VideoWrapper>
      {message && (
        <ContentOverlay>
          <LoadingMessage>
            {message}
            <LoadingDots />
          </LoadingMessage>
        </ContentOverlay>
      )}
    </VideoLoadingContainer>
  );
};

export default VideoLoadingScreen;