import { useRecoilValue, useRecoilState } from "recoil";
import styled from "styled-components";
import { actionState, executeResultState } from "../../../atoms";

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
`;
function ExecuteResult() {
  const action = useRecoilValue(actionState);
  const [executeResult, setExecuteResult] = useRecoilState(executeResultState);

  return (
    <ExecuteResultContainer action={action}>
      <ExecuteNavbar>실행결과</ExecuteNavbar>
      <ExecuteText>
        Jser@Terminal ~ %
        <br />
        {/* {JSON.stringify(executeResult)} */}
      </ExecuteText>
    </ExecuteResultContainer>
  );
}

export default ExecuteResult;
