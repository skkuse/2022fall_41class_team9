import { atom } from "recoil";

// 코드 불러오기, 초기화, 복사, 다운로드에 관한 state
export const actionState = atom({
  key: "action",
  default: "false",
});
// editor 테마에 관한 state
export const themeState = atom({
  key: "themeState",
  default: true,
});
// 세부 제출결과에 관한 state
export const dialogOpenState = atom({
  key: "dialogOpenState",
  default: false,
});
//
export const openedContentState = atom({
  key: "openedContentState",
  default: "main",
});
// 사용자 정보 관한 state
export const userState = atom({
  key: "userState",
  default: {
    courses: [1, 2, 3],
    password: "1234",
    setting_font: "C",
    setting_theme: "Dark",
    user_id: 10,
    username: "eric",
  },
});
// 사용자가 선택한 문제 정보에 관한 state
export const currentProblemInfoState = atom({
  key: "currentProblemState",
  default: {
    answer_code:
      "def solution(n): \\n a,b = 1,1 \\n if n==1 or n==2: \\n return 1 \\n for i in range(1,n): \\n a,b = b, a+b \\n return a",
    constraint: "N is given in the first line. N < 45",
    course_id: 1,
    deadline: "2022-03-12",
    description:
      "Fibonacci numbers start with 0 and 1. 0th fibonacci number is 0, 1st fibonacci number is 1. Fibonacci numbers appearing after is the addition of previous two numbers. When you write fibonacci numbers until n=17 , the sequence is 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597. Given n, return the nth fibonacci number",
    max_submission: 3,
    prob_id: 1,
    skeleton: "def solution(arr): \\n    answer = \\n\\n    return answer",
    tc_close: "{'input' : [7, 15, 43], 'output' : [13,610,433494437]}",
    tag: "none",
    tc_open: "{'input' : [5, 10], 'output' : [5,55]}",
    title: "fibonnachi",
    writer: "asf",
  },
});

// export const saveState = atom({
//   key: "saveState",
//   default: false,
// });

// 현재 작업중인 editor에 관한 state
export const savePartState = atom({
  key: "savePartState",
  default: 1,
});
// 실행 결과에 관한 state
export const executeResultState = atom({
  key: "executeResultState",
  default: "",
});
// 채점 결과에 관한 state
export const gradingResultState = atom({
  key: "gradingResultState",
  default: "",
});
// 제출 결과에 관한 state
export const submitResultState = atom({
  key: "submitResultState",
  default: {
    codeDiff: {
      answerCoder: "skadnjsandjasndjn ",
    },
    codeExplanation: "no explanation for this problem",
  },
});
// 현재 작업 중인 editor에 저장된 code에 관한 state
export const testState = atom({
  key: "testState",
  default: "",
});
//
export const executefinishState = atom({
  key: "executefinishState",
  default: false,
});
// 사용자가 설정한 fontsize에 관한 state
export const fontSizeState = atom({
  key: "fontSizeState",
  default: 16,
});
//
export const editorAtomState = atom({
  key: "editorAtomState",
  default: null,
});
// 제출 실행 결과 유무에 관한 state
export const doneSubmitState = atom({ key: "doneSubmit", default: false });
