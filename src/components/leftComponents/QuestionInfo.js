import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState } from "../../atoms";
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
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  // console.log(currentProblemInfo);
  // console.log(
  //   JSON.parse('{"input" : [7, 15, 43], "output" : [13,610,433494437]}')
  // );
  // console.log(
  //   JSON.stringify({ input: [7, 15, 43], output: [13, 610, 433494437] })
  // );
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