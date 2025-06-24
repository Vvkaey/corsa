import styled from "styled-components";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { responsivePadding } from "../../new_mixins/mixins";
import { pricingData } from "@/app/_components/data/productData";

interface FailureScreenProps {
  productType: string;
}

export default function FailureScreen({ productType }: FailureScreenProps) {
  //   const [secondsLeft, setSecondsLeft] = useState(10);
  const router = useRouter();

  const tryAgain = useCallback(() => {
    router.replace("/");
    console.log(router);
  }, [router]);

  // Find the plan by productType
  const plan = pricingData.plans.find((p) => p.productType === productType);

  // Fallbacks if not found
  const name = plan?.name || "Plan";
  const description = plan?.description || "Plan description";
  const price = plan?.price ? `₹${plan.price}` : "-";
  const period = plan?.period ? `/ ${plan.period}` : "";


  return (
    <ThankyouContainer>
      <ThankyouBox>
        <Product>
          <ProductHead>
            <ProductTitle>{name}</ProductTitle>
            <ProductSubTitle>{description}</ProductSubTitle>
          </ProductHead>
          <PricingBox>
            <ProductPrice>
              {price}
              <Tenure>{period}</Tenure>
            </ProductPrice>
            <Tax>including GST</Tax>
          </PricingBox>
        </Product>
        <BoxDescription>
          <p>
            If you are having trouble paying, click on below button to use an
            alternate payment method
          </p>
        </BoxDescription>
        <HomeCTA onClick={tryAgain}>Try Again Securely</HomeCTA>
        <InNote>
          {" "}
          By proceeding, you agree to the subscription{" "}
          <NoteLink href="/terms-and-conditions">Terms of Services.</NoteLink>
        </InNote>
      </ThankyouBox>

      {/* <Note>
        By proceeding, you agree to the subscription{" "}
        <NoteLink href="/terms-and-conditions">Terms of Services.</NoteLink>
      </Note> */}
    </ThankyouContainer>
  );
}

const Product = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;

  @media (min-width: 992px) {
    gap: 71px;
    padding-top: 36px;
  }
`;

const ProductHead = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 18px;
  @media (min-width: 992px) {
    gap: 19px;
  }
`;

const ProductTitle = styled.h2`
  color: #ff2626;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-size: 27.795px;
  font-style: normal;
  font-weight: 600;
  line-height: 34.744px; /* 125% */
  font-family: var(--font-exo);
  @media (min-width: 992px) {
    font-size: 44.426px;
    font-weight: 700;
    line-height: 55.533px; /* 125% */
  }
`;

const ProductSubTitle = styled.h2`
  color: #757575;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Fustat;
  font-size: 15.287px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: var(--font-fustat);

  @media (min-width: 992px) {
    font-size: 24.434px;
  }
`;

const PricingBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;

  @media (min-width: 992px) {
    gap: 17px;
  }
`;

const ProductPrice = styled.p`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 37.09px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (min-width: 992px) {
    font-size: 52.442px;
  }
`;

const Tenure = styled.span`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 16.6px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (min-width: 992px) {
    font-size: 23.58px;
  }
`;

const Tax = styled.p`
  color: #646464;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (min-width: 992px) {
    font-size: 20px;
  }
`;

const NoteLink = styled(Link)`
  text-decoration: underline;
`;

const ThankyouContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(6px);
  padding-top: 80px;
  gap: 30px;
  ${responsivePadding()}

    @media (min-width: 992px) {
    gap: 18px;
  }

  @media (min-width: 1600px) {
    gap: 30px;
  }
`;

const ThankyouBox = styled.div`
  position: relative;
  border-radius: 5px;
  background: #f5f5f5;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  padding: 56px 10px 83px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 29px;

  @media (min-width: 992px) {
    width: unset;
    padding: 55px 100px;
    gap: 25px;
  }

  @media (min-width: 1600px) {
    width: unset;
    padding: 60px 290px 90px 290px;
    gap: 46px;
      border-radius: 17px;
  }
`;

// const TickContainer = styled.div`
//   position: relative;
//   height: 170px;
//   margin: auto;
//   width: 174px;
// `;

// const BoxHead = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   font-family: var(--font-fustat);
//   leading-trim: both;

//   h2 {
//     color: #fff;
//     leading-trim: both;
//     text-edge: cap;
//     font-family: var(--font-exo);
//     font-size: 45.77px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 150%;
//   }

//   p {
//     color: #fff;
//     leading-trim: both;
//     text-edge: cap;
//     font-size: 26px;
//     font-style: normal;
//     font-weight: 600;
//     line-height: 44.281px; /* 170.312% */
//   }
// `;

const BoxDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: var(--font-fustat);
  color: #757575;
  leading-trim: both;
  text-edge: cap;
  font-size: 12.435px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  gap: 14px;
  margin-top: 13px;
  max-width: 40ch;

  @media (min-width: 992px) {
    margin-top: unset;
    font-size: 22px;
    line-height: 35px;
  }
`;

const HomeCTA = styled.button`
  position: relative;
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 14.42px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border-radius: 4px;
  border-color: #ff2626;
  background: #ff2626;
  width: 100%;
  padding: 9px 20px;
 cursor: pointer;

  @media (min-width: 992px) {
    padding: 13px 94px;
    width: unset;
    font-size: 21.42px;
    border-radius: 7.286px;
    border: 1.821px solid #ff2626;
  }
`;

const InNote = styled.p`
  position: absolute;
  bottom: 60px;
  color: #8a8a8a;
  leading-trim: both;
  text-edge: cap;
  font-family: Fustat;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (min-width: 992px) {
    bottom: 22px;
    font-size: 14px;
  }

   @media (min-width: 1600px) {
    bottom: 50px;
  }
`;

// const Note = styled.p`
//   color: #8a8a8a;
//   leading-trim: both;
//   text-edge: cap;
//   font-family: Fustat;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
// `;
