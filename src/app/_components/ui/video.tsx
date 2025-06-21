"use client";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import dynamic from "next/dynamic";
import styled from "styled-components";

function Video({url}: { url?: string }) {
  const { width } = useWindowSize();
  if (width === undefined) return null; // Handle case where width is not available
  return (
    <VideoPlayer>
      <ReactPlayer
        className={ReactPlayerCSS}
        playing
        url={url}
        loop
        muted
        playsinline
        controls={false}
        width={width > 992 ? "100%" : "auto"}
        height={"100%"}
        style={{ objectFit: "cover" }}
      />
    </VideoPlayer>
  );
}

export default Video;

const VideoPlayer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #000; /* Fallback background color */
`;

const ReactPlayerCSS = `
  position: absolute;
  top: 0;
  left: 0;
    z-index: 8;
`;
