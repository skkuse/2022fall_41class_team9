import axios from "axios";

const baseUrl = "/codes";

// export const getUsers = () => axios.get("/codes/users").then(res=>)

export const getUserInfo = (userName) =>
  axios.get(`/codes/user?user_name=${userName}`).then((res) => res.data);

export const getUserCourses = (userName) =>
  axios.get(`/codes/userCourse?user_name=${userName}`).then((res) => res.data);

export const getCourseQuestions = (courseId) =>
  axios.get(`/codes/problems?course_id=${courseId}`).then((res) => res.data);

export const getQuestionInfo = (problemId) =>
  axios.get(`/codes/problem?problem_id=${problemId}`).then((res) => res.data);

export const getSkeletonCode = (problemId) =>
  axios.get(`/codes/skeleton?problem_id=${problemId}`).then((res) => res.data);

export const getPastSubmitResult = (userId, probId) =>
  axios
    .get(
      `/codes/submission?submit_id=${""}&user_id=${userId}&prob_id=${probId}`
    )
    .then((res) => res.data);

export const getSubmitTrial = (userId, problemId) =>
  axios
    .get(`/codes/submission/count?user_id=${userId}&problem_id=${problemId}`)
    .then((res) => res.data);
export const executeCode = (code) =>
  axios.post("url", { code }).then((res) => res.data);
