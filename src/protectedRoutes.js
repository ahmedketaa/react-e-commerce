import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
