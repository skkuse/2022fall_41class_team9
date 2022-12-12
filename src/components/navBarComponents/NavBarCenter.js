import styled from "styled-components";
import { getUserCourses } from "../../fetch";
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

  const [courseQuestions, setCourseQuestions] = useState([]);
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

  useEffect(() => {
    if (user.courses.length > 0) {
      fetchQuestionInfo(user.courses[0]);
    }
  }, [user]);

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

  const handleCourseSelect = async (event) => {
    await fetchQuestionInfo(event.target.value);
  };

  const handleProblemSelect = (event) => {
    setCurrentProblemInfo(courseQuestions[event.targt.value]);
  };

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
