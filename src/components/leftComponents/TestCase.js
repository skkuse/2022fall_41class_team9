import styled from "styled-components";

const TestCaseContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  color: #f7f7b8;
`;

const TestCaseNavBar = styled.div`
  background-color: #3b5939;
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
  background-color: #3b5939;
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
  background-color: #3b5939;
  flex: 1;
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
        <MainContent></MainContent>
      </TestCase>
      <TestCase>
        <MiniNavBar>
          <MiniNavBarTitle>테스트케이스 - 2</MiniNavBarTitle>
          <ValidateContainer>
            <ValidateResult>PASS</ValidateResult>
            <ValidateButton>검증</ValidateButton>
          </ValidateContainer>
        </MiniNavBar>
        <MainContent></MainContent>
      </TestCase>
    </TestCaseContainer>
  );
}

export default TestCaseInfo;
