import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  return authContext?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
