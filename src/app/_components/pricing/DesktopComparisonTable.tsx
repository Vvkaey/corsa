// DesktopComparisonTable.tsx
import { useRef } from "react";
import styled from "styled-components";
import { ComparisonDataProps, PropertyMapper } from "../data/productData";


const TableProperty = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: var(--font-fustat);

  h4 {
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-size: 30.665px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  
  p {
    color: #404040;
    leading-trim: both;
    text-edge: cap;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const CheckIcon = styled.span`
  color: #00c853;
  font-size: 1.2rem;
`;

const CrossIcon = styled.span`
  color: #ff3d00;
  font-size: 1.2rem;
`;

const NumberValue = styled.span`
  font-weight: bold;
  color: #0288d1;
`;

export type PropertyValue = {
  id: string;
  value: boolean | number | string;
};



export const DesktopComparisonTable = styled(
  ({
    className,
    data,
    comparatorsOrder,
  }: {
    className?: string;
    data: Array<ComparisonDataProps>;
    comparatorsOrder: number[];
  }) => {
    const tableBodyRef = useRef<HTMLTableElement>(null);

    // Filter property keys that exist in the data
    const featureKeys = Object.keys(PropertyMapper).filter((key) =>
      data.some(
        (item) =>
          typeof item[key as keyof ComparisonDataProps] === "object" &&
          "id" in (item[key as keyof ComparisonDataProps] as PropertyValue)
      )
    );

    const renderCellValue = (item: ComparisonDataProps, key: string) => {
      const property = item[key as keyof ComparisonDataProps] as PropertyValue;

      if (typeof property?.value === "boolean") {
        return property.value ? (
          <CheckIcon>✓</CheckIcon>
        ) : (
          <CrossIcon>✗</CrossIcon>
        );
      } else if (typeof property?.value === "number") {
        return property.value > 0 ? (
          <NumberValue>{property.value}</NumberValue>
        ) : (
          <CrossIcon>✗</CrossIcon>
        );
      } else {
        return property?.value;
      }
    };

    return (
      <table className={className} ref={tableBodyRef}>
        <tbody>
          {featureKeys.map((key) => (
            <tr key={key}>
              <td className="property">
                <TableProperty>
                  <h4>
                    {PropertyMapper[key as keyof typeof PropertyMapper].title}
                  </h4>
                  <p>
                    {
                      PropertyMapper[key as keyof typeof PropertyMapper]
                        .subtitle
                    }
                  </p>
                </TableProperty>
              </td>

              {comparatorsOrder.map((index) => {
                const item = data[index];
                return (
                  <td key={item.id}>
                    <div className="content">
                      <span className="bold-text">
                        {renderCellValue(item, key)}
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
)`
  width: 100%;
  border-collapse: collapse;
  z-index: 1;
  table-layout: fixed; /* Ensures consistent column widths */

  tr {
    border-top: 1.3px solid #e0e0e0;
    &:first-child {
      border-top: none;
    }
  }

  td {
    vertical-align: initial;
    text-align: center;
    height: 100%;
    width: 22%;
    border: none;

    &:first-child {
      text-align: left;
      padding: 38px 10px 42px 49px;
    }

    &:not(:first-child) {
      margin: auto;
      vertical-align: middle;
    }

    &.property {
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 120%;
      width: 30%;
    }
  }

  .content {
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-fustat);
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .bold-text {
    color: #000;
    font-size: 19px;
    font-weight: 500;
    line-height: 32px;
  }
`;