import styled, { css } from "styled-components";

// Type definitions for the mixins
type ResponsivePaddingProps = {
  mobilePadding?: string;
  mobiledVpadding?: string;
  tabletPadding?: string;
  desktopPadding?: string;
  desktopVpadding?: string;
  desktopMdPadding?: string;
  desktopMdVpadding?: string;
};

type ResponsiveMarginProps = {
  mobileMargin?: string;
  tabletMargin?: string;
  desktopMargin?: string;
};

// Mixin 1: Constrains inner content to a max-width of 1800px
export const maxWidthContainer = css`
  box-sizing: border-box;
  margin: 0 auto;
  @media (min-width: 1900px) {
    width: 100%;
    max-width: 1800px;
  }
`;

// Mixin 2: Adds responsive padding to inner divs
export const responsivePadding = ({
  mobilePadding = "16px",
  mobiledVpadding = "60px",
  tabletPadding = "32px",
  desktopPadding = "80px",
  desktopVpadding = "89px",
  desktopMdPadding = "120px",
  desktopMdVpadding = "120px",
}: ResponsivePaddingProps = {}) => css`
  padding-left: ${mobilePadding};
  padding-right: ${mobilePadding};
  padding-top: ${mobiledVpadding};
  padding-bottom: ${mobiledVpadding};

  @media (min-width: 768px) {
    padding-left: ${tabletPadding};
    padding-right: ${tabletPadding};
  }

  @media (min-width: 1024px) {
    padding-left: ${desktopPadding};
    padding-top: ${desktopVpadding};
    padding-bottom: ${desktopVpadding};
    padding-right: ${desktopPadding};
  }
  @media (min-width: 1800px) {
    padding-left: ${desktopMdPadding};
    padding-top: ${desktopMdVpadding};
    padding-bottom: ${desktopMdVpadding};
    padding-right: ${desktopMdPadding};
  }
`;

export const sectionResponsivePadding = ({
    mobilePadding = "16px",
    tabletPadding = "32px",
    desktopPadding = "80px",
    desktopMdPadding = "120px",
  }: ResponsivePaddingProps = {}) => css`
    padding-left: ${mobilePadding};
    padding-right: ${mobilePadding};
  
    @media (min-width: 768px) {
      padding-left: ${tabletPadding};
      padding-right: ${tabletPadding};
    }
  
    @media (min-width: 1024px) {
      padding-left: ${desktopPadding};
      padding-right: ${desktopPadding};
    }
    @media (min-width: 1800px) {
      padding-left: ${desktopMdPadding};
      padding-right: ${desktopMdPadding};
    }

    @media (min-width: 2041px) {
      padding-left: 0px;
      padding-right: 0px;
    }
  `;

// Mixin 3: Adds responsive margin to components that are not full width
export const responsiveMargin = ({
  mobileMargin = "16px",
  tabletMargin = "32px",
  desktopMargin = "64px",
}: ResponsiveMarginProps = {}) => css`
  margin-left: ${mobileMargin};
  margin-right: ${mobileMargin};

  @media (min-width: 768px) {
    margin-left: ${tabletMargin};
    margin-right: ${tabletMargin};
  }

  @media (min-width: 1024px) {
    margin-left: ${desktopMargin};
    margin-right: ${desktopMargin};
  }
`;

export const SectionPadding = styled.section`
//   border: 5px solid red;
  ${responsivePadding()};
`;

// Type definitions for the header spacing mixin
type HeaderSpacingProps = {
  mobileSpacing?: string;
  tabletSpacing?: string;
  desktopSpacing?: string;
  desktopLSpacing?: string;
};

/**
 * Mixin for applying consistent top margin to the first component on a page,
 * typically used to provide space below the header/navigation.
 */
export const headerSpacing = ({
  mobileSpacing = "60px", // Default space below header on mobile
  tabletSpacing = "80px", // Default space below header on tablet
  desktopSpacing = "63px", // Default space below header on desktop
  desktopLSpacing = "80px", // Default space below header on desktop
}: HeaderSpacingProps = {}) => css`

  margin-top: ${mobileSpacing};

  @media (min-width: 768px) {
    margin-top: ${tabletSpacing};
  }

  @media (min-width: 1024px) {
    margin-top: ${desktopSpacing};
  }

   @media (min-width: 1950px) {
    margin-top: ${desktopLSpacing};
  }
`;

// Example of a first-component wrapper that can be extended
export const FirstComponentWrapper = css`
  ${headerSpacing()};
  width: 100%;
`;
