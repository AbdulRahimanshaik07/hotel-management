
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();

  // Define token keys for each role
  const tokenKeys = {
    admin: "adminToken",
    warden: "wardenToken",
    student: "studentToken",
  };

  // Get token based on role
  const token = localStorage.getItem(tokenKeys[role]);

  // Redirect URLs based on role
  const loginRoutes = {
    admin: "/login/admin",
    warden: "/login/warden",
    student: "/login/student",
  };

  // If no token found → redirect to correct login
  if (!token) {
    return <Navigate to={loginRoutes[role]} state={{ from: location }} replace />;
  }

  // ✅ If token exists, allow access
  return children;
}
