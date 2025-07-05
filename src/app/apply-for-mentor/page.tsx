"use client";

import { useState, useEffect } from "react";
import MentorApplication from "../_components/mentor-application/MentorApplication";
import VideoLoadingScreen from "../_components/global/loading";

const ApplyForMentorPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a minimum loading time to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds minimum loading time (same as HomeClientWrapper)

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  // Show loading screen while content is loading
  if (isLoading) {
    return (
      <VideoLoadingScreen 
        videoSrc="/loading.mp4" 
        loop={true}
      />
    );
  }

  return <MentorApplication />;
};

export default ApplyForMentorPage;
