// With the default font size on desktops, 62.5%, 1rem = 10px

export const PHONE_MAX_WIDTH_IN_PX = 768;
export const TABLET_MAX_WIDTH_IN_PX = 1024;

export const theme = {
  global: {
    desktop: {
      fontSize: '62.5%',
      gridColumnWidth: '128px',
      gridColumnGap: '48px',
      gridColumSpacing: '1fr',
    },
    laptop: {
      maxWidth: '1444px',
      fontSize: '55%',
      gridColumnWidth: '130px',
      gridColumnGap: '40px',
      gridColumSpacing: '1fr',
    },
    tablet: {
      maxWidth: `${TABLET_MAX_WIDTH_IN_PX}px`,
      fontSize: '45%',
      gridColumnWidth: '60px',
      gridColumnGap: '24px',
      gridColumSpacing: '1fr',
    },
    phone: {
      maxWidth: `${PHONE_MAX_WIDTH_IN_PX}px`,
      fontSize: '40%',
      gridColumnWidth: '1fr',
      gridColumnGap: '12px',
      gridColumSpacing: '12px',
    },
  },
  colors: {
    background: '#000000',
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.3)',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
    xxl: 96,
  },
  typography: {
    font: {
      default: 'Helvetica Neue, sans-serif',
    },
    fontWeight: {
      regular: 400,
      semibold: 500,
      bold: 600,
    },
    fontSize: {
      extrasmall: '1.4rem',
      mediumsmall: '1.7rem',
      small: '1.9rem',
      medium: '2.4rem',
      large: '3.2rem',
      extralarge: '6.4rem',
      xxlarge: '9.1rem',
      ultralarge: '12.5rem',
    },
  },
} as const;

export type Theme = typeof theme;
