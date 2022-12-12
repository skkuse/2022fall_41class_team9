import { style } from "@mui/system";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { actionState, executeResultState } from "../../atoms";

const ExecuteResultContainer = styled.div`
  height: 100%;
  display: ${(props) => (props.action === "execute" ? "block" : "none")};
`;

const ExecuteNavbar = styled.div`
  width: 100%;
  height: 25px;
  background-color: black;
  color: ${({ theme }) => theme.color};
`;

const TerminalWrapper = styled.div`
  width: 100%;
  color: white;
  white-space: pre-line;
  margin: 8px;
  display: ${(props) => (props.result === "success" ? "flex" : "block")};
`;

const ResultWrapper = styled.div`
  margin-top: 20px;
  font-size: 20px;
  margin: ${(props) => (props.result === "success" ? "16px" : "0px")};
`;
const CodeBefore = styled.div`
  background-color: ${(props) => (props.error ? "yellow" : "black")};
  white-space: pre-wrap;
`;
const CodeMessage = styled.div`
  background-color: #72cc82;
`;
const CodeAfter = styled.div`
  white-space: pre-wrap;
`;

function ExecuteSuccess({ executeResult }) {
  return (
    <ResultWrapper result={executeResult.status}>
      {executeResult.result}
    </ResultWrapper>
  );
}

function ExecuteFail({ executeResult }) {
  if (!executeResult) {
    return;
  }
  const codeLst = executeResult.code.split("\n");
  const errorLine = executeResult.linePos;
  const errorMessage = executeResult.result;
  const errorBefore = codeLst.slice(0, errorLine);
  const errorAfter = codeLst.slice(errorLine);

  return (
    <ResultWrapper>
      {errorBefore.map((element, index) => (
        <CodeBefore error={index + 1 === Number(errorLine)} key={index}>
          {element}
        </CodeBefore>
      ))}
      <CodeMessage>{errorMessage}</CodeMessage>
      {errorAfter.map((element, index) => (
        <CodeAfter key={index}>{element}</CodeAfter>
      ))}
    </ResultWrapper>
  );
}

function ExecuteResult() {
  const action = useRecoilValue(actionState);
  const executeResult = useRecoilValue(executeResultState);

  return (
    <ExecuteResultContainer action={action}>
      <ExecuteNavbar>실행결과</ExecuteNavbar>
      <TerminalWrapper result={executeResult.status}>
        <div>Jser@Terminal ~ %{/* <br /> */}</div>
        {executeResult && executeResult.status === "success" ? (
          <ExecuteSuccess executeResult={executeResult} />
        ) : (
          <ExecuteFail executeResult={executeResult} />
        )}
      </TerminalWrapper>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
