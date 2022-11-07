import styled from "styled-components";
import { DUMMY_DATA } from "../../constants/DummyData";

const TestCaseContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color};
`;

const TestCaseNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-top: 1px solid;
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
  border-bottom: 1px solid;
  border-top: 1px solid;
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
  background-color: aliceblue;
`;

const MainContent = styled.div`
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

function TestCaseInfo() {
  return (
    <TestCaseContainer>
      <TestCaseNavBar>테스트케이스</TestCaseNavBar>
      <TestCase>
        <MiniNavBar>
          <MiniNavBarTitle>테스트케이스 - 1</MiniNavBarTitle>
          <ValidateContainer>
            <ValidateResult>PASS</ValidateResult>
            <ValidateButton>검증</ValidateButton>
          </ValidateContainer>
        </MiniNavBar>
        <MainContent>
          <InputContent>{`input:
          ${DUMMY_DATA.testCases[0].input}`}</InputContent>
          <OutputContent>{`output:
          ${DUMMY_DATA.testCases[0].output}`}</OutputContent>
        </MainContent>
      </TestCase>
      <TestCase>
        <MiniNavBar>
          <MiniNavBarTitle>테스트케이스 - 2</MiniNavBarTitle>
          <ValidateContainer>
            <ValidateResult>PASS</ValidateResult>
            <ValidateButton>검증</ValidateButton>
          </ValidateContainer>
        </MiniNavBar>
        <MainContent>
          <InputContent>{`input:
          ${DUMMY_DATA.testCases[1].input}`}</InputContent>
          <OutputContent>{`output:
          ${DUMMY_DATA.testCases[0].output}`}</OutputContent>
        </MainContent>
      </TestCase>
    </TestCaseContainer>
  );
}

export default TestCaseInfo;
