'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// Types
interface Product {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  buttonText: string;
  productType: string;
}

interface Metric {
  id: number;
  title: string;
  subtitle: string;
  availableIn: number[]; // Array of product IDs where this feature is available
}

// Sample data (replace with your real data)
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Insight Access Plan",
    price: 1399,
    period: "Year",
    description: "Curated insights and exclusive benefits",
    buttonText: "Subscribe Insight",
    productType: "session_pack"
  },
  {
    id: 2,
    name: "Premium Mentorship",
    price: 2499,
    period: "Year",
    description: "Enhanced guidance and premium features",
    buttonText: "Subscribe Mentor",
    productType: "session_pack"
  },
  {
    id: 3,
    name: "Elite Coaching",
    price: 3999,
    period: "Year",
    description: "Comprehensive coaching and all features",
    buttonText: "Subscribe Membership",
    productType: "session_pack"
  }
];

const METRICS: Metric[] = [
  {
    id: 1,
    title: "Weekly Wraps",
    subtitle: "Summary of industry trends and news",
    availableIn: [1, 2, 3]
  },
  {
    id: 2,
    title: "Mock Assessments",
    subtitle: "Practice tests with detailed feedback",
    availableIn: [1, 2, 3]
  },
  {
    id: 3,
    title: "AMA Sessions",
    subtitle: "Ask Me Anything with industry experts",
    availableIn: [1, 2, 3]
  },
  {
    id: 4,
    title: "1:1 Mentorship",
    subtitle: "Personal guidance sessions",
    availableIn: [2, 3]
  },
  {
    id: 5,
    title: "Career Roadmap",
    subtitle: "Personalized career planning",
    availableIn: [2, 3]
  },
  {
    id: 6,
    title: "Resume Reviews",
    subtitle: "Professional feedback on your resume",
    availableIn: [2, 3]
  },
  {
    id: 7,
    title: "Interview Preparation",
    subtitle: "Mock interviews with feedback",
    availableIn: [3]
  },
  {
    id: 8,
    title: "Project Guidance",
    subtitle: "Support for personal projects",
    availableIn: [3]
  },
  {
    id: 9,
    title: "Network Access",
    subtitle: "Introduction to industry professionals",
    availableIn: [3]
  },
  {
    id: 10,
    title: "Learning Resources",
    subtitle: "Curated educational materials",
    availableIn: [1, 2, 3]
  },
  {
    id: 11,
    title: "Community Access",
    subtitle: "Join our members-only community",
    availableIn: [1, 2, 3]
  },
  {
    id: 12,
    title: "Monthly Webinars",
    subtitle: "Educational sessions on key topics",
    availableIn: [1, 2, 3]
  },
  {
    id: 13,
    title: "Priority Support",
    subtitle: "Get your questions answered quickly",
    availableIn: [2, 3]
  },
  {
    id: 14,
    title: "Certification Guidance",
    subtitle: "Help with industry certifications",
    availableIn: [3]
  },
  {
    id: 15,
    title: "Career Opportunities",
    subtitle: "Early access to job openings",
    availableIn: [3]
  }
];

// Styled Components
const TableContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 15vh;
  padding: 2rem 1rem;
  overflow-x: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  @media (max-width: 768px) {
    width: 180%;
  }
`;

const TableHeader = styled.thead`
  background-color: #f8fafc;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const HeaderCell = styled.th<{ isfeatureCol?: boolean }>`
  padding: 1.5rem 1rem;
  text-align: ${props => props.isfeatureCol ? 'left' : 'center'};
  border-bottom: 2px solid #e2e8f0;
  min-width: ${props => props.isfeatureCol ? '240px' : '180px'};
  font-size : ${props => props.isfeatureCol ? '28px' : '20px'};
`;

const FeatureColumn = styled.td`
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
`;

const ProductColumn = styled.td`
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e2e8f0;
`;

const ProductTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-weight: 600;
`;

const PriceWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
`;

const Period = styled.span`
  font-size: 0.875rem;
  color: #64748b;
`;

const Description = styled.p`
  color: #64748b;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const SubscribeButton = styled.button`
  background-color: #ff2626;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const FeatureTitle = styled.div`
  font-weight: 600;
  color: #334155;
  font-size: 0.9375rem;
`;

const FeatureSubtitle = styled.div`
  color: #64748b;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
`;

const CheckMark = styled.div`
  color: #10b981;
  font-size: 1.25rem;
  font-weight: bold;
`;

const CrossMark = styled.div`
  color: #cbd5e1;
  font-size: 1.25rem;
`;

// const SectionHeader = styled.tr`
//   background-color: #f1f5f9;
// `;

// const SectionTitle = styled.td`
//   padding: 0.75rem 1rem;
//   font-weight: 600;
//   color: #475569;
//   font-size: 0.875rem;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
// `;

const MobileFeatureLabel = styled.div`
  display: none;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const TableScroller = styled.div`
  overflow-x: auto;
  width: 100%;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const MobileCta = styled.div`
  display: none;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const MobileProductCard = styled.div`
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
`;

// Main Component
const ProductComparisonTable: React.FC = () => {
  const router = useRouter();
  
  const handleSubscribe = (productId: number) => {
    router.push(`/checkout/${productId}`);
  };
  
  return (
    <TableContainer>
      <TableScroller>
        <StyledTable>
          <TableHeader>
            <tr>
              <HeaderCell isfeatureCol={true}>Compare plans <br/> & benefits
              </HeaderCell>
              {PRODUCTS.map(product => (
                <HeaderCell key={`header-${product.id}`}>
                  <ProductTitle>{product.name}</ProductTitle>
                  <PriceWrapper>
                    <Price>₹{product.price}</Price>{' '}
                    <Period>/{product.period}</Period>
                  </PriceWrapper>
                  <Description>{product.description}</Description>
                  <SubscribeButton onClick={() => handleSubscribe(product.id)}>
                    {product.buttonText}
                  </SubscribeButton>
                </HeaderCell>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {METRICS.map((metric, index) => (
              <tr key={`metric-${metric.id}-${index}`}>
                <FeatureColumn>
                  <FeatureTitle>{metric.title}</FeatureTitle>
                  <FeatureSubtitle>{metric.subtitle}</FeatureSubtitle>
                </FeatureColumn>
                {PRODUCTS.map(product => (
                  <ProductColumn key={`metric-${metric.id}-product-${product.id}`}>
                    <MobileFeatureLabel>{metric.title}</MobileFeatureLabel>
                    {metric.availableIn.includes(product.id) ? (
                      <CheckMark>✓</CheckMark>
                    ) : (
                      <CrossMark>✕</CrossMark>
                    )}
                  </ProductColumn>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableScroller>
      
      {/* Mobile-only CTA buttons for responsive design */}
      <MobileCta>
        {PRODUCTS.map(product => (
          <MobileProductCard key={`mobile-cta-${product.id}`}>
            <ProductTitle>{product.name}</ProductTitle>
            <PriceWrapper>
              <Price>₹{product.price}</Price>{' '}
              <Period>/{product.period}</Period>
            </PriceWrapper>
            <SubscribeButton onClick={() => handleSubscribe(product.id)}>
              {product.buttonText}
            </SubscribeButton>
          </MobileProductCard>
        ))}
      </MobileCta>
    </TableContainer>
  );
};

export default ProductComparisonTable;