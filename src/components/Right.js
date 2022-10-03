import styled from "styled-components";
import SubmitResult from "./rightComponents/submitComponents/SubmitResult";

const RightContainer = styled.div`
  background-color: bisque;
  flex: 1;
`;

function Right() {
  return (
    <RightContainer>
      <SubmitResult />
    </RightContainer>
  );
}

export default Right;
