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

export const currentProblemState = atom({
  key: "currentProblemState",
  default: {},
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
  default: "",
});

export const codeState = atom({
  key: "codeState",
  dafault: "",
});
