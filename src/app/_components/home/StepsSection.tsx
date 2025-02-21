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
      }) =>
        {
  return (
    <section className={className}>
      <div className="steps-container">
        <div className="steps">
        {flowItems?.map((item, idx) => (
          <div className="step" key={idx}>
            <div className="text-container">
              <div className="text-a">
                <div className="icon-container">
                  <Image
                    src={item?.colB?.img}
                    alt={item?.colB?.img}
                    fill
                  />
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
                <Image
                  src={item?.colC?.img}
                  alt={item?.colC?.img}
                  fill
                />
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </section>
  );
})`
  width: 100%;
  font-family: var(--font-geist-sans);
   
  .steps-container {
    border-radius: 20.987px;
    background: #000;
    max-width : 1500px;
    margin : auto;
    padding : 72px 0;

    .steps {
      display: flex;
      flex-direction: column;

      .step {
        display: flex;
        padding: 52.5px 0;
        min-height: calc(512px + (2 * 52.5px));

        justify-content: space-between;
        align-items: center;

        &:nth-child(even) {
          flex-direction: row-reverse;

          .media-container {
            border-radius: 0px 25px 25px 0px;
          }
        }

        .text-container {
          display: flex;
          width: 50%;

          justify-content: center;
          @media (min-width: 992px) {
            flex-direction: column;
            gap: 25px;
            padding-left: 111.5px;
          }
          .text-a {
            .icon-container {
              position: relative;
              width: 54px;
              height: 54px;
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
              font-size: 36px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              text-transform: capitalize;
            }

            .description {
              max-width: 70%;
              margin: 0;
              font-size: 24px;
              font-style: normal;
              font-weight: 600;
              line-height: 141.979%; /* 25.556px */
            }
          }
        }

        .media-container {
          display: flex;

          width: 100%;
          width: calc(639px + 58px);
          border-radius: 25px 0px 0px 25px;
          height: calc(512px + 62px);
          position: relative;
          background: #fff;
          justify-content: center;
          align-items: center;

          .img-container {
            background: #fff;

            width: 100%;
            max-width: 639px;
            height: 100%;
            max-height: 512px;
            position: relative;

            overflow: hidden;

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
