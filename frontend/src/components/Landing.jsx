import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
        <div className="px-6 md:px-0 flex flex-col items-center justify-start mt-48 max-w-[680px] mx-auto">
          <div className=" text-center md:text-left text-4xl md:text-6xl tracking-wide font-medium ">
            Welcome to EZ Pay
          </div>
          <p className=" text-base md:text-lg font-medium opacity-80  pt-6 text-center">
            At EZ Pay, we believe in simplifying financial transactions. Our
            platform is designed to make sending and receiving money
            hassle-free. Whether you're splitting bills with friends or paying
            for services, EZ Pay is your go-to solution.
          </p>
          <div className="flex gap-x-10 mt-10">
            <button
              className="bg-[#121212] hover:bg-[#000000] px-4 py-2 text-white rounded-lg"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="bg-slate-50 hover:bg-slate-100 px-4 py-2 border border-gray-400 rounded-lg"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="bg-slate-50 hover:bg-slate-100 px-4 py-2 border border-gray-400 rounded-lg"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
