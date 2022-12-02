import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState, testState } from "../../atoms";
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

const TestCase = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MiniNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  justify-content: space-between;
  padding-right: 15px;
  border-bottom: 0.7px solid ${({ theme }) => theme.borderColor};
  border-top: 0.7px solid ${({ theme }) => theme.primary};
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.status === "pass" ? "#03b6fc" : "#e34b67")};
`;

const MainContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;

  white-space: pre-line;
`;

const BasicContent = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
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
    0: { show: false, status: "fail", input: 0, output: 0, userOutput: "" },
    1: { show: false, status: "fail", input: 0, output: 0, userOutput: "" },
  });

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
  const [isOpen, setIsOpen] = useState(true);
  const { isLoading, mutate } = useMutation(
    (tcNum) => validateTestCase(userCode, currentProblemInfo.prob_id, tcNum),
    {
      onSuccess: (data, variables) => {
        console.log(data);

        setValidateResult((prev) => ({
          ...prev,
          [variables]: { show: true, ...data },
        }));
      },
      onError: (error) => console.log(error),
    }
  );

  const handleToggleBtnclick = () => setIsOpen(!isOpen);

  const handleValidateBtnClick = (tcNum) => {
    mutate(tcNum);
    // console.log(userCode);
  };
  return (
    <TestCaseContainer initial={true} animate={isOpen ? "open" : "closed"}>
      <TestCaseNavBar>테스트케이스</TestCaseNavBar>

      <CasesWrapper variants={testCaseVariants}>
        <TestCase>
          <MiniNavBar>
            <MiniNavBarTitle>테스트케이스 1</MiniNavBarTitle>
            <ValidateContainer>
              <ValidateResult status={validateResult[0].status}>
                {validateResult[0].show ? validateResult[0].status : ""}
              </ValidateResult>

              <Button
                variant="contained"
                onClick={() => handleValidateBtnClick(0)}
              >
                테스트
              </Button>
            </ValidateContainer>
          </MiniNavBar>
          <MainContent>
            <BasicContent>
              <InputContent>{`입력값:  ${validateResult[0].input}`}</InputContent>
              <OutputContent>{`기댓값:  ${validateResult[0].output}`}</OutputContent>
            </BasicContent>
            {validateResult[0].show ? (
              <InputContent>{`코드 결과: ${validateResult[0].userOutput}`}</InputContent>
            ) : null}

            <ValidateLoader isLoading={isLoading}>
              <CircularProgress color="inherit" />
            </ValidateLoader>
          </MainContent>
        </TestCase>
        <TestCase>
          <MiniNavBar>
            <MiniNavBarTitle>테스트케이스 2</MiniNavBarTitle>
            <ValidateContainer>
              <ValidateResult status={validateResult[1].status}>
                {validateResult[1].show ? validateResult[1].status : ""}
              </ValidateResult>

              <Button
                variant="contained"
                onClick={() => handleValidateBtnClick(1)}
              >
                테스트
              </Button>
            </ValidateContainer>
          </MiniNavBar>
          <MainContent>
            <BasicContent>
              <InputContent>{`입력값:  ${validateResult[1].input}`}</InputContent>
              <OutputContent>{`기댓값:  ${validateResult[1].output}`}</OutputContent>
            </BasicContent>
            {validateResult[1].show ? (
              <InputContent>{`코드 결과: ${validateResult[1].userOutput}`}</InputContent>
            ) : null}
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
