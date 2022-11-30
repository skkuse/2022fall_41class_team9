import { alertTitleClasses } from "@mui/material";
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import {
  actionState,
  executeResultState,
  testState,
  executefinishState,
} from "../../../atoms";

const ExecuteResultContainer = styled.div`
  height: 100%;
  /* background-color: ${({ theme }) => theme.bgColor}; */
  display: ${(props) => (props.action === "execute" ? "block" : "none")};
`;

const ExecuteNavbar = styled.div`
  width: 100%;
  height: 20px;
  background-color: black;
  color: ${({ theme }) => theme.bgColor};
`;
const ExecuteText = styled.div`
  width: 100%;
  color: white;
  white-space: pre-line;
  margin: 8px;
`;
function ExecuteResult() {
  const action = useRecoilValue(actionState);
  const [executeResult, setExecuteResult] = useRecoilState(executeResultState);
  let code = "";
  const errorLine = executeResult.linePos;
  const errorMessage = executeResult.result;
  const userCode = executeResult.code;

  let codeLst = userCode.split("\n");
  let errorBefore = codeLst.slice(0, errorLine);
  let errorAfter = codeLst.slice(errorLine);

  const showErrorBefore = () => {
    let lst = [];
    errorBefore.forEach((element, index) => {
      if (index + 1 === Number(errorLine)) {
        lst.push(<div style={{ color: "green" }}>{element}</div>);
      } else {
        lst.push(<div>{element}</div>);
      }
    });
    return lst;
  };
  const showError = () => {
    return <div style={{ color: "red" }}>errorMessage</div>;
  };
  const showErrorAfter = () => {
    let lst = [];
    errorAfter.forEach((element) => {
      lst.push(<div>{element}</div>);
    });
    return lst;
  };

  code = code + "\r" + errorMessage;
  errorAfter.forEach((element) => {
    const separator = "\n";
    if (code.length === 0) {
      code = code + element;
    } else {
      code = code + separator + element;
    }
  });
  const showExecuteResult = () => {
    console.log(executeResult);
    if (executeResult.status === "success") {
      return <div>{executeResult.result}</div>;
    } else if (executeResult.status === "fail") {
      return (
        <div>{executeResult.linePos} 번째 줄에 에러가 있습니다 수정하세요</div>
      );
    }
  };

  return (
    <ExecuteResultContainer action={action}>
      <ExecuteNavbar>실행결과</ExecuteNavbar>
      <ExecuteText>
        Jser@Terminal ~ %
        <br />
        {showExecuteResult()}
        {showErrorBefore()}
        {showError()}
        {showErrorAfter()}
      </ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
