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
          name="description"
          content="Choose the right pricing plan for your needs"
        />
        <link rel="icon" href="/favicon.ico" />
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

