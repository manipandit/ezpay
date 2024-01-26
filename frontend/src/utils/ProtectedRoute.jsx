import React from "react";
// import { useRecoilValue } from "recoil";
// import { currentUserAtom } from "../store/userAtom";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const jwt = localStorage.getItem("jwt");

  let location = useLocation();
  const navigate = useNavigate();

  if (jwt === null) {
    navigate("/signin");
  }
  return children;
};

export default ProtectedRoute;
