import { Metadata } from "next";
import Script from "next/script";
import PricingPage from "../_components/pricing/PricingPage";
import { pricingData } from "../_components/data/productData";
import { mergeMetadata, structuredData } from "../_utils/seo";

export const metadata: Metadata = mergeMetadata('pricing');

export default function Pricing() {
  return (
    <>
      <Script id="schema-script" type="application/ld+json">
        {JSON.stringify(structuredData.service)}
      </Script>
      
      <PricingPage
        title={pricingData.title}
        subtitle={pricingData.subtitle}
        plans={pricingData.plans}
      />
    </>
  );
}

