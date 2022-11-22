import styled from "styled-components";
import Center from "./Center";
import Left from "./Left";
import SubmitResult from "./submitComponents/SubmitResult";

const BodyContainer = styled.div`
  width: 100%;
  /* height: 100vh;
  max-height: 100vh; */
  flex: 1;

  display: flex;
`;

function Body() {
  return (
    <BodyContainer>
      <Left />
      <Center />

      <SubmitResult />
    </BodyContainer>
  );
}

export default Body;
