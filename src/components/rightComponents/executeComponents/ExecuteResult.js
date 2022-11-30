import { alertTitleClasses } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import {
  actionState,
  executeResultState,
  testState,
  executefinishState,
} from "../../../atoms";
import ReactDOM from "react-dom";

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

  const showErrorBefore = () => {
    if (executeResult) {
      const errorLine = executeResult.linePos;
      const userCode = executeResult.code;
      const codeLst = userCode.split("\n");
      const errorBefore = codeLst.slice(0, errorLine);

      let lst = [];

      errorBefore.forEach((element, index) => {
        if (index + 1 === Number(errorLine)) {
          lst.push(<div style={{ color: "green" }}>{element}</div>);
        } else {
          lst.push(<div>{element}</div>);
        }
      });
      return lst;
    }
    return;
  };
  const showError = () => {
    if (executeResult) {
      const errorMessage = executeResult.result;
      return <div style={{ color: "red" }}>errorMessage</div>;
    }
    return;
  };
  const showErrorAfter = () => {
    if (executeResult) {
      const userCode = executeResult.code;
      const codeLst = userCode.split("\n");
      const errorLine = executeResult.linePos;
      const errorAfter = codeLst.slice(errorLine);
      let lst = [];
      errorAfter.forEach((element) => {
        lst.push(<div>{element}</div>);
      });
      return lst;
    }
    return;
  };

  const showExecuteResult = () => {
    if (executeResult) {
      if (executeResult.status === "success") {
        return <div>{executeResult.result}</div>;
      } else if (executeResult.status === "fail") {
        return (
          <div>
            {executeResult.linePos} 번째 줄에 에러가 있습니다 수정하세요
          </div>
        );
      }
    }
    return;
  };

  const showExecuteSuccess = () => {
    if (executeResult) {
      return <div>{executeResult.result}</div>;
    }
  };
  const showExecuteFail = () => {
    if (executeResult) {
      const userCode = executeResult.code;
      const codeLst = userCode.split("\n");
      const errorLine = executeResult.linePos;
      const errorMessage = executeResult.result;
      const errorBefore = codeLst.slice(0, errorLine);
      const errorAfter = codeLst.slice(errorLine);
      let lst = [];
      errorBefore.forEach((element, index) => {
        if (index + 1 === Number(errorLine)) {
          lst.push(<div style={{ color: "green" }}>{element}</div>);
        } else {
          lst.push(<div>{element}</div>);
        }
      });
      lst.push(<div style={{ color: "red" }}>errorMessage</div>);
      errorAfter.forEach((element) => {
        lst.push(<div>{element}</div>);
      });
      return lst;
    }
  };
  return (
    <ExecuteResultContainer action={action}>
      <ExecuteNavbar>실행결과</ExecuteNavbar>
      <ExecuteText>
        Jser@Terminal ~ %
        <br />
        {executeResult && executeResult.status === "success"
          ? showExecuteSuccess()
          : showExecuteFail()}
        {/* {showExecuteResult()}
        {showErrorBefore()}
        {showError()}
        
        {showErrorAfter()} */}
      </ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
