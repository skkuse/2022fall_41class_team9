import styled from "styled-components";
import Center from "./center/Center";
import Left from "./left/Left";
import Right from "./right/Right";
import SubmitResult from "./submitComponents/SubmitResult";

const BodyContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
`;

const event = new Event("dragResize");

function Body() {
  return (
    <BodyContainer>
      <Left event={event} />
      <Center />
      <Right event={event} />

      <SubmitResult />
    </BodyContainer>
  );
}

export default Body;
