"use client";
import styled from "styled-components";

export const ShadowHeading = styled(
  ({
    className,
    title,
  }: {
    className?: string;
    title?: string | React.ReactNode;
  }) => {
    if (!title) return;

    return (
      <div className={className}>
        <p className="strokeme bottom-shadow">{title}</p>
      </div>
    );
  }
)`
  width: 100%;
  position: relative;
  background: #f9f9f9;
  font-family: var(--font-geist-sans);
  display : flex;
  justify-content : center;
  align-items : center;
  p {
    margin: 0;
    font-size: 50px;
  }

  .bottom-shadow {
    position: relative;
    width: 100%;

    -webkit-text-stroke-width: 1.7384346723556519;
    -webkit-text-stroke-color: #000;

    font-size: 78px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;

    &::after {
      content: "";
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      box-shadow: #f9f9f9 0px -17px 13.6px 5px inset;
      z-index: 8;
    }
  }

  .strokeme {
    color: #fff;
    background-color: transparent;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }
`;
