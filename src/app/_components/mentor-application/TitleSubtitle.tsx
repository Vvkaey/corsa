import { RedSpan } from "../dashboard/styled";
import {
  ApplicationHead,
  ApplicationSubTitle,
  ApplicationTitle,
} from "./styled";

 const TitleSubtitle = () => {
  return (
    <ApplicationHead>
      <ApplicationTitle>
        Tell Us A Little About <RedSpan>Yourself</RedSpan>
      </ApplicationTitle>
      <ApplicationSubTitle>
        This helps us learn about your experience, expertise, and background.
      </ApplicationSubTitle>
    </ApplicationHead>
  );
};

export default TitleSubtitle;
