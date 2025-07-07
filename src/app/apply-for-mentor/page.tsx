"use client";

import { useState, useEffect } from "react";
import MentorApplication from "../_components/mentor-application/MentorApplication";
import VideoLoadingScreen from "../_components/global/loading";
import Script from "next/script";
import { structuredData } from "../_utils/seo";

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

  return (
    <>
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify(structuredData.organization)}
      </Script>
      <MentorApplication />
    </>
  );
};

export default ApplyForMentorPage;
