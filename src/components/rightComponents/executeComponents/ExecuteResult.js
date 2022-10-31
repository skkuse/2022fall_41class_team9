import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { actionState } from "../../../atoms";

const ExecuteResultContainer = styled.div`
  height: 100%;
  background-color: white;
  display: ${(props) => (props.action === "execute" ? "block" : "none")};
`;

const ExecuteNavbar = styled.div`
  width: 100%;
  height: 20px;
  background-color: black;
  color: white;
`;
const ExecuteText = styled.div`
  width: 100%;
  background-color: white;
`;
function ExecuteResult() {
  const action = useRecoilValue(actionState);
  return (
    <ExecuteResultContainer action={action}>
      <ExecuteNavbar>실행결과</ExecuteNavbar>
      <ExecuteText>Jser@Terminal ~ %</ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
