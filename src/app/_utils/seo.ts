import { Metadata } from 'next';

// Base metadata for the application
export const baseMetadata: Metadata = {
  metadataBase: new URL('https://stroda.club'),
  title: {
    default: 'Stroda Club || Plan Your IIT JEE',
    template: '%s | Stroda Club'
  },
  description: 'Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank.',
  keywords: [
    'IIT-JEE',
    'JEE preparation',
    'IIT toppers',
    'engineering entrance exam',
    'mentorship',
    'JEE coaching',
    'IIT admission',
    'engineering college',
    'JEE study tips',
    'IIT success'
  ],
  authors: [{ name: 'Stroda Club' }],
  creator: 'Stroda Club',
  publisher: 'Stroda Club',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://stroda.club',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stroda.club',
    siteName: 'Stroda Club',
    title: 'Stroda Club || Plan Your IIT JEE',
    description: 'Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Stroda Club || Plan Your IIT JEE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stroda Club || Plan Your IIT JEE',
    description: 'Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank.',
    images: ['/logo.png'],
    creator: '@strodaclub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

// Page-specific metadata
export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: 'Stroda Club || Plan Your IIT JEE',
    description: 'Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank.',
    keywords: [
      'IIT-JEE preparation',
      'JEE coaching',
      'IIT toppers mentorship',
      'engineering entrance exam',
      'JEE study tips',
      'IIT admission guidance'
    ],
    alternates: {
      canonical: 'https://stroda.club',
    },
    openGraph: {
      title: 'Stroda Club || Plan Your IIT JEE',
      description: 'Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank.',
      url: 'https://stroda.club',
    },
  },
  pricing: {
    title: 'Pricing Plans - Stroda Club',
    description: 'Choose the perfect mentorship plan for your IIT-JEE preparation. Compare our affordable pricing plans and get started with expert guidance.',
    keywords: [
      'IIT-JEE pricing',
      'mentorship plans',
      'JEE coaching cost',
      'affordable JEE preparation',
      'mentorship pricing'
    ],
    alternates: {
      canonical: 'https://stroda.club/pricing',
    },
    openGraph: {
      title: 'Pricing Plans - Stroda Club',
      description: 'Choose the perfect mentorship plan for your IIT-JEE preparation. Compare our affordable pricing plans and get started with expert guidance.',
      url: 'https://stroda.club/pricing',
    },
  },
  login: {
    title: 'Login - Stroda Club',
    description: 'Sign in to your Stroda Club account to access exclusive IIT-JEE mentorship and study resources.',
    keywords: [
      'Stroda Club login',
      'mentorship login',
      'IIT-JEE account',
      'student login'
    ],
    alternates: {
      canonical: 'https://stroda.club/login',
    },
    openGraph: {
      title: 'Login - Stroda Club',
      description: 'Sign in to your Stroda Club account to access exclusive IIT-JEE mentorship and study resources.',
      url: 'https://stroda.club/login',
    },
  },

  dashboard: {
    title: 'Dashboard - Stroda Club',
    description: 'Access your personalized IIT-JEE mentorship dashboard with progress tracking, session bookings, and study resources.',
    keywords: [
      'mentorship dashboard',
      'IIT-JEE progress',
      'session tracking',
      'study resources'
    ],
    alternates: {
      canonical: 'https://stroda.club/dashboard',
    },
    openGraph: {
      title: 'Dashboard - Stroda Club',
      description: 'Access your personalized IIT-JEE mentorship dashboard with progress tracking, session bookings, and study resources.',
      url: 'https://stroda.club/dashboard',
    },
  },

  applyForMentor: {
    title: 'Apply as Mentor - Stroda Club',
    description: 'Join our community of IIT-JEE toppers and help students achieve their engineering dreams. Apply to become a mentor.',
    keywords: [
      'become mentor',
      'IIT-JEE mentor',
      'mentor application',
      'help students'
    ],
    alternates: {
      canonical: 'https://stroda.club/apply-for-mentor',
    },
    openGraph: {
      title: 'Apply as Mentor - Stroda Club',
      description: 'Join our community of IIT-JEE toppers and help students achieve their engineering dreams. Apply to become a mentor.',
      url: 'https://stroda.club/apply-for-mentor',
    },
  },
  privacyPolicy: {
    title: 'Privacy Policy - Stroda Club',
    description: 'Learn how Stroda Club protects your privacy and handles your personal information while providing IIT-JEE mentorship services.',
    keywords: [
      'privacy policy',
      'data protection',
      'personal information',
      'mentorship privacy'
    ],
    alternates: {
      canonical: 'https://stroda.club/privacy-policy',
    },
    openGraph: {
      title: 'Privacy Policy - Stroda Club',
      description: 'Learn how Stroda Club protects your privacy and handles your personal information while providing IIT-JEE mentorship services.',
      url: 'https://stroda.club/privacy-policy',
    },
  },
  termsAndConditions: {
    title: 'Terms and Conditions - Stroda Club',
    description: 'Read our terms and conditions for using Stroda Club\'s IIT JEE Planner and services.',
    keywords: [
      'terms and conditions',
      'service terms',
      'mentorship terms',
      'platform rules'
    ],
    alternates: {
      canonical: 'https://stroda.club/terms-and-conditions',
    },
    openGraph: {
      title: 'Terms and Conditions - Stroda Club',
      description: 'Read our terms and conditions for using Stroda Club\'s IIT JEE Planner and services.',
      url: 'https://stroda.club/terms-and-conditions',
    },
  },
  checkout: {
    title: 'Checkout - Stroda Club',
    description: 'Complete your purchase and start your IIT-JEE mentorship journey with Stroda Club.',
    keywords: [
      'checkout',
      'payment',
      'mentorship purchase',
      'secure payment'
    ],
    alternates: {
      canonical: 'https://stroda.club/checkout',
    },
    openGraph: {
      title: 'Checkout - Stroda Club',
      description: 'Complete your purchase and start your IIT-JEE mentorship journey with Stroda Club.',
      url: 'https://stroda.club/checkout',
    },
  },
};

// Helper function to merge metadata
export function mergeMetadata(pageKey: string, customMetadata?: Partial<Metadata>): Metadata {
  const pageMeta = pageMetadata[pageKey] || {};
  return {
    ...baseMetadata,
    ...pageMeta,
    ...customMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      ...pageMeta.openGraph,
      ...customMetadata?.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...pageMeta.twitter,
      ...customMetadata?.twitter,
    },
  };
}

// Structured data for different pages
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stroda Club",
    "url": "https://stroda.club",
    "logo": "https://stroda.club/logo.png",
    "description": "IIT JEE Planner connecting students with IIT toppers",
    "sameAs": [
      "https://twitter.com/strodaclub",
      "https://linkedin.com/company/strodaclub"
    ]
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stroda Club",
    "url": "https://stroda.club",
    "description": "Get direct access to IIT-JEE toppers on Stroda Club",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://stroda.club/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "IIT-JEE Mentorship",
    "description": "1-on-1 mentorship sessions with IIT-JEE toppers",
    "provider": {
      "@type": "Organization",
      "name": "Stroda Club"
    },
    "serviceType": "Educational Mentorship",
    "areaServed": "India"
  }
}; 