import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState } from "../../atoms";

const QuestionInfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  max-height: 65%;
`;

const Question = styled.div`
  background-color: aliceblue;
  flex: 6;
  display: flex;
  flex-direction: column;
  max-height: 65%;
`;

const Condition = styled.div`
  background-color: pink;
  flex: 4;
  display: flex;
  flex-direction: column;
  max-height: 35%;
`;

const MiniNavBar = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-bottom: 0.7px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.boldColor};
  font-weight: 600;
`;

const MainContent = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  color: ${({ theme }) => theme.color};
  border-bottom: 0.7px solid ${({ theme }) => theme.borderColor};
  padding: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 5px;
  }
`;

function QuestionInfo() {
  // 사용자가 선택한 문제 정보에 관한 state
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);

  return (
    <QuestionInfoContainer>
      <Question>
        <MiniNavBar>문제</MiniNavBar>
        <MainContent>{currentProblemInfo.description}</MainContent>
      </Question>
      <Condition>
        <MiniNavBar>참조/제약사항</MiniNavBar>
        <MainContent>{currentProblemInfo.constraint}</MainContent>
      </Condition>
    </QuestionInfoContainer>
  );
}

export default QuestionInfo;
