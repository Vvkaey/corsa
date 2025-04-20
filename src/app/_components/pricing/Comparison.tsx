// import { DesktopTable } from 'components/NewComparison/DesktopTable';

import { gridMixin } from "../mixins";
import { useRef, useState } from "react";
import styled from "styled-components";

// import { DesktopTableNew } from './DesktopTableNew';
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
// import { FormattedMessage } from 'react-intl';
import { DesktopComparisonTable } from "./DesktopComparisonTable";

export type ComparisonPropertyValueProps = {
  id: string;
  value: string | boolean;
};

export type ComparisonDataProps = {
  title: string;
  id: number;
  price?: string;
  cta?: string;
  redirection?: string;
  insider_pass: ComparisonPropertyValueProps;
  community_spotlights: ComparisonPropertyValueProps;
  one_on_one_session: ComparisonPropertyValueProps;
  mentor_feedback: ComparisonPropertyValueProps;
  weekly_wraps: ComparisonPropertyValueProps;
  mock_assessments: ComparisonPropertyValueProps;
  ama_sessions: ComparisonPropertyValueProps;
  priority_queue_support: ComparisonPropertyValueProps;
  extended_session_access: ComparisonPropertyValueProps;
  access_to_events: ComparisonPropertyValueProps;
  member_benefits: ComparisonPropertyValueProps;
  leaderboard_events: ComparisonPropertyValueProps;
  content_library: ComparisonPropertyValueProps;
  exclusive_merch_access: ComparisonPropertyValueProps;
};

export const PropertyMapper = {
  insider_pass: {
    title: "Insider Pass",
    subtitle: "Curated insights and exclusive benefits.",
  },
  community_spotlights: {
    title: "Community Spotlights",
    subtitle:
      "Get featured for your achievements and milestones on our weekly wraps.",
  },
  one_on_one_session: {
    title: "1-on-1 mentor sessions",
    subtitle:
      "Connect directly one-on-one with IITians and mentors from top institutes for guidance and strategic exam preparation.",
  },
  mentor_feedback: {
    title: "Mentor feedback",
    subtitle:
      "Receive detailed, actionable feedback tailored to your progress and areas for improvement after each session over your email.",
  },
  weekly_wraps: {
    title: "Weekly Wraps",
    subtitle:
      "Receive detailed, actionable feedback tailored to your progress and areas for improvement after each session over your email.",
  },
  mock_assessments: {
    title: "Mock Assessments",
    subtitle:
      "Take monthly mentor-curated practice tests to assess readiness and identify improvement areas.",
  },
  ama_sessions: {
    title: "AMA Sessions",
    subtitle:
      "Participate in live group sessions with elite mentors for in-depth discussion.",
  },
  priority_queue_support: {
    title: "Priority Query Support",
    subtitle:
      "Get priority access to our support team for urgent queries or issues, ensuring swift resolutions.",
  },
  extended_session_access: {
    title: "Extended Session Access",
    subtitle:
      "Opt for additional 1:1 sessions on a pay-per-session basis, allowing you to dive deeper into specific topics or challenges.",
  },
  access_to_events: {
    title: "Access to Events",
    subtitle: "Join monthly events focused on learning exam strategies.",
  },
  member_benefits: {
    title: "Member Benefits",
    subtitle:
      "Access special offers on tools, courses, and exclusive discounts to enhance your preparation.",
  },
  leaderboard_events: {
    title: "Leaderboard Rewards",
    subtitle: "Track your performance, compete, and earn rewards.",
  },
  content_library: {
    title: "Content Library",
    subtitle:
      "Unlock a curated collection of resources, notes, and expert guides.",
  },
  exclusive_merch_access: {
    title: "Access Exclusive Community Merchandise",
    subtitle:
      "Get access to merchandise designed exclusively for our community members.",
  },
};
export const COMPARISON_DATA = [
  {
    title: "Insight Access",
    id: 0,
    price: "₹ 2,999",
    cta: "Subscribe",
    redirection: "",
    insider_pass: {
      id: "insider_pass",
      value: true,
    },
    community_spotlights: {
      id: "community_spotlights",
      value: true,
    },
    one_on_one_session: {
      id: "one_on_one_session",
      value: "0",
    },
    mentor_feedback: {
      id: "mentor_feedback",
      value: false,
    },
    weekly_wraps: {
      id: "weekly_wraps",
      value: true,
    },
    mock_assessments: {
      id: "mock_assessments",
      value: true,
    },
    ama_sessions: {
      id: "ama_sessions",
      value: true,
    },
    priority_queue_support: {
      id: "priority_queue_support",
      value: false,
    },
    extended_session_access: {
      id: "extended_session_access",
      value: false,
    },
    access_to_events: {
      id: "access_to_events",
      value: true,
    },
    member_benefits: {
      id: "member_benefits",
      value: true,
    },
    leaderboard_events: {
      id: "leaderboard_events",
      value: true,
    },
    content_library: {
      id: "content_library",
      value: true,
    },
    exclusive_merch_access: {
      id: "exclusive_merch_access",
      value: true,
    },
  },
  {
    title: "Mentor Access",
    id: 1,
    price: "₹ 2,699",
    cta: "Subscribe",
    redirection: "",
    insider_pass: {
      id: "insider_pass",
      value: true,
    },
    community_spotlights: {
      id: "community_spotlights",
      value: true,
    },
    one_on_one_session: {
      id: "one_on_one_session",
      value: "5",
    },
    mentor_feedback: {
      id: "mentor_feedback",
      value: true,
    },
    weekly_wraps: {
      id: "weekly_wraps",
      value: false,
    },
    mock_assessments: {
      id: "mock_assessments",
      value: true,
    },
    ama_sessions: {
      id: "ama_sessions",
      value: false,
    },
    priority_queue_support: {
      id: "priority_queue_support",
      value: true,
    },
    extended_session_access: {
      id: "extended_session_access",
      value: true,
    },
    access_to_events: {
      id: "access_to_events",
      value: false,
    },
    member_benefits: {
      id: "member_benefits",
      value: true,
    },
    leaderboard_events: {
      id: "leaderboard_events",
      value: true,
    },
    content_library: {
      id: "content_library",
      value: false,
    },
    exclusive_merch_access: {
      id: "exclusive_merch_access",
      value: true,
    },
  },
  {
    title: "Membership Access",
    id: 2,
    price: "₹ 3,799",
    cta: "Subscribe",
    redirection: "",
    insider_pass: {
      id: "insider_pass",
      value: true,
    },
    community_spotlights: {
      id: "community_spotlights",
      value: true,
    },
    one_on_one_session: {
      id: "one_on_one_session",
      value: "5",
    },
    mentor_feedback: {
      id: "mentor_feedback",
      value: true,
    },
    weekly_wraps: {
      id: "weekly_wraps",
      value: true,
    },
    mock_assessments: {
      id: "mock_assessments",
      value: true,
    },
    ama_sessions: {
      id: "ama_sessions",
      value: true,
    },
    priority_queue_support: {
      id: "priority_queue_support",
      value: true,
    },
    extended_session_access: {
      id: "extended_session_access",
      value: true,
    },
    access_to_events: {
      id: "access_to_events",
      value: true,
    },
    member_benefits: {
      id: "member_benefits",
      value: true,
    },
    leaderboard_events: {
      id: "leaderboard_events",
      value: true,
    },
    content_library: {
      id: "content_library",
      value: true,
    },
    exclusive_merch_access: {
      id: "exclusive_merch_access",
      value: true,
    },
  },
] satisfies Array<ComparisonDataProps>;

const ProductHeadTitle = styled.h4`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 29px;
  font-style: normal;
  font-weight: 700;
  line-height: 45.626px; /* 157.33% */
  max-width: 20ch;
`;

const ProductHeadPricing = styled.p`
  color: #000;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-exo);
  font-size: 31.855px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:after {
    content: "/Year";
    color: #000;
    leading-trim: both;
    text-edge: cap;
    font-family: var(--font-exo);
    font-size: 19px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const ProductHeadCTA = styled.button`
  color: #ff2626;
  leading-trim: both;
  text-edge: cap;
  font-family: var(--font-fustat);
  font-size: 18.994px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  border-radius: 8px;
  border: 2px solid #ff2626;
  margin-top: 13px;
  padding: 10px 18px;
  background: transparent;
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  justify-content: center;
`;

export const Comparison = styled(
  ({ className, htmlId }: { className?: string; htmlId?: string }) => {
    // const GlobalUI = useGlobalUI();
    // const [isMobile, setIsMobile] = useState(false);
    const [comparatorsOrder] = useState<number[]>([0, 1, 2, 3]);
    const { width } = useWindowSize();
    // const [selectedActivityTrackerId, setSelectedActivityTrackerId] =
    //   useState<number>(0);

    // const gsapContext = useGsapContext();
    const tableContainer = useRef<HTMLTableElement>(null);
    const isMobile = (width ?? 0) < 768;


    return (
      <div className={className} id={htmlId}>
        <div className="sticky-wrapper">
          <h3>{/* Compare plans & benefits */}</h3>
          <p className="subHead"></p>
          {!isMobile ? (
            <table
              className="thead desktop"
              // style={{
              //   position: "sticky",
              //   top: 0,
              //   left: 0,
              //   marginBottom: "2.5rem",
              //   paddingBottom: "1.4rem",
              // }}
              ref={tableContainer}
            >
              {/* <button
                className="caret"
                onClick={changeComparisonItems}
              ></button> */}
              <thead>
                <tr>
                  <th className="comparator-head">Compare plans<br/> & benefits</th>

                  {COMPARISON_DATA && comparatorsOrder
                    ? comparatorsOrder.map((id, idx) => {
                        if (idx !== comparatorsOrder.length - 1) {
                          return (
                            <th key={idx} className="th">
                              <div className="content ">
                                <ProductHeader>
                                  <ProductHeadTitle>
                                    {COMPARISON_DATA[id]?.title}
                                  </ProductHeadTitle>
                                  <ProductHeadPricing>
                                    {COMPARISON_DATA[id]?.price}
                                  </ProductHeadPricing>
                                  <ProductHeadCTA>
                                    {COMPARISON_DATA[id]?.cta}
                                  </ProductHeadCTA>
                                </ProductHeader>
                              </div>
                            </th>
                          );
                        }
                      })
                    : null}
                </tr>
              </thead>
            </table>
          ) : (
            <table
              className="thead"
              style={{
                position: "sticky",
                // top: GlobalUI.headerVisible
                //   ? `${Number(GlobalUI.headerHeight) + 51}px`
                //   : '51px',
              }}
            >
              <thead>
                <tr>
                  <th className="title">
                    <div className="title-content">
                      <span className="bold">
                        {/* Ultrahuman Ring */}
                        {/* <FormattedMessage id="ring.comparison.uhRing.title" /> */}
                      </span>
                    </div>
                  </th>
                  <th className="title">
                    <div className="title-content">
                      <select
                        name="activity-tracker"
                        className="bold"
                        id="activity-tracker"
                        // onChange={(e) =>
                        //   setSelectedActivityTrackerId(Number(e.target.value))
                        // }
                      >
                        {/* {ComparisonItems && comparatorsOrder
                          ? comparatorsOrder.map((id, idx) => {
                              return (
                                <option key={idx} value={id}>
                                  {ComparisonItems[id]?.title}
                                </option>
                              );
                            })
                          : null} */}
                      </select>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          )}
          {!isMobile ? (
            <DesktopComparisonTable
              data={COMPARISON_DATA}
              comparatorsOrder={comparatorsOrder}
            />
          ) : null}
        </div>
      </div>
    );
  }
)`
  ${gridMixin}
  position :  relative;
  background: #fff;
  grid-column: 0 / 10;

  .sticky-wrapper {
    grid-column: 2 /-2;
    height: 100%;
    overflow: auto;
    position: relative;
    // width: 100vw;

    // table.desktop {
    //   overflow: hidden;
    // }

    table.desktop > .caret {
      position: absolute;
      border: none;
      top: calc(50% - 20px);
      right: 0;
      display: block;
      content: "";
      height: 24px;
      width: 24px;
      background: transparent;
      transition: all 0.2 ease;
      border-radius: 50%;
      z-index: 9;
      &:hover {
        filter: invert(0.7);
      }

      img {
        position: relative;
        top: -1.5px;
        left: -1.5px;
      }
    }

    table.thead {
      position: sticky;
      top: 0;
      left: 0;
      background: #fff;
      color: #000;
      width: 100%;
      z-index: 9;
      transition: all 0.3s ease-in-out;
      border-bottom: 1px solid #e5e5e5;
    }

    h3:last-of-type {
      color: #000;
    }

    h3 {
      color: rgb(109, 114, 120);
      font-size: 32px;
      font-weight: 500;
      letter-spacing: -0.38px;
      line-height: 112%;
      margin-bottom: 10px;

      @media screen and (min-width: 480px) {
        margin-top: 15rem;
        font-size: 80px;
        letter-spacing: -2.63px;
        line-height: 80px;
        margin-bottom: 15px;
      }
    }

    p.subHead {
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 130%; /* 26px */
      letter-spacing: -0.64px;
      @media (min-width: 992px) {
        font-size: 20px;
        letter-spacing: -0.8px;
        margin-bottom: 48px;
      }
    }

    th {
      vertical-align: initial;
      text-align: center;
      padding: 24px 10px;
      height: 100%;
      width: 22%;
      // animation: slide 2s linear;
      &:first-child {
        text-align: left;
      }

      @media (max-width: 992px) {
        vertical-align: initial;
        text-align: left;
        padding: 17px 8px 56px;
        height: 100%;
        width: 50%;

        &:first-child {
          position: relative;
          .prop {
            position: absolute;
            top: 0;
            left: 90%;
            color: blue;
            font-size: 14px;
          }
        }

        &.title {
          padding: 25px 2px;
        }
      }
    }

    .comparator-head {
      width: 30%;
      color: #000;
      leading-trim: both;
      text-edge: cap;
      font-size: 47.846px;
      font-style: normal;
      font-family: var(--font-exo);
      font-weight: 600;
      line-height: normal;
      padding-left : 49px;
    }

    .property-head {
      color: #000;
      font-weight: 600;
    }

    .bold {
      @media (max-width: 992px) {
        color: #000;
        font-size: 17px;
        font-family: HelveticaNeue-Medium;
        font-weight: 500;
        line-height: 30px;
      }
    }

    .bold-text {
      color: #000;
      text-align: left;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 28px */
      letter-spacing: -0.8px;

      @media (min-width: 992px) {
        text-align: center;
      }
    }

    .title {
      .title-content {
        height: 100%;
        text-align: left;
        display: flex;
        flex-direction: column;
        .img-container {
          margin: 0 auto 9px 0;
          position: relative;
          width: 3.2rem;
          height: 3.2rem;
          aspect-ratio: 1/1;

          img {
            height: unset !important;
            aspect-ratio: 1/1;
          }
        }

        select {
          appearence: none;
          -webkit-appearance: none;
          background: url("https://public-web-assets.ultrahuman.com/web/icons/down-caret.svg")
            no-repeat 0 0;
          background-position: right 0.5rem top 50%;
        }

        button,
        select {
          border: none;
          outline: none;
          text-align: left;
          background-color: transparent;
        }
      }
    }
  }
`;
