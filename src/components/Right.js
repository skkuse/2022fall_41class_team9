import styled from "styled-components";
import ExecuteResult from "./rightComponents/executeComponents/ExecuteResult";
import SubmitResult from "./rightComponents/submitComponents/SubmitResult";

const RightContainer = styled.div`
  background-color: #3b5939;
  flex: 1;
  border-left: 1px solid #f7f7b8; ;
`;

function Right() {
  return (
    <RightContainer>
      {/* <SubmitResult /> */}
      <ExecuteResult />
    </RightContainer>
  );
}

export default Right;
