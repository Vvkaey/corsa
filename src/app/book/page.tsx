'use client';

import React from 'react';
import styled from 'styled-components';
import CalendlyEmbed from '../_components/book/CalendlyEmbed';


const Container = styled.div`
  max-width: 1500px;
  margin: auto;
  height : 100vh;
  padding: 2rem 1rem;
  display : flex;
  justify-content : center;
  align-items : center;
  flex-direction : column;
   font-family: var(--font-exo);
`;

const Title = styled.h1`
 width : 100%;
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
width : 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const MentorName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Expertise = styled.p`
  color: #4B5563;
  margin-bottom: 1rem;
`;

const mentors = [
  {
    id: 1,
    name: "Ayush",
    expertise: "Development Mentor",
    calendlyUrl: "https://calendly.com/ayushb147/30min"
  }
];

export default function BookingPage() {
  return (
    <Container>
      <Title>Final Step : Book a Mentoring Session</Title>
      <Grid>
        {mentors.map((mentor) => (
          <Card key={mentor.id}>
            <MentorName>{mentor.name}</MentorName>
            <Expertise>{mentor.expertise}</Expertise>
            <CalendlyEmbed url={mentor.calendlyUrl} />
          </Card>
        ))}
      </Grid>
    </Container>
  );
}