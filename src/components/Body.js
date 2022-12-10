import styled from "styled-components";
import Center from "./Center";
import Left from "./Left";
import SubmitResult from "./submitComponents/SubmitResult";

const BodyContainer = styled.div`
  width: 100%;
  /* height: 100vh;
  max-height: 100vh; */
  flex: 1;
  /* overflow: hidden; */
  display: flex;
`;
// const Center = lazy(() => import("./Center"));
function Body() {
  return (
    <BodyContainer>
      <Left />
      {/* <Suspense fallback={<div>Loading... </div>}> */}
      <Center />
      {/* </Suspense> */}

      <SubmitResult />
    </BodyContainer>
  );
}

export default Body;
