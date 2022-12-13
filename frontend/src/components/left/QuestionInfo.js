import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentProblemInfoState } from "../../atoms";

const QuestionInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  /* max-height: 65%; */
`;

const Question = styled.div`
  background-color: aliceblue;
  /* flex: 6; */
  display: flex;
  min-height: 0;
  flex-direction: column;
  height: 65%;
`;

const Condition = styled.div`
  background-color: pink;
  /* flex: 4; */
  display: flex;
  min-height: 0;
  flex-direction: column;
  height: 35%;
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
  display: inline-block;
  vertical-align: top;
  background-color: ${({ theme }) => theme.bgColor};
  flex: 1;
  min-height: 0;
  /* height: 400px; */
  color: ${({ theme }) => theme.color};
  border-bottom: 0.7px solid ${({ theme }) => theme.borderColor};
  box-sizing: border-box;
  padding: 20px;
  overflow-y: auto;
  word-break: break-all;
  font-size: 18px;
  line-height: 1.6rem;
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
  // console.log(currentProblemInfo);

  return (
    <QuestionInfoContainer>
      <Question>
        <MiniNavBar>문제</MiniNavBar>
        <MainContent>
          {currentProblemInfo.description}
          {currentProblemInfo.description}
          {currentProblemInfo.description}
        </MainContent>
      </Question>
      <Condition>
        <MiniNavBar>참조/제약사항</MiniNavBar>
        <MainContent>
          {currentProblemInfo.constraint}
          {currentProblemInfo.constraint}
          {currentProblemInfo.constraint}
          {currentProblemInfo.constraint}
        </MainContent>
        {/* <MainContent></MainContent> */}
      </Condition>
    </QuestionInfoContainer>
  );
}

export default QuestionInfo;
