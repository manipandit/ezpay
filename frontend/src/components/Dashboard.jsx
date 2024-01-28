import React, { useEffect, useState } from "react";
import User from "./User";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  signupAtom,
  currentUserAtom,
  usersAtom,
  searchAtom,
} from "../store/userAtom";
import { balanceAtom, transactionUpdateAtom } from "../store/accountAtom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Avvvatars from "avvvatars-react";
import { ScaleLoader } from "react-spinners";

const Dashboard = () => {
  const jwt = localStorage.getItem("jwt");
  const userInfo = useRecoilValue(signupAtom);

  const [balanceValue, setBalanceValue] = useState(0);
  const transactionUpdate = useRecoilValue(transactionUpdateAtom);
  const [currentUserValue, setCurrentUserValue] =
    useRecoilState(currentUserAtom);
  const [users, setUsers] = useRecoilState(usersAtom);
  const [search, setSearch] = useRecoilState(searchAtom);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const fetchBalance = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${baseUrl}/account/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    const data = await response.json();

    if (data) {
      if (data?.balance !== balanceValue.balance) {
        setBalanceValue(data.balance);
      }
    }
  };

  const getCurrentUser = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${baseUrl}/user/currentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    const data = await response.json();

    if (data) {
      setCurrentUserValue({
        firstName: data.currentUser?.firstName,
        lastName: data.currentUser?.lastName,
        username: data.currentUser?.username,
      });
    }
  };

  const findUsers = async (e) => {
    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${baseUrl}/user/bulk?filter=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jwt) {
      fetchBalance();
    } else {
      // Redirect to signin page if JWT is null
      navigate("/signin");
    }
  }, [transactionUpdate, jwt]);

  useEffect(() => {
    if (jwt) {
      getCurrentUser();
    } else {
      // Redirect to signin page if JWT is null
      navigate("/signin");
    }
  }, []);
  useEffect(() => {
    if (jwt) {
      findUsers();
    } else {
      // Redirect to signin page if JWT is null
      navigate("/signin");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    toast.remove("Logged out");
    navigate("/signin");
  };
  return (
    <div className="w-full ">
      <div className="h-20 md:h-16 p-2 md:p-4 border-b  ">
        <div className="flex justify-between items-center px-2 md:px-4">
          <div className="text-base md:text-2xl font-extrabold">
            EZ Payments
          </div>
          <div className="flex gap-x-20 items-center ml-8 md:ml-0">
            <div className="text-xs md:text-base font-medium flex items-center gap-x-2">
              Hello,{" "}
              <span className="font-bold capitalize">
                {currentUserValue?.firstName}{" "}
                <span className="capitalize">{currentUserValue?.lastName}</span>
              </span>
              <Avvvatars
                value={
                  currentUserValue?.firstName.charAt(0) +
                  currentUserValue?.lastName.charAt(0)
                }
                style="character"
                size={30}
                shadow
              />
            </div>
            <div>
              <button
                className="w-fit md:w-full text-sm bg-black text-white px-2 md:px-4 py-2 rounded-md"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* balance */}
      <div className="p-4 flex gap-x-4 items-center">
        <div className="text-xl font-bold px-4 text-center md:text-left">
          Your Balance
        </div>
        <div>
          <span className="text-xl font-bold">${balanceValue.toFixed(4)}</span>
        </div>
      </div>

      {/* users */}
      <div className="p-4">
        <div className="px-4">
          <div className="text-xl font-bold">Users</div>
          <div className="w-full pt-4">
            <input
              type="text"
              placeholder="Search users.."
              id="search"
              value={search}
              className="py-2 px-4 border border-slate-300 w-full focus:outline-slate-300"
              onChange={(e) => {
                console.log(search);
                setSearch(e.target.value);
                findUsers();
              }}
            />
          </div>
          {isLoading ? (
            <ScaleLoader color="black" className="flex justify-center" />
          ) : (
            <div className="mt-10 flex flex-col gap-y-7">
              {users.map((user) => {
                return <User user={user} key={user.username} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
