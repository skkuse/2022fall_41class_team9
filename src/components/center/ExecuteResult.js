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
`;

const ResultWrapper = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;
const CodeBefore = styled.div`
  background-color: ${(props) => (props.error ? "#eb4034" : "black")};
  white-space: pre-wrap;
`;
const CodeMessage = styled.div`
  background-color: #49eb71;
`;
const CodeAfter = styled.div`
  white-space: pre-wrap;
  background-color: black;
`;

const LineNumberViewer = styled.div`
  width: 50px;
  display: inline-block;
`;
const LineNumberDivider = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

function ExecuteSuccess({ executeResult }) {
  return <ResultWrapper>{executeResult.result}</ResultWrapper>;
}

function ExecuteFail({ executeResult }) {
  if (!executeResult) return;
  const codeLst = executeResult.code.split("\n");
  console.log(codeLst);
  const errorLine = executeResult.linePos;
  const errorMessage = executeResult.result;
  const errorBefore = codeLst.slice(0, errorLine);
  const errorAfter = codeLst.slice(errorLine);

  return (
    <ResultWrapper>
      {errorBefore.map((element, index) => (
        <>
          <CodeBefore error={index + 1 === Number(errorLine)} key={index}>
            <LineNumberViewer>{`${index}`}</LineNumberViewer>
            <LineNumberDivider>|</LineNumberDivider>
            {element === "" ? "\n" : element}
          </CodeBefore>
        </>
      ))}
      <CodeMessage>{errorMessage}</CodeMessage>
      {errorAfter.map((element, index) => (
        <CodeAfter key={index}>
          <LineNumberViewer>{`${errorLine + index}`}</LineNumberViewer>
          <LineNumberDivider>|</LineNumberDivider>
          {element === "" ? "\n" : element}
        </CodeAfter>
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
      <TerminalWrapper>
        Jser@Terminal ~ %
        <br />
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
