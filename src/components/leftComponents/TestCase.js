import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState, testState } from "../../atoms";
import { DUMMY_DATA } from "../../constants/DummyData";
import { validateTestCase } from "../../fetch";

const TestCaseContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color};
  height: auto;
  /* display: none; */
`;

const TestCaseNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.boldColor};
  font-weight: 600;
  justify-content: space-between;
`;

const CasesWrapper = styled(motion.div)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TestCase = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MiniNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 20px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  justify-content: space-between;
  padding-right: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  border-top: 1px solid ${({ theme }) => theme.primary};
`;

const MiniNavBarTitle = styled.div``;

const ValidateContainer = styled.div`
  display: flex;
  height: 100%;
  width: 30%;
  justify-content: end;
`;

const ValidateResult = styled.div`
  flex: 1;
  color: ${(props) => (props.status === "pass" ? "blue" : "red")};
`;

const MainContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  display: flex;
  white-space: pre-line;
`;

const InputContent = styled.div`
  flex: 1;
  padding-left: 20px;
`;
const OutputContent = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const ValidateLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.isLoading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const testCaseVariants = {
  open: {
    scale: 1,
  },
  closed: {
    scale: 0,
    display: "none",
  },
};

function TestCaseInfo() {
  const userCode = useRecoilValue(testState);
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  const [validateResult, setValidateResult] = useState({
    0: { show: false, status: "fail" },
    1: { show: false, status: "fail" },
  });
  const [isOpen, setIsOpen] = useState(true);
  const { isLoading, mutate } = useMutation(
    (tcNum) => validateTestCase(userCode, currentProblemInfo.prob_id, tcNum),
    {
      onSuccess: (data, variables) => {
        console.log(data);

        setValidateResult((prev) => ({
          ...prev,
          [variables]: { show: true, status: data.status },
        }));
      },
      onError: (error) => console.log(error),
    }
  );

  const handleToggleBtnclick = () => setIsOpen(!isOpen);

  const handleValidateBtnClick = (tcNum) => {
    mutate(tcNum);
    console.log(userCode);
  };
  return (
    <TestCaseContainer initial={true} animate={isOpen ? "open" : "closed"}>
      <TestCaseNavBar>
        테스트케이스 <button onClick={handleToggleBtnclick}>힝</button>
      </TestCaseNavBar>

      <CasesWrapper variants={testCaseVariants}>
        <TestCase>
          <MiniNavBar>
            <MiniNavBarTitle>테스트케이스 1</MiniNavBarTitle>
            <ValidateContainer>
              <ValidateResult status={validateResult[0].status}>
                {validateResult[0].status}
              </ValidateResult>

              <Button
                variant="contained"
                onClick={() => handleValidateBtnClick(0)}
              >
                검증
              </Button>
            </ValidateContainer>
          </MiniNavBar>
          <MainContent>
            <InputContent>{`input:
          ${DUMMY_DATA.testCases[0].input}`}</InputContent>
            <OutputContent>{`output:
          ${DUMMY_DATA.testCases[0].output}`}</OutputContent>
            <ValidateLoader isLoading={isLoading}>
              <CircularProgress color="inherit" />
            </ValidateLoader>
          </MainContent>
        </TestCase>
        <TestCase>
          <MiniNavBar>
            <MiniNavBarTitle>테스트케이스 2</MiniNavBarTitle>
            <ValidateContainer>
              <ValidateResult status={validateResult[0].status}>
                {validateResult[1].status}
              </ValidateResult>

              <Button
                variant="contained"
                onClick={() => handleValidateBtnClick(1)}
              >
                검증
              </Button>
            </ValidateContainer>
          </MiniNavBar>
          <MainContent>
            <InputContent>{`input:
          ${DUMMY_DATA.testCases[1].input}`}</InputContent>
            <OutputContent>{`output:
          ${DUMMY_DATA.testCases[0].output}`}</OutputContent>
            <ValidateLoader isLoading={isLoading}>
              <CircularProgress color="inherit" />
            </ValidateLoader>
          </MainContent>
        </TestCase>
      </CasesWrapper>
    </TestCaseContainer>
  );
}

export default TestCaseInfo;