import { useState } from "react";
import styled from "styled-components";

const ExecuteResultContainer = styled.div`
  height: 80%;
  background-color: white;
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
  return (
    <ExecuteResultContainer>
      <ExecuteNavbar>실행결과</ExecuteNavbar>
      <ExecuteText>Jser@Terminal ~ %</ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
