import styled from "styled-components";
import { DUMMY_DATA } from "../../constants/DummyData";

const QuestionInfoContainer = styled.div`
  flex: 2;
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
  background-color: ${({ theme }) => theme.bgColor};
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.boldColor};
  font-weight: 600;
`;

const MainContent = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  color: ${({ theme }) => theme.color};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  padding: 20px;
`;

function QuestionInfo() {
  return (
    <QuestionInfoContainer>
      <Question>
        <MiniNavBar>문제</MiniNavBar>
        <MainContent>{DUMMY_DATA.question}</MainContent>
      </Question>
      <Condition>
        <MiniNavBar>참조/제약사항</MiniNavBar>
        <MainContent>{DUMMY_DATA.constraint}</MainContent>
      </Condition>
    </QuestionInfoContainer>
  );
}

export default QuestionInfo;
