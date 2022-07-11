import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PublicRoute = () => {
  const authContext = useContext(AuthContext);
  return authContext?.user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
