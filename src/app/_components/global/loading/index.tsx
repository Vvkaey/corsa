"use client";

import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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

const VideoElement = styled.video`
  width: 100%;
  height: auto;
     object-fit: contain;

  @media (min-width: 992px) {
   width: 60%;
   height: auto;
   object-fit: contain;
  }
`;

const ContentOverlay = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  max-width: 80%;
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
 * VideoLoadingScreen - A loading screen component that plays an MP4 video
 *
 * @param videoSrc - Path to the MP4 video file
 * @param message - Loading message to display (default: "Loading")
 * @param onVideoEnd - Optional callback function when video ends
 * @param loop - Whether to loop the video (default: true)
 * @param className - Optional class name for additional styling
 */
const VideoLoadingScreen: React.FC<VideoLoadingScreenProps> = ({
  videoSrc,
  message = "",
  onVideoEnd,
  loop = true,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Handle video end event
      const handleVideoEnd = () => {
        if (onVideoEnd) {
          onVideoEnd();
        }
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      // Ensure video plays automatically
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.error("Error playing video:", error);
        }
      };

      playVideo();

      // Cleanup function
      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [onVideoEnd]);

  return (
    <VideoLoadingContainer className={className}>
      <VideoElement
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        loop={loop}
      />
      {message ? (
        <ContentOverlay>
          <LoadingMessage>
            {message}
            <LoadingDots />
          </LoadingMessage>
        </ContentOverlay>
      ) : null}
    </VideoLoadingContainer>
  );
};

export default VideoLoadingScreen;
