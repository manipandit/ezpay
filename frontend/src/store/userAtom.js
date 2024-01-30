import { atom } from "recoil";
export const signupAtom = atom({
  key: "signupAtom",
  default: {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  },
});

export const signinAtom = atom({
  key: "signinAtom",
  default: {
    username: "",
    password: "",
  },
});

export const currentUserAtom = atom({
  key: "currentUserAtom",
  default: {
    firstName: "",
    lastName: "",
    username: "",
  },
});
export const usersAtom = atom({
  key: "usersAtom",
  default: [],
});

export const searchAtom = atom({
  key: "searchAtom",
  default: "",
});

export const isLoadingAtom = atom({
  key: "isLoadingAtom",
  default: true,
});
