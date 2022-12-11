import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { actionState, gradingResultState } from "../../../atoms";

const GradingResutlsContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  display: ${(props) => (props.action === "grading" ? "flex" : "none")};
  flex-direction: column;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const GradingHeader = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid;
  border-top: 1px solid;
  color: ${({ theme }) => theme.color};
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

const CasesContainer = styled.div`
  width: 95%;
  background-color: ${({ theme }) => theme.primary};
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
`;

const GradeTitle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color};
  font-size: 30px;
  padding: 10px;
`;
const GradeInfoContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.bgColor};
  padding: 10px;
`;

const MiniTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const MiniStatus = styled.span`
  font-size: 17px;
  font-weight: 500;
  margin-left: 20px;
`;

const MiniInfo = styled.div`
  font-size: 15px;
  margin-left: 30px;
  margin-bottom: 5px;
`;

function GradingResults() {
  const action = useRecoilValue(actionState);
  const gradingResult = useRecoilValue(gradingResultState);

  const showScore = () => {
    let passCount = 0;
    const resultLen = gradingResult.length;

    for (let i = 0; i < resultLen; i++) {
      if (gradingResult[i].status === "pass") {
        passCount += 1;
      }
    }

    return (
      <GradeTitle>{`5개중 ${passCount}개의 테스트를 통과했습니다`}</GradeTitle>
    );
  };

  return (
    <GradingResutlsContainer action={action}>
      <GradingHeader>채점 결과</GradingHeader>
      <CasesContainer>
        {showScore()}
        {gradingResult && gradingResult.length > 0
          ? gradingResult.map((result, idx) => (
              <GradeInfoContainer key={result.id}>
                <MiniTitle>
                  {`${result.id}번 테스트`}
                  {result.status === "pass" ? (
                    <MiniStatus style={{ color: "#03b6fc" }}>통과</MiniStatus>
                  ) : (
                    <MiniStatus style={{ color: "#e34b67" }}>실패</MiniStatus>
                  )}
                </MiniTitle>
                {idx < 2 ? (
                  <MiniInfo>{`입력값: ${result.input}`}</MiniInfo>
                ) : null}
                {idx < 2 ? (
                  <MiniInfo>{`기댓값: ${result.output}`}</MiniInfo>
                ) : null}
                {idx < 2 ? (
                  <MiniInfo>{`출력값: ${result.userOutput}`}</MiniInfo>
                ) : null}
              </GradeInfoContainer>
            ))
          : null}
      </CasesContainer>
    </GradingResutlsContainer>
  );
}

export default GradingResults;
