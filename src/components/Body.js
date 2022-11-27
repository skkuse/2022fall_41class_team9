import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
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
