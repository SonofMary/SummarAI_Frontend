import React from "react";
import { Navigate } from "react-router-dom";
import { UseAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = UseAuth();

  // Optionally handle loading state
  if (user === undefined) return null;

  // If no user, redirect to Sign In page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // If logged in, render the protected content
  return children;
}

export default ProtectedRoute;
