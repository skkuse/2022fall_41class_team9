import { atom } from "recoil";

export const actionState = atom({
  key: "action",
  default: "execute",
});

export const themeState = atom({
  key: "themeState",
  default: "dark",
});
