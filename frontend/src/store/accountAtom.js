import { atom } from "recoil";
export const balanceAtom = atom({
  key: "balanceAtom",
  default: {
    balance: 0,
  },
});

export const transactionUpdateAtom = atom({
  key: "transactionUpdateAtom",
  default: false,
});
