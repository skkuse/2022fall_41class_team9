import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { actionState, gradingResultState } from "../../../atoms";

const GradingResutlsContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  display: ${(props) => (props.action === "grading" ? "flex" : "none")};
  flex-direction: column;
  color: white;
`;

const GradingHeader = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid;
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
  width: 100%;
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
  const [gradingResult, setGradingResult] = useRecoilState(gradingResultState);
  // console.log(gradingResult);

  const showScore = () => {
    let passCount = 0;

    const resultLen = gradingResult.length;
    for (let i = 0; i < resultLen; i++) {
      if (gradingResult[i].status === "pass") {
        passCount += 1;
      }
    }
    let score = (passCount / resultLen) * 100;
    return (
      <GradeTitle>{`5개중 ${passCount}개의 테스트를 통과했습니다`}</GradeTitle>
    );
  };
  const showGradeResult = () => {
    let array = [];
    const openTestCase = "테스트케이스";
    const hiddenTestCase = "히든 테스트케이스";
    const pass = "통과";
    const fail = "실패";

    const resultLen = gradingResult.length;

    for (let i = 0; i < resultLen; i++) {
      let str1 = "";
      let str2 = "";
      if (gradingResult[i].userOutput !== "hidden") {
        str1 = openTestCase;
      } else if (gradingResult[i].userOutput === "hidden") {
        str1 = hiddenTestCase;
      }
      if (gradingResult[i].status === "pass") {
        str2 = pass;
      } else if (gradingResult[i].status === "fail") {
        str2 = fail;
      }
      let str = `${str1}-${gradingResult[i].id}: ${str2}`;
      array.push(
        <div key={i} style={{ margin: "8px" }}>
          {str}
        </div>
      );
    }
    return array;
  };
  return (
    <GradingResutlsContainer action={action}>
      <GradingHeader>채점 결과</GradingHeader>
      <CasesContainer>
        {showScore()}
        {/* {showGradeResult()} */}
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
