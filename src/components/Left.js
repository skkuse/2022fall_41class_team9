import styled from "styled-components";
import QuestionInfo from "./leftComponents/QuestionInfo";

import TestCaseInfo from "./leftComponents/TestCase";

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f7f7b8;
`;

function Left() {
  return (
    <LeftContainer>
      <QuestionInfo></QuestionInfo>
      <TestCaseInfo></TestCaseInfo>
    </LeftContainer>
  );
}

export default Left;
