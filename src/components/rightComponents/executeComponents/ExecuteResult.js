import { alertTitleClasses } from "@mui/material";
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
  margin: 8px;
`;
function ExecuteResult({ editorCode }) {
  let code = "";
  const action = useRecoilValue(actionState);
  const [executeResult, setExecuteResult] = useRecoilState(executeResultState);
  const [test, setTest] = useRecoilState(testState);
  const [executeFinish, setExecuteFinish] = useRecoilState(executefinishState);
  const showExecuteResult = () => {
    if (executeResult.status === "success") {
      return <div>{executeResult.result}</div>;
    } else if (executeResult.status === "fail") {
      const errorLine = executeResult.linePos;
      const errorMessage = executeResult.result;
      const userCode = editorCode.current.getValue();
      // console.log(errorLine);
      console.log(userCode);
      // console.log(userCode[10]);
      let codeLst = userCode.split("\n");
      let errorBefore = codeLst.slice(0, errorLine);
      let errorAfter = codeLst.slice(errorLine);

      errorBefore.forEach((element) => {
        const separator = "\n";
        if (code.length === 0) {
          code = code + element;
        } else {
          code = code + separator + element;
        }
      });
      code = code + "\r" + errorMessage;
      errorAfter.forEach((element) => {
        const separator = "\n";
        if (code.length === 0) {
          code = code + element;
        } else {
          code = code + separator + element;
        }
      });
      setTest(code);
      // setExecuteFinish(true);
      console.log(code);

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
        {code}
      </ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
