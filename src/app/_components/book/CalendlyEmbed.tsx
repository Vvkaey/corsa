'use client';

import React from 'react';
import styled from 'styled-components';

const CalendlyContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 650px;
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  
  @media (max-width: 991px) {
    min-height: 600px;
  }
`;

const CalendlyEmbed: React.FC<{ url: string }> = ({ url }) => {
  return (
    <CalendlyContainer>
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Calendly Scheduling"
      />
    </CalendlyContainer>
  );
};

export default CalendlyEmbed;