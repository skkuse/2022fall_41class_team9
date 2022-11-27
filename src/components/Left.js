import styled from "styled-components";
import QuestionInfo from "./leftComponents/QuestionInfo";

import TestCaseInfo from "./leftComponents/TestCase";

const LeftContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.borderColor};
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
