import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { actionState, executeResultState } from "../../atoms";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
const ExecuteResultContainer = styled.div`
  height: 100%;
  display: ${(props) => (props.action === "execute" ? "block" : "none")};
`;

const ExecuteNavbar = styled.div`
  width: 100%;
  /* height: 25px; */
  background-color: black;
  color: #97a6b2;
  box-sizing: border-box;
  padding: 10px;
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
`;

const TerminalDivider = styled.hr`
  border: 0px;
  border-top: 3px dashed white;
  width: 100%;
`;

const ErrorCodeTitle = styled.div`
  margin: 20px;
`;

const CodeBefore = styled.div`
  background-color: ${(props) => (props.error ? "#eb4034" : "black")};
  white-space: pre-wrap;
  padding: 3px;
`;
const CodeMessage = styled.div`
  background-color: #43a151;
  padding: 3px;
  padding-left: 12px;
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
  // console.log(executeResult);
  const errorLine = executeResult.linePos;
  const errorMessage = executeResult.result;
  const errorBefore = codeLst.slice(0, errorLine);
  let errorAfter = "";
  if (errorLine) {
    errorAfter = codeLst.slice(errorLine);
  } else {
    errorAfter = [];
  }

  console.log(codeLst, errorLine);
  return (
    // 실행 실패 시 error line을 기준으로 errorBefore와 errorAfter로 나눈다
    <ResultWrapper>
      <TerminalDivider />
      <ErrorCodeTitle>에러 위치 확인</ErrorCodeTitle>
      {errorBefore.map((element, index) => (
        <>
          <CodeBefore error={index + 1 === Number(errorLine)} key={index}>
            <LineNumberViewer>{`${index}`}</LineNumberViewer>
            {index + 1 === Number(errorLine) ? (
              <EmojiObjectsIcon
                sx={{ color: "yellow", position: "relative", right: "10px" }}
              ></EmojiObjectsIcon>
            ) : (
              <LineNumberDivider>|</LineNumberDivider>
            )}

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
  // 코드 불러오기, 초기화, 복사, 다운로드에 관한 state
  const action = useRecoilValue(actionState);
  // 실행 결과에 관한 state
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
