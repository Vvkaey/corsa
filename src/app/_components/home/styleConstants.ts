import styled, { css } from 'styled-components';

export const H2 = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  margin-bottom: 2.4rem;
`;

export const H2Large = styled.h2`
  font-size: 4.4rem;
  line-height: 5.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 2.4rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.global.tablet.maxWidth}) {
    font-size: 6.4rem;
    line-height: 7.2rem;
    text-align: center;
  }
`;

export const H3 = styled.h3`
  font-size: 5.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 2.4rem;

  @media (min-width: ${({ theme }) => theme.global.laptop.maxWidth}) {
    font-size: 7.2rem;
  }
`;

export const sectionPadding = css`
  padding: 48px 0;
  @media (min-width: ${({ theme }) => theme.global.tablet.maxWidth}) {
    padding: 70px 0;
  }
`;

export const containerSidePadding = css`
padding: 0 29px;
// @media (min-width: ${({ theme }) => theme.global.tablet.maxWidth}) {
//   padding: 70px 0;
// }
`;
