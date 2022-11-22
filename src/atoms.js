import { atom } from "recoil";

export const actionState = atom({
  key: "action",
  default: "execute",
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
