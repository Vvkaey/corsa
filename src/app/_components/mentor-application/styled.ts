import styled from "styled-components";
import { headerSpacing, sectionResponsivePadding } from "../new_mixins/mixins";
import { Subtitle, Title } from "../dashboard/styled";

export const StatusMessage = styled.div<{ type: "success" | "error" | "info" }>`
  padding: 0.5rem;
  margin-top: 0.25rem;

  color: ${(props) =>
    props.type === "success"
      ? "#2f855a"
      : props.type === "error"
        ? "#c53030"
        : "#2b6cb0"};
  background-color: ${(props) =>
    props.type === "success"
      ? "#c6f6d5"
      : props.type === "error"
        ? "#fed7d7"
        : "#e2e8f0"};
  border-radius: 4px;
  height: fit-content;
      position: absolute;
    top: -50px;
    font-size: 12px;


    @media (min-width: 1024px) {
  font-size: 0.875rem;
    top: -80px;

  }
`;

export const MentorApplicationContainer = styled.div`
  ${sectionResponsivePadding()}
  ${headerSpacing()}
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  z-index: 1;
  padding-top: 60px;
  padding-bottom: 170px;

  @media (min-width: 1025px) {
    padding: 100px 117px;
    gap: 112px;
  }
`;

export const ApplicationHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;

  @media (min-width: 992px) {
    gap: 20px;
  }
`;

export const ApplicationTitle = styled(Title)`
  color: #505050;

  @media (max-width: 992px) {
    max-width: 18ch;
  }
`;

export const ApplicationSubTitle = styled(Subtitle)`
  color: #505050;

  @media (max-width: 992px) {
    max-width: 32ch;
  }
`;

export const ApplicationForm = styled.div`
  width: 100%;

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    position: relative;

    @media (min-width: 1025px) {
      gap: 70px;
    }
  }

  @media (min-width: 1025px) {
    margin: 80px;
    margin-top: 30px;
  }

  @media (min-width: 1800px) {
    margin-top: unset;
  }
`;

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 9px;
  width: 100%;
  border-width: 1.35px;
  border-style: solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(90deg, #ff2626 0%, #fff 100%);
  border-top: none;
  border-left: none;
  border-right: none;

  @media (min-width: 1025px) {
    margin-bottom: 1.25rem;
    width: 30%;
    border-width: 2px;
  }

    .svg{
  position: absolute;
  right: 10px;
  top: 40%;
  transform: rotate(180deg);
  pointer-events: none; // This ensures the SVG doesn't interfere with select clicks
  
  @media (min-width: 992px) {
    right: 51px;
  }
}
`;

export const Label = styled.label`
  position: absolute;
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  visibility: hidden;
`;

export const InputGroup = styled.div`

  display: flex;
  gap: 10px;
  align-items: center;

`;

export const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  transition: border-color 0.2s;
  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  
  @media (min-width: 992px) {
    padding: 5px 21px;
    font-size: 21.7px;
    border-radius: 8px;
    line-height: 34.3px;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:is(:-webkit-autofill, :autofill) {
    opacity : 0.75;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 5px 7.5px;
  transition: border-color 0.2s;
  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;

  @media(min-width: 992px) {
      padding: 5px 21px;
      font-size: 21.7px;
      border-radius: 8px;
      line-height: 34.3px;
  }

  &:focus {
    outline: none;
    box-shadow: none;
}


`;

export const Button = styled.button`
background-color: #4299e1;
color: white;
padding: 0.5rem 1rem;
border: none;
border-radius: 4px;
cursor: pointer;

  &:hover {
    background-color: #3182ce;
}

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
}
`;

export const OtpButton = styled(Button)`
width: auto;
white-space: nowrap;
position: absolute;
right: 20px;
border : none;
background: transparent;
color: #000;
leading-trim: both;
text-edge: cap;
font-family: var(--font-fustat);
 font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 34.383px; /* 158.147% */

 &:disabled {
 background-color: transparent;
    cursor: not-allowed;
}

@media(min-width: 992px) {
 font-size: 21.7px;
  }
`;

export const ErrorText = styled.div`
position: absolute;
color: #ff2626;
font-size: 10px;
margin-top: 5px;
font-weight: 500;
margin-left: 10px;
font-family: var(--font-fustat);

@media(min-width: 1025px) {
    font-size: 14px;
    margin-left: 21px;
}
`;

export const SubmitButton = styled.button`
padding: 12px 24px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background: #ff2626;
border-radius: 8px;
justify-self: center;
color: #fff;
leading-trim: both;
text-edge: cap;
font-family: var(--font-fustat);
font-size: 14.4px;
font-style: normal;
font-weight: 800;
line-height: normal;
border: none;
cursor: pointer;

  &:hover {
    background: #ff2626;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    transform: translateY(-2px);
}

@media(min-width: 992px) {
    font-size: 23.521px;
    width: 315px;
    margin: 0 calc((100%-315px) / 2);
    padding: 16px 24px;
    
}
`;