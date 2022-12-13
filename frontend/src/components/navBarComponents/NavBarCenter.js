import styled from "styled-components";
import { getQuestionInfo, getUserCourses } from "../../fetch";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentProblemInfoState,
  selectedCourseState,
  userState,
} from "../../atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NavBarCenterContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const InfoContainer = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 10px;
  height: 60%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.boldColor};
`;

const ProblemSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.boldColor};
  text-align: center;
`;

const questionChangeEvent = new Event("questionChange");

function NavBarCenter() {
  const { courseName, probId } = useParams();

  // 사용자 정보 관한 state
  const user = useRecoilValue(userState);
  // 현재 과목과 그 과목에 대한 문제 index에 관한 state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState({
    courseId: 1,
    probId: 1,
  });
  // 문제 설명에 관한 state
  const [courseQuestions, setCourseQuestions] = useState([]);
  // 사용자가 선택한 문제 정보에 관한 state
  const setCurrentProblemInfo = useSetRecoilState(currentProblemInfoState);

  const { data: userCourses } = useQuery(
    "getUserCourses",
    () => getUserCourses("nickel"),
    {
      onError: (error) => {
        alert(
          "데이터를 읽어오는 과정에서 문제가 생겼습니다. 프로그램을 다시 실행해주세요."
        );
      },
      enabled: user.courses.length > 0,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const { data: questionInfo } = useQuery(
    "getQuestionInfo",
    () => getQuestionInfo(probId),
    {
      onSuccess: (data) => {
        // console.log(data);
        setCurrentProblemInfo(data);
      },
      onError: (error) => console.log(error),
    }
  );
  // useEffect(() => {
  //   if (user.courses.length > 0) {
  //     fetchQuestionInfo(user.courses[0]);
  //   }
  // }, [user]);
  // 문제 정보 가져오기
  const fetchQuestionInfo = async (courseId) => {
    try {
      const response = await axios.get(`/codes/problems?course_id=${courseId}`);
      if (response.data.length > 0) {
        setCourseQuestions(response.data);
        setCurrentQuestionIdx({
          courseId: courseId,
          probId: response.data[0].prob_id,
        });
        setCurrentProblemInfo(response.data[0]);
      } else {
        alert("해당과목에 문제가 없습니다.");
      }
    } catch (error) {
      alert(
        "데이터를 읽어오는 과정에서 문제가 생겼습니다. 프로그램을 다시 실행해주세요."
      );
    }
  };
  // 과목 선택
  // const handleCourseSelect = async (event) => {
  //   await fetchQuestionInfo(event.target.value);
  // };
  // 과목에 대한 문제 선택
  // const handleProblemSelect = (event) => {

  //   setCurrentQuestionIdx((prev) => {
  //     return { ...prev, probId: event.target.value };
  //   });

  //   console.log(
  //     courseQuestions.find(
  //       (question) => question.prob_id.toString() === event.target.value
  //     )
  //   );

  //   setCurrentProblemInfo(
  //     courseQuestions.find(
  //       (question) => question.prob_id.toString() === event.target.value
  //     )
  //   );
  //   dispatchEvent(questionChangeEvent);
  //   // setCurrentProblemInfo(courseQuestions[event.targt.value]);
  // };

  return (
    <NavBarCenterContainer>
      <InfoContainer>
        {courseName}
        {/* <ProblemSelect
          onChange={handleCourseSelect}
          value={currentQuestionIdx.courseId}
        >
          {userCourses ? (
            Object.keys(userCourses).map((course) => (
              <option
                key={userCourses[course].course_id}
                value={userCourses[course].course_id}
              >
                {course}
              </option>
            ))
          ) : (
            <option value="" disabled>
              None
            </option>
          )}
        </ProblemSelect> */}
      </InfoContainer>
      <InfoContainer>
        {/* <ProblemSelect
          value={currentQuestionIdx.probId}
          onChange={handleProblemSelect}
        >
          {courseQuestions.map((question, index) => (
            <option key={index} value={question.prob_id}>{`${
              index + 1
            }번째 문제`}</option>
          ))}
        </ProblemSelect> */}
        {questionInfo && questionInfo.title}
      </InfoContainer>
    </NavBarCenterContainer>
  );
}

export default NavBarCenter;
