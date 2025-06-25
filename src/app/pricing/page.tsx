"use client";

import type { NextPage } from "next";
import Head from "next/head";
import PricingPage from "../_components/pricing/PricingPage";
import { pricingData } from "../_components/data/productData";
// import styled from "styled-components";
// import  Video  from "../_components/ui/video";

const Pricing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pricing | Your Product Name</title>
        <meta
          name="Stroda Club"
          content="Get direct access to IIT-JEE toppers on Stroda Club. Learn how IITians prepare, avoid common mistakes and improve your JEE rank."
        />
        <link rel="icon" href="/favi.png" />
      </Head>

      <PricingPage
        title={pricingData.title}
        subtitle={pricingData.subtitle}
        plans={pricingData.plans}
      />
    </>
  );
};

export default Pricing;

