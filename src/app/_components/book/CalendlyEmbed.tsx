'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

interface CalendlyEmbedProps {
  url: string;
}

const CalendlyContainer = styled.div`
  min-width: 320px;
  height: 700px;
`;

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <CalendlyContainer 
      className="calendly-inline-widget" 
      data-url={url}
    />
  );
};

export default CalendlyEmbed;