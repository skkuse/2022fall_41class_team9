import styled from "styled-components";

const QuestionInfoContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const Question = styled.div`
  background-color: aliceblue;
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const Condition = styled.div`
  background-color: pink;
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const MiniNavBar = styled.div`
  background-color: #3b5939;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-bottom: 1px solid;
  color: #f7f7b8;
`;

const MainContent = styled.div`
  background-color: #3b5939;
  flex: 1;
`;

function QuestionInfo() {
  return (
    <QuestionInfoContainer>
      <Question>
        <MiniNavBar>문제</MiniNavBar>
        <MainContent></MainContent>
      </Question>
      <Condition>
        <MiniNavBar>참조/제약사항</MiniNavBar>
        <MainContent></MainContent>
      </Condition>
    </QuestionInfoContainer>
  );
}

export default QuestionInfo;
