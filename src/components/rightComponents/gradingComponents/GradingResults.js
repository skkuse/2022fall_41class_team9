import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { actionState, gradingResultState } from "../../../atoms";

const GradingResutlsContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  display: ${(props) => (props.action === "grading" ? "flex" : "none")};
  flex-direction: column;
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
    const resultLen = gradingResult.length;
    for (let i = 0; i < resultLen; i++) {
      array.push(
        <div key={i}>
          {gradingResult[i].id}
          <br />
          {gradingResult[i].status}
          <br />
          {gradingResult[i].isopen}
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
