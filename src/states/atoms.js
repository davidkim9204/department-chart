import { atom } from "recoil";

export const searchInputState = atom({
  key: "searchInputState",
  default: "",
});

export const selectDepartmentState = atom({
  key: "selectDepartmentState",
  default: { code: "11003", name: "대표", parentCode: "10000" },
});
