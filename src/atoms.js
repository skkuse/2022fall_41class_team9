import { atom } from "recoil";

export const actionState = atom({
  key: "action",
  default: "execute",
});
