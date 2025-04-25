"use client";

import styled from "styled-components";
import { RedSpan, Subtitle, Title } from "../_components/dashboard/styled";
import {
  headerSpacing,
  sectionResponsivePadding,
} from "../_components/new_mixins/mixins";
import { useState } from "react";

const ApplyForMentorPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // call the API
  };

  return (
    <MentorApplicationContainer>
      <ApplicationHead>
        <ApplicationTitle>
          Tell Us A Little About <RedSpan>Yourself</RedSpan>
        </ApplicationTitle>
        <ApplicationSubTitle>
          This helps us learn about your experience, expertise, and background.
        </ApplicationSubTitle>
      </ApplicationHead>
      <ApplicationForm>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">OTP</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone No</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Linkedin Profile</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Linkedin Profile"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">College Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="College Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">Currently Working</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Currently Working"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Current Company</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Current Company"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Current City</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Current City"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">Mentoring Experience</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mentoring Experience"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Mentoring Sessions</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mentoring Sessions"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Mentoring Approach</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mentoring Approach"
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? <>Processing...</> : <>Submit</>}
          </SubmitButton>
        </form>
      </ApplicationForm>
    </MentorApplicationContainer>
  );
};

export default ApplyForMentorPage;

const MentorApplicationContainer = styled.div`
  ${sectionResponsivePadding({})}
  ${headerSpacing()}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;
  padding: 65px 117px 100px;
  z-index: 1;
`;

const ApplicationHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ApplicationTitle = styled(Title)`
  color: #505050;
`;

const ApplicationSubTitle = styled(Subtitle)`
  color: #505050;
`;

const ApplicationForm = styled.div`
  //   background: red;
  width: 100%;

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 60px;
  }

  @media (min-width: 992px) {
    margin: 80px;
    margin-top: 30px;
  }

  @media (min-width: 1800px) {
    margin-top: unset;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 9px;

  @media (min-width: 992px) {
    margin-bottom: 1.25rem;
    width: 30%;
    // border-bottom : 1px solid linear-gradient(90deg, #FF2626 0%, #FFF 100%);
    border-width: 2px;
    border-style: solid;
    border-image-slice: 1;
    border-image-source: linear-gradient(90deg, #ff2626 0%, #fff 100%);
    border-top: none;
    border-left: none;
    border-right: none;
  }

  //   &:first-child {
  //     width: 100%;
  //   }
`;

const Label = styled.label`
  position: absolute;
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  visibility: hidden;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  transition: border-color 0.2s;
  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 5px;
  border: 1px solid #000;

  border: none;
  background-color: transparent;
  @media (min-width: 992px) {
    padding: 18px 21px;
    font-size: 21.7px;
    border-radius: 8px;
    line-height: 34.3px;
    // border: 2px solid #969696;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
padding: 16px 24px;
display: flex;
align-items: center;
justify-content: center;
background: #ff2626;
border-radius: 8px;
justify-self: center;
margin: 0 calc((100% - 315px)/2);
color: #fff ;
leading-trim: both;
text-edge: cap;
font-family: var(--font-fustat);
font-size: 23.521px;
font-style: normal;
font-weight: 800;
line-height: normal;
border: none;

@media (min-width: 992px) {
width: 315px;

`;
