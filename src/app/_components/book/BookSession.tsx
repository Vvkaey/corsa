'use client';

import React from 'react';
import styled from 'styled-components';
import CalendlyEmbed from './CalendlyEmbed';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
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
    name: "John Doe",
    expertise: "Frontend Development",
    calendlyUrl: "https://calendly.com/john-doe/30min"
  },
  {
    id: 2,
    name: "Jane Smith",
    expertise: "Backend Development",
    calendlyUrl: "https://calendly.com/jane-smith/30min"
  }
];




export const BookSession = () => {
    return (
        <Container>
          <Title>Book a Session with Our Mentors</Title>
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