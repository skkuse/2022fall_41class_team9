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

const ExecuteText = styled.div`
  width: 100%;
  color: white;
  white-space: pre-line;
  margin: 8px;
`;

function ExecuteResult() {
  // 코드 불러오기, 초기화, 복사, 다운로드에 관한 state
  const action = useRecoilValue(actionState);
  // 실행 결과에 관한 state
  const executeResult = useRecoilValue(executeResultState);
  // 성공한 실행 결과 보여주기
  const showExecuteSuccess = () => {
    if (executeResult) {
      return <div>{executeResult.result}</div>;
    }
  };
  // 실패한 실행 결과 보여주기
  const showExecuteFail = () => {
    if (executeResult) {
      // 사룡자가 실행한 코드
      const userCode = executeResult.code;
      const codeLst = userCode.split("\n");
      // error 발생 line
      const errorLine = executeResult.linePos;
      // error 메세지
      const errorMessage = executeResult.result;
      const errorBefore = codeLst.slice(0, errorLine);
      const errorAfter = codeLst.slice(errorLine);
      return (
        <>
          {errorBefore.map((element, index) => (
            <div
              key={index}
              style={{
                backgroundColor:
                  index + 1 === Number(errorLine) ? "#E67BA4" : "black",
                whiteSpace: "pre-wrap",
              }}
            >
              {element}
            </div>
          ))}
          <div style={{ backgroundColor: "#72CC82" }}>{errorMessage}</div>
          {errorAfter.map((element, index) => (
            <div style={{ whiteSpace: "pre-wrap" }} key={index}>
              {element}
            </div>
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
