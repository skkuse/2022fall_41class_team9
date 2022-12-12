import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState } from "../../atoms";
import TestCaseValidator from "./TestCaseValidator";

const TestCaseContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color};
  height: auto;
  max-height: 35%;
  /* display: none; */
`;

const TestCaseNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-top: 0.7px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.boldColor};
  font-weight: 600;
  justify-content: space-between;
`;

const CasesWrapper = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

function TestCaseInfo() {
  const [validateResult, setValidateResult] = useState({
    0: { show: false, status: "fail", input: 0, output: 0, userOutput: "" },
    1: { show: false, status: "fail", input: 0, output: 0, userOutput: "" },
  });
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);

  useEffect(() => {
    if (currentProblemInfo) {
      const tcOpen = JSON.parse(
        currentProblemInfo.tc_open.replaceAll("'", '"')
      );
      setValidateResult({
        0: {
          show: false,
          status: "fail",
          input: tcOpen.input[0],
          output: tcOpen.output[0],
          userOutput: "",
        },
        1: {
          show: false,
          status: "fail",
          input: tcOpen.input[1],
          output: tcOpen.output[1],
          userOutput: "",
        },
      });
    }
  }, [currentProblemInfo]);

  return (
    <TestCaseContainer>
      <TestCaseNavBar>테스트케이스</TestCaseNavBar>

      <CasesWrapper>
        <TestCaseValidator
          validateResult={validateResult[0]}
          setValidateResult={setValidateResult}
          id={1}
        />
        <TestCaseValidator
          validateResult={validateResult[1]}
          setValidateResult={setValidateResult}
          id={2}
        />
      </CasesWrapper>
    </TestCaseContainer>
  );
}

export default TestCaseInfo;
