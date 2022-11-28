import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
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
  // const { data: userInfoData } = useQuery(
  //   "getUserInfo",
  //   () => getUserInfo("nickel"),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  // const { data: userCoursesData } = useQuery(
  //   "getUserCourses",
  //   () => getUserCourses("nickel"),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  // const { data: questionsData } = useQuery(
  //   "getCourseQuestions",
  //   () => getCourseQuestions(1),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  // const { data: questionData } = useQuery(
  //   "getQuestionInfo",
  //   () => getQuestionInfo(1),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );
  // const { data: skeletonData } = useQuery(
  //   "getSkeletonCode",
  //   () => getSkeletonCode(1),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  // const { data: submitResultData } = useQuery(
  //   "getPastSubmitResult",
  //   () => getPastSubmitResult(1, 1),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  // const { data: submitTrialData } = useQuery(
  //   "getSubmitTrial",
  //   () => getSubmitTrial(1, 1),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  // const { mutate } = useMutation(
  //   () =>
  //     submitCode({
  //       user_id: 1,
  //       prob_id: 1,
  //       user_code:
  //         "def solution(n):\n\n    a,b = 1,1\n    if n==1 or n==2:\n        return 1\n\n    for i in range(1,n):\n        a,b = b, a+b\n\n    print(a)\n    return a\nprint(solution(10))",
  //       user_output: "useroutput",
  //       counter: 0,
  //     }),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );

  const { mutate } = useMutation(() => getAnalysis(1), {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  // const { mutate } = useMutation(
  //   () => executeCode({ user_code: "print('hello')\nprint('world')" }),
  //   {
  //     onSuccess: (data) => console.log(data),
  //     onError: (error) => console.log(error),
  //   }
  // );
  // useEffect(() => {
  //   mutate();
  // }, []);
  return (
    <NavBarContainer>
      <button
        onClick={() => {
          mutate();
        }}
      >
        제발
      </button>
      <NavBarLeft />
      <NavBarCenter />
      <NavBarRight />
    </NavBarContainer>
  );
}

export default NavBar;
