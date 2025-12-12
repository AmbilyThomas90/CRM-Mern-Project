import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Protects nested routes. If token missing -> redirect to /login
 */
export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
      // <Navigate> replaces current history entry and navigates to /login
    return <Navigate to="/login" replace />;
  }
    // If token exists, render child routes inside <Outlet />
  // This allows nested routes defined in React Router to be displayed
  return <Outlet />;
}
