import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinAtom } from "../store/userAtom";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const Signin = () => {
  const [signinValue, setSigninValue] = useRecoilState(signinAtom);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const signin = async () => {
    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${baseUrl}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinValue),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("User signed in successfully");
        localStorage.setItem("jwt", data.token);
        setSigninValue({
          username: "",
          password: "",
        });
        navigate("/dashboard");
      }
      if (data?.flag === "Incorrect Password") {
        setIsPasswordCorrect(!isPasswordCorrect);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200 absolute top-0 z-[-2] transform  bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="w-[350px] md:w-[380px] h-[410px] bg-slate-50 rounded-md py-4 px-8 border border-slate-300">
        <div className="text-center text-3xl font-extrabold ">Sign In</div>
        <p className="text-center text-base  text-gray-600 pt-2 font-medium">
          Enter your credentials to access your account
        </p>
        <div className="flex flex-col gap-y-4 pt-6">
          <div className="flex flex-col gap-y-2">
            {!isPasswordCorrect && (
              <p className="text-red-600 text-sm">Password is incorrect</p>
            )}
            <label htmlFor="email" className="text-sm font-bold">
              Email
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              id="email"
              className="p-2 border border-slate-300"
              value={signinValue.username}
              onChange={(e) => {
                return setSigninValue((prev) => {
                  return {
                    ...prev,
                    username: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="pwd" className="text-sm font-bold">
              Password
            </label>
            <input
              type="text"
              id="pwd"
              className="p-2 border border-slate-300"
              value={signinValue.password}
              onChange={(e) => {
                return setSigninValue((prev) => {
                  return {
                    ...prev,
                    password: e.target.value,
                  };
                });
              }}
            />
          </div>
          {isLoading ? (
            <ScaleLoader color="black" className="flex justify-center" />
          ) : (
            <button
              className="w-full rounded-md bg-black text-white p-2
          "
              onClick={signin}
            >
              Sign In
            </button>
          )}
          <p className="text-center font-semibold">
            Don't have an account?
            <span className="underline">
              <Link to={"/signup"}>Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
