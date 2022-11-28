import axios from "axios";
import { lazy, Suspense, useEffect } from "react";

import styled from "styled-components";
import { getCourseInfo, getQuestionInfo, getTest, getUserInfo } from "../fetch";
import Center from "./Center";

import Left from "./Left";
import SubmitResult from "./submitComponents/SubmitResult";

const BodyContainer = styled.div`
  width: 100%;
  /* height: 100vh;
  max-height: 100vh; */
  flex: 1;
  overflow: hidden;
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
