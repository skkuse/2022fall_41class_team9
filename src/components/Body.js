import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTest } from "../fetch";
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
  useEffect(() => {
    axios
      .get("http://skku-nickel.iptime.org:8800/codes/users/")
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);
  // const { data } = useQuery("getTest", getTest, {
  //   onSuccess: (data) => console.log(data),
  //   onError: (error) => console.log(error),
  // });

  // console.log(data);

  return (
    <BodyContainer>
      <Left />
      <Center />

      <SubmitResult />
    </BodyContainer>
  );
}

export default Body;
