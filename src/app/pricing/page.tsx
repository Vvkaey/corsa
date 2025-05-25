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
      {/* <YouFormContainer>
        <iframe
          src="https://app.youform.com/forms/skcvecci"
          loading="lazy"
          width="100%"
          height="700"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        ></iframe>
      </YouFormContainer> */}
    </>
  );
};

export default Pricing;

// const YouFormContainer = styled.div`
// position : relative;
//   width: 100vw;
//   height: 100vh;
//   overflow: hidden;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 99;
//   background: rgb(0, 0, 0);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #ccc;
// `;
