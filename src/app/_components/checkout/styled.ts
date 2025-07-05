import styled from "styled-components";
import { headerSpacing, maxWidthContainer, sectionResponsivePadding } from "../new_mixins/mixins";

// Styled Components
export const CheckoutContainer = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // max-width: 1500px;
  position: relative;
  margin: 0 auto;
  width: fit-content;
  ${maxWidthContainer};
  ${headerSpacing()};
  ${sectionResponsivePadding()};

  @media (max-width: 992px) {
    margin-top: 40px;
  }

  @media (min-width: 992px) {
    padding-top: 5%;
    justify-content: flex-start;
  }

  @media (min-width: 1600px) {
    padding-top: 1.5%;
  }

  @media (min-width: 1950px) {
    padding-top: 0.5%;
  }


  @media (min-width: 2100px) {
    padding-top: 5rem;
    justify-content: center;
  }

`;

export const CheckoutGrid = styled.div`
position : relative;
  display: flex;
  justify-content: center;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    flex-direction: column;
    margin-top: 90px;
  }
    

  @media (min-width: 992px) {
    gap: 1rem;
  }

  @media (min-width: 1500px) {
    margin-top: 45px;
    gap: 2rem;
  }

  @media (min-width: 1950px) {
    margin-top: 24px;
  }
`;

export const ProductDetailsCard = styled.div`
  background-color: #f5f5f5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 0.5px solid #000;
  position: fixed;
  top: -3px;
  left: 0;
  margin-top: 47px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  z-index: 1;

  @media (min-width: 992px) {
    display: unset;
    border-radius: 8px;
    border: 2px solid #000;
    margin-top: unset;
    position: unset;
    width: 480px;
    padding: 34px 24px;
   
  }

  @media (min-width: 1500px) {
    width: 579px;
    padding: 58px 49px;
  }

  @media (min-width: 1950px) {
    padding: 68px 49px;
  }
`;

export const ProductTitle = styled.h1`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 22px;
  line-height: 34.7px; /* 125% */
  font-style: normal;
  font-weight: 600;
  padding: 16px 0;

  @media (min-width: 992px) {
    margin-bottom: 35px;
    padding: unset;
    padding-left: 15px;
    font-weight: 700;
    font-size: 26px;
    line-height: 125%;
  }

  @media (min-width: 1950px) {
    font-size: 35.425px;
    margin-bottom: 50px;
  }
`;

export const SeeAllBtn = styled.button`
  border: none;
  background: transparent;
  display: flex;

  svg {
    transform: rotate(180deg);
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

// export const ProductDescription = styled.p`
//   color: #64748b;
//   margin-bottom: 1.5rem;
//   font-size: 1rem;
// `;

// export const PriceTag = styled.div`
//   display: flex;
//   align-items: baseline;
//   margin-bottom: 1.5rem;
// `;

// export const Price = styled.span`
//   font-size: 2rem;
//   font-weight: 700;
//   color: #1e293b;
// `;

// export const Period = styled.span`
//   font-size: 1rem;
//   color: #64748b;
//   margin-left: 0.5rem;
// `;

export const BenefitsList = styled.ul`
  display: none;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;

  @media (min-width: 992px) {
    display: flex;
  }
`;

export const MobileBenefitsList = styled.ul<{ 'data-showfeatures'?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #f5f5f5;
  list-style: none;
  padding: 12px 30px 32px;
  overflow: hidden;
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: ${({ 'data-showfeatures': showFeatures }) => (showFeatures ? '1000px' : '0')};
  padding: ${({ 'data-showfeatures': showFeatures }) => (showFeatures ? '12px 30px 32px' : '0 30px')};
  opacity: ${({ 'data-showfeatures': showFeatures }) => (showFeatures ? '1' : '0')};
  margin-top: ${({ 'data-showfeatures': showFeatures }) => (showFeatures ? '0' : '-20px')};
 
  @media (min-width: 992px) {
    display: none;
  }
`;

export const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 15px 20px;
  border-bottom: 1px solid #c2c2c2;
  gap: 30px;

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 992px) {
    font-size: 17.5px;
    padding: 20px 15px;
  }

  @media (min-width: 1950px) {
    font-size: 25px;
    padding: 25px 15px;
  }
`;

export const Divider = styled.hr<{ pixelpadding?: string }>`
  border: 0;
  height: 1px;
  background-color: #cbd5e1;
  margin: ${({ pixelpadding }) =>
    pixelpadding ? `${pixelpadding} 0` : "22px 0"};

  @media (min-width: 992px) {
    margin: ${({ pixelpadding }) =>
    pixelpadding ? `${pixelpadding} 0` : "18px 0"};
  }

  @media (min-width: 1500px) {
    margin: ${({ pixelpadding }) =>
    pixelpadding ? `${pixelpadding} 0` : "22px 0"};
  }
`;

export const PaymentSection = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #000;
  padding: 23px 9px 35px;
  margin-bottom: 110px;

  @media (min-width: 992px) {
    border: 2px solid #000;
    margin-bottom: unset;
    width: 480px;
    padding: 34px 24px;
    border-radius: 12px;
  }

  @media (min-width: 1500px) {
    width: 579px;
    padding: 58px 49px;
  }

  @media (min-width: 1950px) {
    padding: 68px 49px;
  }
`;

export const SectionTitle = styled.h2`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 17.2px;
  font-style: normal;
  font-weight: 700;
  line-height: 27.2px; /* 158.147% */
  margin-bottom: 23px;
  text-align: center;

  @media (min-width: 992px) {
    text-align: unset;
    font-size: 19.6px;
    line-height: 158.147%;
    margin-bottom: 21px;
  }

  @media (min-width: 1950px) {
    font-size: 28px;
    margin-bottom: 31px;
  }
`;

export const FormGroup = styled.div`
position: relative;
  margin-bottom: 24px;

  @media (min-width: 992px) {
    margin-bottom: 1.65rem;
  }

  // @media (min-width: 1950px) {
  //   margin-bottom: 1.25rem;
  // }

  &:first-child {
    width: 100%;
  }
`;
export const HalfWidthFormGroup = styled(FormGroup)`
position: relative;
  width: 48%;
  display: inline-block;

  .svg{
  position: absolute;
  right: 10px;
  top: 40%;
  transform: rotate(180deg);
  pointer-events: none; // This ensures the SVG doesn't interfere with select clicks
  
  @media (min-width: 992px) {
    right: 12px;
  }

  @media (min-width: 1950px) {
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

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  transition: border-color 0.2s;

  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-radius: 5px;
  border: 1px solid #000;

  @media (min-width: 992px) {
    padding: 12px 15px;
    font-size: 16px;
    border-radius: 5.6px;
    border: 2px solid #969696;
  }

  @media (min-width: 1950px) {
  border-radius: 8px;
    font-size: 20px;
    padding: 18px 21px;
  }

  &:focus {
    outline: none;
    // border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  transition: border-color 0.2s;
  appearance: none; /* Hides default arrow */
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox */
  

  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 5px;
  border: 1px solid #000;

  

  @media (min-width: 992px) {
    padding: 12px 15px;
    font-size: 16px;
    border-radius: 5.6px;
    border: 2px solid #969696;
  }

  @media (min-width: 1950px) {
      border-radius: 8px;
    font-size: 20px;
    padding: 18px 21px;
  }

 

  &:focus {
    outline: none;
    // border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

`;

export const Option = styled.option`
  color: #000;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// export const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border: 1px solid #cbd5e1;
//   border-radius: 6px;
//   font-size: 1rem;
//   min-height: 100px;
//   resize: vertical;
//   transition: border-color 0.2s;

//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
// `;

export const PayButton = styled.button`
  position: relative;
  color: white;
  padding: 13px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 26px;

  border-radius: 5px;
  background: #ff2626;

  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14.5px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media (min-width: 992px) {
    padding: 12px 20px;
    font-size: 16.5px;
    border-radius: 5.6px;
    margin-top: 40px;
  }

  @media (min-width: 1950px) {
  border-radius: 8px;
    padding: 24px;
    margin-top: 1rem;
    font-size: 23.521px;
  }

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #000;
  background: #f5f5f5;
  padding: 24px 0 14px;
  margin-bottom: 36px;

  @media (min-width: 992px) {
    padding: 18px 0;
    background: #eef2f7;
    border: 2px solid #000;
    border-radius: 5.6px;
margin-bottom: 40px;
    
  }

  @media (min-width: 1950px) {
  border-radius: 8px;
    padding: 28px 0;
    margin-bottom: 1.5rem;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #646464;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 16.95px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0 28px 0 22px;

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: 992px) {
    font-size: 18.2px;
    padding: 0 30px;
  }

  @media (min-width: 1950px) {
    font-size: 26px;
    padding: 0 40px;
  }
`;

export const SummaryTotal = styled(SummaryRow)`
  padding-top: 2px;
  padding-bottom: 18px;

  @media (min-width: 992px) {
    padding-bottom: 25px;

    padding-top: 0.5rem;
  }

  @media (min-width: 1950px) {
    padding-bottom: 32px;
    margin-top: 0.5rem;
  }

  span {
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 20.725px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    @media (min-width: 992px) {
      font-size: 25px;
    }

    @media (min-width: 1950px) {
      font-size: 32px;
    }

    &:first-child {
      color: #646464;
      leading-trim: both;
      text-edge: cap;
      font-family: var(--font-exo);
      font-size: 16.8px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      @media (min-width: 992px) {
        font-size: 18.2px;
      }

      @media (min-width: 1950px) {
        font-size: 26px;
      }
    }

    &:last-child {
      position: relative;



      @media (min-width: 992px) {
        font-size: 22.5px;
      }



      &:after {
        position: absolute;
        top: 100%;
        left: -25%;
        white-space: nowrap;
        content: " Including GST";
        color: #646464;
        leading-trim: both;
        text-edge: cap;
        font-family: var(--font-exo);
        font-size: 14.2px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        @media (min-width: 992px) {
          font-size: 15.5px;
        }

        @media (min-width: 1950px) {
          font-size: 22px;
          left: -81%;
        }
      }
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  background-color: #fee2e2;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const BackLink = styled.a`
  display: inline-block;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  text-decoration: none;
  font-family: var(--font-fustat);
  width: 100%;
  &:hover {
    color: #1e293b;
    text-decoration: underline;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
