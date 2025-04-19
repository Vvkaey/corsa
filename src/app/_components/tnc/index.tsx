import styled from "styled-components";
import {
  headerSpacing,
  maxWidthContainer,
  responsivePadding,
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
}: {
  title?: string | ReactNode;
  data: ListPageDataProps;
}) => {
  return (
    <TncContainer>
      {title ? <TncTitle>{title}</TncTitle> : null}
      <TncContent>
        {data.length > 0 &&
          data.map((item, index) => (
            <TncItem key={index}>
              <TncItemTitle>{item?.title}</TncItemTitle>
              {item?.description && (
                <TncItemDescription>{item?.description}</TncItemDescription>
              )}
              {item?.pointers && (
                <PointerDescription>
                  {item?.pointers.map((pointer, index) => (
                    <Pointer key={index}>{pointer}</Pointer>
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

const TncContainer = styled.section`
  background: #fff;
  ${headerSpacing()};
  padding: 183px 0;
  ${responsivePadding()};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 47px;
  ${maxWidthContainer}
  color: #000;
  @media (min-width: 992px) {
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
    gap: 79px;
  }
`;

const TncItem = styled.li`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 992px) {
    gap: 39px;
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
    font-size: 32px;
  }
`;

const TncItemDescription = styled.h2`
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.311%; /* 31.088px */
  margin-left: 20px;

  @media (min-width: 992px) {
    font-size: 22px;
  }
`;

const PointerDescription = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Pointer = styled.li`
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.311%; /* 31.088px */
  margin-left: 20px;

  @media (min-width: 992px) {
    font-size: 22px;
  }
`;
