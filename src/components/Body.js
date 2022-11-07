import styled from "styled-components";
import Center from "./Center";
import Left from "./Left";
import Right from "./Right";

const BodyContainer = styled.div`
  width: 100%;
  flex: 1;
  background-color: bisque;
  display: flex;
`;

function Body() {
  return (
    <BodyContainer>
      <Left />
      <Center />
      {/* <Right /> */}
    </BodyContainer>
  );
}

export default Body;
