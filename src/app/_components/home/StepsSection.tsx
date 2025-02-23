import styled from "styled-components";
import Image from "next/image";
interface FlowColAProps {
  img: string;
  title?: string;
  width?: number;
  height?: number;
  top?: string;
  right?: string;
  transform?: string;
}
interface FlowColBProps {
  img: string;
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
}
interface FlowColCProps {
  img: string;
}
interface FlowProps {
  colA: FlowColAProps;
  colB: FlowColBProps;
  colC: FlowColCProps;
}
export const StepsSection = styled(
  ({
    className,
    flowItems,
  }: {
    className?: string;
    flowItems?: FlowProps[];
  }) => {
    return (
      <section className={className}>
        <div className="steps-container">
          <div className="steps">
            {flowItems?.map((item, idx) => (
              <div className="step" key={idx}>
                <div className="text-container">
                  <div className="text-a">
                    <div className="icon-container">
                      <Image src={item?.colB?.img} alt={item?.colB?.img} fill />
                    </div>
                  </div>
                  <div className="text-b">
                    <h2 className="title">{item?.colB?.title}</h2>
                    <p className="description">{item?.colB?.subtitle}</p>
                  </div>
                </div>
                <div className="media-container">
                  <div className="img-container">
                    {" "}
                    <Image src={item?.colC?.img} alt={item?.colC?.img} fill />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
)`
  position: relative;
  width: 100%;
  font-family: var(--font-geist-sans);
  padding : 70px 0 100px 0;
  .steps-container {
    border-radius: 18px;
    background: #000;
    width: 100%;
    margin: auto;
    padding: 53.5px 0;
    overflow: hidden;
    @media (min-width: 992px) {
      border-radius: 20.987px;
      max-width: 1500px;
      padding: 72px 0;
    }
    .steps {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      .step {
        position: relative;
        display: flex;
        padding: 39.5px 18px;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        gap: 21px;
        @media (min-width: 992px) {
          flex-direction: row;
          padding: 52.5px 0;
          min-height: calc(512px + (2 * 52.5px));
          gap: unset;
        }
        &:nth-child(even) {
          @media (min-width: 992px) {
            flex-direction: row-reverse;
          }
          .media-container {
            @media (min-width: 992px) {
              border-radius: 0px 25px 25px 0px;
            }
          }
        }
        .text-container {
          width: 100%;
          display: flex;
          gap: 8px;
          justify-content: flex-start;
          @media (min-width: 992px) {
            justify-content: center;
            width: 50%;
            flex-direction: column;
            gap: 25px;
            padding-left: 111.5px;
          }
          .text-a {
            .icon-container {
              position: relative;
              width: 21px;
              height: 20px;
              top: 7px;
              @media (min-width: 992px) {
                top: unset;
                width: 54px;
                height: 54px;
              }
              img {
                position: absolute;
                object-fit: contain;
                filter: invert(1);
              }
            }
          }
          .text-b {
            display: flex;
            flex-direction: column;
            color: #fff;
            gap: 7px;
            .title {
              margin: 0;
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-transform: capitalize;
              @media (min-width: 992px) {
                font-size: 36px;
              }
            }
            .description {
              margin: 0;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 141.979%; /* 25.556px */
              @media (min-width: 992px) {
                max-width: 70%;
                font-size: 24px;
              }
            }
          }
        }
        .media-container {
          display: flex;
          width: 100%;
          height: 258px;
          border-radius: 8px;
          position: relative;
          background: #fff;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          @media (min-width: 992px) {
            width: calc(639px + 58px);
            height: calc(512px + 62px);
          }
          .img-container {
            background: #fff;
            width: calc(100% - 16px);
            height: calc(100% - 16px);
            position: relative;
            overflow: hidden;
            @media (min-width: 992px) {
              max-width: 639px;
              height: 100%;
              max-height: 512px;
            }
            img {
              position: absolute;
              object-fit: contain;
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }
`;