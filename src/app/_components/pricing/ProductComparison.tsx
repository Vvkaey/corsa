'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  popular?: boolean;
}

interface Metric {
  id: number;
  title: string;
  subtitle: string;
  availableIn: number[]; // Array of product IDs where this feature is available
  category?: string;
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
    productType: "session_pack",
    popular: true
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

// Define feature categories
const METRIC_CATEGORIES = [
  "Core Benefits",
  "Learning & Development",
  "Career Support",
  "Community & Resources"
];

const METRICS: Metric[] = [
  {
    id: 1,
    title: "Weekly Wraps",
    subtitle: "Summary of industry trends and news",
    availableIn: [1, 2, 3],
    category: "Core Benefits"
  },
  {
    id: 2,
    title: "Mock Assessments",
    subtitle: "Practice tests with detailed feedback",
    availableIn: [1, 2, 3],
    category: "Core Benefits"
  },
  {
    id: 3,
    title: "AMA Sessions",
    subtitle: "Ask Me Anything with industry experts",
    availableIn: [1, 2, 3],
    category: "Core Benefits"
  },
  {
    id: 4,
    title: "1:1 Mentorship",
    subtitle: "Personal guidance sessions",
    availableIn: [2, 3],
    category: "Learning & Development"
  },
  {
    id: 5,
    title: "Career Roadmap",
    subtitle: "Personalized career planning",
    availableIn: [2, 3],
    category: "Career Support"
  },
  {
    id: 6,
    title: "Resume Reviews",
    subtitle: "Professional feedback on your resume",
    availableIn: [2, 3],
    category: "Career Support"
  },
  {
    id: 7,
    title: "Interview Preparation",
    subtitle: "Mock interviews with feedback",
    availableIn: [3],
    category: "Career Support"
  },
  {
    id: 8,
    title: "Project Guidance",
    subtitle: "Support for personal projects",
    availableIn: [3],
    category: "Learning & Development"
  },
  {
    id: 9,
    title: "Network Access",
    subtitle: "Introduction to industry professionals",
    availableIn: [3],
    category: "Community & Resources"
  },
  {
    id: 10,
    title: "Learning Resources",
    subtitle: "Curated educational materials",
    availableIn: [1, 2, 3],
    category: "Learning & Development"
  },
  {
    id: 11,
    title: "Community Access",
    subtitle: "Join our members-only community",
    availableIn: [1, 2, 3],
    category: "Community & Resources"
  },
  {
    id: 12,
    title: "Monthly Webinars",
    subtitle: "Educational sessions on key topics",
    availableIn: [1, 2, 3],
    category: "Learning & Development"
  },
  {
    id: 13,
    title: "Priority Support",
    subtitle: "Get your questions answered quickly",
    availableIn: [2, 3],
    category: "Community & Resources"
  },
  {
    id: 14,
    title: "Certification Guidance",
    subtitle: "Help with industry certifications",
    availableIn: [3],
    category: "Learning & Development"
  },
  {
    id: 15,
    title: "Career Opportunities",
    subtitle: "Early access to job openings",
    availableIn: [3],
    category: "Career Support"
  }
];

// Styled Components
const TableContainer = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
  position: relative;
  background-color: #0f0f0f;
  color: #ffffff;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 180%;
  }
`;

interface TableHeaderProps {
  isSticky: boolean;
  reachedEnd: boolean;
}

// Updated TableHeader component with sticky behavior
const TableHeader = styled.thead<TableHeaderProps>`
  background-color: #0f0f0f;
  position: ${props => (props.isSticky && !props.reachedEnd) ? 'sticky' : 'relative'};
  top: 0;
  z-index: 10;
  transition: box-shadow 0.3s ease;
  box-shadow: ${props => (props.isSticky && !props.reachedEnd) ? '0 2px 10px rgba(0, 0, 0, 0.5)' : 'none'};
`;

interface HeaderCellProps {
  isfeaturecol?: boolean;
  isPopular?: boolean;
}

const HeaderCell = styled.th<HeaderCellProps>`
  padding: 1.5rem 1rem;
  text-align: ${props => (props.isfeaturecol ? 'left' : 'center')};
  border-bottom: 1px solid #333333;
  min-width: ${props => (props.isfeaturecol ? '240px' : '180px')};
  font-size: ${props => (props.isfeaturecol ? '1.5rem' : '1.25rem')};
  background-color: #0f0f0f;
  position: relative;
  
  ${props => props.isPopular && `
    &::before {
      content: 'MOST POPULAR';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #4ca3ff;
      color: #000000;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 12px;
      letter-spacing: 0.5px;
    }
  `}
`;

interface CategoryRowProps {
  isFirst?: boolean;
}

const CategoryRow = styled.tr<CategoryRowProps>`
  background-color: #171717;
  
  td {
    padding: 0.75rem 1rem;
    font-weight: 600;
    color: #ffffff;
    font-size: 1.125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #333333;
    ${props => props.isFirst && 'border-top: 1px solid #333333;'}
  }
`;

const FeatureColumn = styled.td`
  padding: 1.25rem 1rem;
  text-align: left;
  border-bottom: 1px solid #333333;
  background-color: #1c1c1c;
`;

interface ProductColumnProps {
  isPopular?: boolean;
}

const ProductColumn = styled.td<ProductColumnProps>`
  padding: 1.25rem 1rem;
  text-align: center;
  border-bottom: 1px solid #333333;
  background-color: ${props => props.isPopular ? '#1f1f1f' : '#1c1c1c'};
  position: relative;
  
  ${props => props.isPopular && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 0 2px #4ca3ff;
      pointer-events: none;
    }
  `}
`;

const ProductTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  font-weight: 600;
`;

const PriceWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Price = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
`;

const Period = styled.span`
  font-size: 0.875rem;
  color: #a0a0a0;
`;

const Description = styled.p`
  color: #a0a0a0;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const SubscribeButton = styled.button`
  background-color: #4ca3ff;
  color: black;
  border: none;
  border-radius: 24px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #3b93ef;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 163, 255, 0.3);
  }
`;

const FeatureTitle = styled.div`
  font-weight: 600;
  color: #ffffff;
  font-size: 0.9375rem;
`;

const FeatureSubtitle = styled.div`
  color: #a0a0a0;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
`;

const CheckMark = styled.div`
  color: #4ca3ff;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CrossMark = styled.div`
  color: #444444;
  font-size: 1.25rem;
`;

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
  max-height: 100vh;
  overflow-y: auto;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, #1c1c1c, #0f0f0f);
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0f0f0f;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #444444;
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
  padding: 1.5rem;
  border: 1px solid #333333;
  border-radius: 12px;
  text-align: center;
  background-color: #1c1c1c;
  margin-bottom: 1rem;
  position: relative;
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4ca3ff;
  color: #000000;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

// Main Component
const ProductComparisonTable: React.FC = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  
  // Helper function to get metrics by category
  const getMetricsByCategory = () => {
    const groupedMetrics: Record<string, Metric[]> = {};
    
    METRIC_CATEGORIES.forEach(category => {
      groupedMetrics[category] = METRICS.filter(metric => metric.category === category);
    });
    
    return groupedMetrics;
  };
  
  // Group metrics by category
  const metricsByCategory = getMetricsByCategory();
  
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current && theadRef.current && tbodyRef.current) {
        // Get table container position and dimensions
        const tableRect = tableRef.current.getBoundingClientRect();
        const theadHeight = theadRef.current.offsetHeight;
        const tbodyHeight = tbodyRef.current.offsetHeight;
        
        // Calculate when the header should become sticky
        // (when the top of the table is above the viewport)
        setIsSticky(tableRect.top <= 0);
        
        // Calculate when we've reached the end of the table
        // (when we've scrolled past the tbody)
        const scrolledPastTable = 
          tableRect.bottom - theadHeight <= 0 || 
          Math.abs(tableRect.top) >= tbodyHeight;
          
        setReachedEnd(scrolledPastTable);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleSubscribe = (productId: number) => {
    router.push(`/checkout/${productId}`);
  };
  
  return (
    <TableContainer>
      <SectionTitle>Compare Plans</SectionTitle>
      <TableScroller ref={tableRef}>
        <StyledTable>
          <TableHeader 
            ref={theadRef}
            isSticky={isSticky} 
            reachedEnd={reachedEnd}
          >
            <tr>
              <HeaderCell isfeaturecol={true}>
                Plans & Features
              </HeaderCell>
              {PRODUCTS.map(product => (
                <HeaderCell 
                  key={`header-${product.id}`}
                  isPopular={product.popular}
                >
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
          <tbody ref={tbodyRef}>
            {/* Render metrics by category */}
            {METRIC_CATEGORIES.map((category, categoryIndex) => (
              <React.Fragment key={`category-${categoryIndex}`}>
                {/* Category header */}
                <CategoryRow isFirst={categoryIndex === 0}>
                  <td colSpan={PRODUCTS.length + 1}>{category}</td>
                </CategoryRow>
                
                {/* Features in this category */}
                {metricsByCategory[category]?.map((metric, index) => (
                  <tr key={`metric-${metric.id}-${index}`}>
                    <FeatureColumn>
                      <FeatureTitle>{metric.title}</FeatureTitle>
                      <FeatureSubtitle>{metric.subtitle}</FeatureSubtitle>
                    </FeatureColumn>
                    {PRODUCTS.map(product => (
                      <ProductColumn 
                        key={`metric-${metric.id}-product-${product.id}`}
                        isPopular={product.popular}
                      >
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
              </React.Fragment>
            ))}
          </tbody>
        </StyledTable>
      </TableScroller>
      
      {/* Mobile-only CTA buttons for responsive design */}
      <MobileCta>
        {PRODUCTS.map(product => (
          <MobileProductCard 
            key={`mobile-cta-${product.id}`} 
            style={{ 
              border: product.popular ? '2px solid #4ca3ff' : '1px solid #333333' 
            }}
          >
            {product.popular && <PopularBadge>MOST POPULAR</PopularBadge>}
            <ProductTitle>{product.name}</ProductTitle>
            <PriceWrapper>
              <Price>₹{product.price}</Price>{' '}
              <Period>/{product.period}</Period>
            </PriceWrapper>
            <Description>{product.description}</Description>
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