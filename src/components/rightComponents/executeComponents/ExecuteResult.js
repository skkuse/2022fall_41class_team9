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

      return (
        <>
          {errorBefore.map((element, index) => {
            if (index + 1 === Number(errorLine)) {
              <div key={index} style={{ color: "green" }}>
                {element}
              </div>;
            } else {
              <div key={index}>{element}</div>;
            }
          })}
          <div style={{ color: "red" }}>errorMessage</div>
          {errorAfter.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
        </>
      );
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
      </ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
