import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Avvvatars from "avvvatars-react";
import { usersAtom } from "../store/userAtom";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { transactionUpdateAtom } from "../store/accountAtom";
import axios from "axios";

const SendMoney = ({ user, setShowSetMoney }) => {
  const { firstName, lastName, _id } = user;
  const fullName = firstName?.charAt(0) + lastName?.charAt(0);

  const [amount, setAmount] = useState(0);
  const [sufficientBalance, setSufficientBalance] = useState(true);
  const [success, setSuccess] = useState(false);
  const [transactionUpdate, setTransactionUpdate] = useRecoilState(
    transactionUpdateAtom
  );

  const transferAmount = async (amount, _id) => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/account/transfer`;

      const response = await axios.post(
        url,
        {
          to: _id,
          amount: parseInt(amount),
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

      const data = response.data;
      console.log(data);

      if (data?.success) {
        setSuccess(true);
        setSufficientBalance(true);
        toast.success(
          `Amount Transferred to ${firstName?.toUpperCase()} ${lastName?.toUpperCase()} successfully`
        );
        setTransactionUpdate(!transactionUpdate);
      }
    } catch (error) {
      if (error.response.data?.flag === "insufficient")
        setSufficientBalance(false);

      setSuccess(false);
      toast.error(`Insufficient funds to transfer`);
    }
  };
  return (
    <div className="w-[400px] bg-slate-50 h-[350px]  py-4">
      <div className="relative ">
        <div className="text-3xl font-extrabold text-center pt-2">
          Send Money
        </div>
        <div>
          <ImCancelCircle
            className="absolute right-2 top-0 w-[25px] h-[25px] opacity-50"
            onClick={() => {
              return setShowSetMoney((prev) => !prev);
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3 pt-10 text-center px-6">
        <Avvvatars value={fullName} style="character" size={50} shadow />
        <div className="text-lg font-bold capitalize">
          {firstName} {lastName}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-y-2">
        <p className="text-sm font-medium px-6">Amount </p>
        <div className="px-6">
          <input
            type="text"
            className="py-1 px-2 w-full border border-slate-300"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="px-6 mt-4">
        <button
          className="py-2 w-full bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
          onClick={() => transferAmount(amount, _id)}
        >
          Initiate Transfer
        </button>
        {!sufficientBalance && (
          <p className="text-sm text-red-600">Insufficient Balance</p>
        )}
        {success && (
          <p className="text-sm text-green-800">Transaction Successfull</p>
        )}
      </div>
    </div>
  );
};

export default SendMoney;
