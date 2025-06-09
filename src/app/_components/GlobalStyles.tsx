'use client';

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Ensure smooth scrolling behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Ensure the body takes full height and maintains scroll functionality */
  body {
    min-height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export default function GlobalStyles() {
  return <GlobalStyle />;
} 