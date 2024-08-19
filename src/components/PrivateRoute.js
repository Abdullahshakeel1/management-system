import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const emailLocal = localStorage.getItem("emailLocal");
  const passLocal = localStorage.getItem("passLocal");

  if (!emailLocal || !passLocal) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested component
  return children;
};

export default ProtectedRoute;
