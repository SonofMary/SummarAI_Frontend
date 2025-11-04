import React from "react";
import { Navigate } from "react-router-dom";
import { UseAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user, token} = UseAuth();

  // Optionally handle loading state
  if (user === undefined) return null;

  // If no user, redirect to Sign In page
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // If logged in, render the protected content
  return children;
}

export default ProtectedRoute;
