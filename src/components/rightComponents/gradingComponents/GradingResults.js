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

function GradingResults() {
  const action = useRecoilValue(actionState);
  const [gradingResult, setGradingResult] = useRecoilState(gradingResultState);

  const showScore = () => {
    let passCount = 0;

    const resultLen = gradingResult.length;
    for (let i = 0; i < resultLen; i++) {
      if (gradingResult[i].status === "pass") {
        passCount += 1;
      }
    }
    let score = (passCount / resultLen) * 100;
    return <h2 style={{ margin: "8px" }}>총점은 {score}점 입니다.</h2>;
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
        // let tmp = passCount;
        // setPassCount(tmp);
        // passCount = passCount + 1
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
      {showScore()}
      {showGradeResult()}
    </GradingResutlsContainer>
  );
}

export default GradingResults;
