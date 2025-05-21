import styled from "styled-components";
import {
  headerSpacing,
  maxWidthContainer,
  sectionResponsivePadding,
} from "../new_mixins/mixins";
import { ReactNode } from "react";

export interface ListPageDataUnitProps {
  title: string;
  description?: string;
  pointers?: string[];
}

export type ListPageDataProps = ListPageDataUnitProps[];



const ListPageComponent = ({
  title,
  data,
  theme = "light",
}: {
  title?: string | ReactNode;
  data: ListPageDataProps;
  theme?: "light" | "dark";
}) => {
  return (
    <TncContainer $theme={theme}>
      {title ? <TncTitle>{title}</TncTitle> : null}
      <TncContent>
        {data.length > 0 &&
          data.map((item, index) => (
            <TncItem key={index}>
              <TncItemTitle>{item?.title}</TncItemTitle>
              {item?.description && (
                <TncItemDescription $theme={theme}>{item?.description}</TncItemDescription>
              )}
              {item?.pointers && (
                <PointerDescription>
                  {item?.pointers.map((pointer, index) => (
                    <Pointer key={index} $theme={theme}>{pointer}</Pointer>
                  ))}
                </PointerDescription>
              )}
            </TncItem>
          ))}
      </TncContent>
    </TncContainer>
  );
};

export default ListPageComponent;

const TncContainer = styled.section<{ $theme: "light" | "dark" }>`
  background: ${(props) => props.$theme == 'light' ? '#fff' : '#000'};
  ${headerSpacing()};
  padding: 123px 0;
  ${sectionResponsivePadding()};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 47px;
  ${maxWidthContainer}
  color: ${(props) => props.$theme == 'light' ? '#000' : '#fff'};
  @media (min-width: 992px) {
    gap: 66px;
    padding-top: 180px;
    padding-bottom: 250px;
  }

  @media (min-width: 1950px) {
    gap: 93px;
  }
`;

const TncTitle = styled.h1`

  font-family: var(--font-exo);
  font-size: 34px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  width: 100%;

  @media (min-width: 992px) {
    font-size: 34px;
  }

  @media (min-width: 1950px) {
    font-size: 54px;
  }
`;

const TncContent = styled.ol`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 49px;
  list-style-type: decimal; /* Ensures numbering for ordered list */

  @media (min-width: 992px) {
    gap: 56px;
  }

  @media (min-width: 1950px) {
    gap: 79px;
  }
`;

const TncItem = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 992px) {
    gap: 10px;
  }

   @media (min-width: 1950px) {
    gap: 27px;
  }
`;
const TncItemTitle = styled.h2`
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 141.311%; /* 45.22px */
  @media (min-width: 992px) {
    font-size: 22px;
  }
    @media (min-width: 1950px) {
    font-size: 32px;
  }
`;

const TncItemDescription = styled.h2<{ $theme: "light" | "dark" }>`
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.311%; /* 31.088px */
  margin-left: 20px;
  color: ${(props) => props.$theme == 'light' ? '#000' : '#C0C0C0'};

  @media (min-width: 992px) {
    font-size: 17.5px;
  }

  @media (min-width: 1950px) {
    font-size: 22px;
  }
`;

const PointerDescription = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Pointer = styled.li<{ $theme: "light" | "dark" }>`
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.311%; /* 31.088px */
  margin-left: 20px;
  color: ${(props) => props.$theme == 'light' ? '#000' : '#C0C0C0'};

  @media (min-width: 992px) {
    font-size: 17.5px;
  }

  @media (min-width: 1950px) {
    font-size: 22px;
  }
`;
