import styled from "styled-components";

const TestCaseContainer = styled.div`
  background-color: aqua;
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const TestCaseNavBar = styled.div`
  background-color: #414e5a;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

const TestCase = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MiniNavBar = styled.div`
  background-color: #c8c852;
  height: 20px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  justify-content: space-between;
  padding-right: 15px;
`;

const MiniNavBarTitle = styled.div``;

const ValidateContainer = styled.div`
  display: flex;
  height: 100%;
  width: 30%;
  justify-content: end;
`;

const ValidateResult = styled.div`
  background-color: aliceblue;
  flex: 1;
`;

const ValidateButton = styled.button`
  height: 100%;
  border: none;
  background-color: bisque;
`;

const MainContent = styled.div`
  background-color: whitesmoke;
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
