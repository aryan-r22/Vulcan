import React from "react";
import { Navigate, Route } from "react-router-dom";

type Props = {
  Component: React.ElementType;
};

const PrivateRoute = ({ Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      element={true ? <Component /> : <Route path="*" element={<Navigate to="/login" replace />} />}
    />
  );
};

export default PrivateRoute;
