import axios from "axios";

const baseUrl = "/codes";

// export const getUsers = () => axios.get("/codes/users").then(res=>)

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const getUserInfo = (userName) =>
  axios.get(`/codes/user?user_name=${userName}`).then((res) => res.data);

export const putUserUI = (UIInfo) =>
  axios.put(`/codes/user/ui/`, UIInfo).then((res) => res.data);

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

export const validateTestCase = (user_code, prob_id, tc_num) => {
  // console.log({ user_code, prob_id, tc_num });
  return axios
    .post(`/onlinejudge/validate/`, { user_code, prob_id, tc_num })
    .then((res) => res.data);
};

export const executeCode = (codeInfo) =>
  axios.post("/onlinejudge/execute/", codeInfo).then((res) => res.data);

export const gradeCode = (user_code, prob_id) =>
  axios
    .post("/onlinejudge/grade/", { user_code, prob_id })
    .then((res) => res.data);

export const submitCode = (submitData) =>
  axios.post("/codes/submission/", submitData).then((res) => res.data);

export const getAnalysis = (submitId) =>
  axios.get(`/onlinejudge/analysis2/${submitId}`).then((res) => res.data);

export const searchRelated = (tag) =>
  axios.get(`codes/search?tag=${tag}`).then((res) => res.data);
