// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  console.log("ProtectedRoute check:", { user, isLoading, path: location.pathname });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("Redirecting to /login from ProtectedRoute");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;