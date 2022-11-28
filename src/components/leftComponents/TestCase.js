import { Button, CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { testState } from "../../atoms";
import { DUMMY_DATA } from "../../constants/DummyData";
import { validateTestCase } from "../../fetch";

const TestCaseContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color};
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
`;

const ValidateButton = styled.button`
  height: 100%;
  border: none;
  background-color: transparent;
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

function TestCaseInfo() {
  const userCode = useRecoilValue(testState);
  const { isLoading, mutate } = useMutation(() =>
    validateTestCase({ user_code: userCode })
  );

  const handleValidateBtnClick = () => {
    // mutate();
  };
  return (
    <TestCaseContainer>
      <TestCaseNavBar>테스트케이스</TestCaseNavBar>
      <TestCase>
        <MiniNavBar>
          <MiniNavBarTitle>테스트케이스 1</MiniNavBarTitle>
          <ValidateContainer>
            <ValidateResult>PASS</ValidateResult>
            {/* <ValidateButton>검증</ValidateButton> */}
            <Button variant="contained">검증</Button>
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
            <ValidateResult>PASS</ValidateResult>
            {/* <ValidateButton>검증</ValidateButton> */}
            <Button variant="contained">검증</Button>
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
    </TestCaseContainer>
  );
}

export default TestCaseInfo;
