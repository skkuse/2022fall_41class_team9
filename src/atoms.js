import { atom } from "recoil";

export const actionState = atom({
  key: "action",
  default: "false",
});

export const themeState = atom({
  key: "themeState",
  default: true,
});

export const dialogOpenState = atom({
  key: "dialogOpenState",
  default: false,
});

export const openedContentState = atom({
  key: "openedContentState",
  default: "main",
});

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
    tag: "none",
    tc_close: "{'input' : [7, 15, 43], 'output' : [13,610,433494437]}",
    tc_open: "{'input' : [5, 10], 'output' : [5,55]}",
    title: "fibonnachi",
    writer: "adf",
  },
});

export const saveState = atom({
  key: "saveState",
  default: false,
});

export const savePartState = atom({
  key: "savePartState",
  default: 1,
});

export const executeResultState = atom({
  key: "executeResultState",
  default: "",
});

export const gradingResultState = atom({
  key: "gradingResultState",
  default: "",
});

export const submitResultState = atom({
  key: "submitResultState",
  default: {
    codeDiff: {
      answerCoder: "skadnjsandjasndjn ",
    },
    codeExplanation:
      "1. a,b = 1,1\n2. a,b = 1,2\n3. a,b = 2,3\n4. a,b = 3,5\n5. a,b = 5,8\n6. a,b = 8,13\n7. a,",
  },
});

export const testState = atom({
  key: "testState",
  default: "",
});

export const executefinishState = atom({
  key: "executefinishState",
  default: false,
});

export const fontSizeState = atom({
  key: "fontSizeState",
  default: 16,
});
