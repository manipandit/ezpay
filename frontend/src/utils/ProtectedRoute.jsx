import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const jwt = localStorage.getItem("jwt");
  return <>{jwt ? <Outlet /> : <Navigate to={"/signin"} />}</>;
};

export default ProtectedRoute;
