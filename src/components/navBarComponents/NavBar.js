import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../../atoms";

import {
  executeCode,
  getAnalysis,
  getCourseQuestions,
  getPastSubmitResult,
  getQuestionInfo,
  getSkeletonCode,
  getSubmitTrial,
  getUserCourses,
  getUserInfo,
  submitCode,
} from "../../fetch";
import NavBarCenter from "./NavBarCenter";
import NavBarLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";

const NavBarContainer = styled.header`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

function NavBar() {
  const setUser = useSetRecoilState(userState);

  const { data: userInfoData } = useQuery(
    "getUserInfo",
    () => getUserInfo("kang"),
    {
      onSuccess: (data) => {
        setUser(data);

        console.log(data);
      },
      onError: (error) => console.log(error),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <NavBarContainer>
      {/* <button
      // onClick={() => {
      //   mutate();
      // }}
      >
        제발
      </button> */}
      <NavBarLeft />
      <NavBarCenter />
      <NavBarRight />
    </NavBarContainer>
  );
}

export default NavBar;
