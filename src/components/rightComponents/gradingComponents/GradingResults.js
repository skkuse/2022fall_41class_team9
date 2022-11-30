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
      if (gradingResult[i].isopen === "true") {
        str1 = openTestCase;
      } else if (gradingResult[i].isopen === "false") {
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
      {showGradeResult()}
    </GradingResutlsContainer>
  );
}

export default GradingResults;
