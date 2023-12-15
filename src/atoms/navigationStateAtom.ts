import { atom } from "recoil";

export const navigationState = atom<string[]>({
  key: "navigationState",
  default: [],
});
