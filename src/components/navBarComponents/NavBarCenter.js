import styled from "styled-components";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { getCourseQuestions, getUserCourses } from "../../fetch";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentProblemInfoState, userState } from "../../atoms";
import { useEffect, useState } from "react";
import axios from "axios";

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

const LeftArrowBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  left: 0;
`;

const RightArrowBtn = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  right: 0;
`;

const ProblemSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.boldColor};
  text-align: center;
`;

function NavBarCenter() {
  const user = useRecoilValue(userState);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState({
    courseId: 1,
    probId: 1,
  });
  const [courses, setCourses] = useState([]);
  const [courseQuestions, setCourseQuestions] = useState([]);
  const setCurrentProblemInfo = useSetRecoilState(currentProblemInfoState);

  const { data: userCourses } = useQuery(
    "getUserCourses",
    () => getUserCourses("nickel"),
    {
      onSuccess: (data) => {
        // if (data.length > 0) {
        //   setCourses(data.keys());
        //   fetchQuestionInfo(data[courses[0]]);
        // }
      },
      onError: (error) => console.log(error),
      enabled: user.courses.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (user.courses.length > 0) {
      fetchQuestionInfo(user.courses[0]);
      // console.log(user);
    }
  }, [user]);

  const fetchQuestionInfo = async (courseId) => {
    try {
      const response = await axios.get(`/codes/problems?course_id=${courseId}`);

      if (response.data.length > 0) {
        // console.log(courseId);
        console.log(response.data);
        // console.log(JSON.parse(response.data[0].tc_close));
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
      console.log(error);
    }
  };

  const handleCourseSelect = async (event) => {
    await fetchQuestionInfo(event.target.value);
  };

  const handleProblemSelect = (event) => {
    setCurrentProblemInfo(courseQuestions[event.targt.value]);
  };

  // console.log(currentQuestionIdx);
  return (
    <NavBarCenterContainer>
      <InfoContainer>
        <ProblemSelect
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
        </ProblemSelect>
      </InfoContainer>
      <InfoContainer>
        <ProblemSelect
          value={currentQuestionIdx.probId}
          onChange={handleProblemSelect}
        >
          {courseQuestions.map((question, index) => (
            <option key={index} value={question.prob_id}>{`${
              index + 1
            }번째 문제`}</option>
          ))}
        </ProblemSelect>
      </InfoContainer>
    </NavBarCenterContainer>
  );
}

export default NavBarCenter;
