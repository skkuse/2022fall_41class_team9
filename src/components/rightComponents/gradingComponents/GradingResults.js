import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { actionState } from "../../../atoms";

const GradingResutlsContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: aliceblue;
  display: ${(props) => (props.action === "grading" ? "flex" : "none")};
  flex-direction: column;
  background-color: #3b5939;
`;

const GradingHeader = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid;
  color: #f7f7b8;
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

function GradingResults() {
  const action = useRecoilValue(actionState);
  return (
    <GradingResutlsContainer action={action}>
      <GradingHeader>채점 결과</GradingHeader>
    </GradingResutlsContainer>
  );
}

export default GradingResults;
