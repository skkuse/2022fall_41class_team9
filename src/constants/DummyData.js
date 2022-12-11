export const DUMMY_DATA = {
  question:
    "피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 수의 합이 된다. 그래서 어렵다. n번째 피보나치수를 리턴하시오",
  constraint: "0<=n<=80\n  리턴타입이 int가 아니라는 것에 주의!",
  testCases: [
    { input: "solution(0)", output: 0 },
    { input: "solution(3)", output: 2 },
  ],
  due: "2일 13시간 20분 남았습니다.",
};

export const ERROR_CODE_RESULT = {
  codeDiff: [],
  codeExplanation: "코드에 에러가 존재합니다.",
  efficiency: [
    { id: "LOC", moreInfo: [], score: 0 },
    { id: "halstead", moreInfo: [], score: 0 },
    { id: "CFC", moreInfo: [], score: 0 },
    { id: "DFC", moreInfo: [], score: 0 },
  ],
  functionality: [
    { id: 1, status: "fail", input: 0, output: 0, userOutput: "error" },
    { id: 2, status: "fail", input: 0, output: 0, userOutput: "error" },
    { id: 3, status: "fail", input: 0, output: 0, userOutput: "error" },
    { id: 4, status: "fail", input: 0, output: 0, userOutput: "error" },
    { id: 5, status: "fail", input: 0, output: 0, userOutput: "error" },
  ],
  readabilityType: [
    { id: "eradicate", score: 0, moreInfo: [] },
    { id: "mccabe", score: 0, moreInfo: [] },
    { id: "mypy", score: 0, moreInfo: [] },
    { id: "pycodestyle", score: 0, moreInfo: [] },
    { id: "pydocstyle", score: 0, moreInfo: [] },
    { id: "pyflakes", score: 0, moreInfo: [] },
    { id: "pylint", score: 0, moreInfo: [] },
    { id: "isort", score: 0, moreInfo: [] },
  ],
};
