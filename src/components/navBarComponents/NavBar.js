import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getCourseQuestions,
  getPastSubmitResult,
  getQuestionInfo,
  getSkeletonCode,
  getSubmitTrial,
  getUserCourses,
  getUserInfo,
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
  const { data: userInfoData } = useQuery(
    "getUserInfo",
    () => getUserInfo("nickel"),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

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

  const { data: submitTrialData } = useQuery(
    "getSubmitTrial",
    () => getSubmitTrial(1, 1),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );
  return (
    <NavBarContainer>
      <NavBarLeft />
      <NavBarCenter />
      <NavBarRight />
    </NavBarContainer>
  );
}

export default NavBar;
