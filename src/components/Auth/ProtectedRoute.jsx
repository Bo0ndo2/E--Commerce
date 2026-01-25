import React from 'react'

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  // لو مش عامل login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // لو عامل login
  return children;
};

export default ProtectedRoute;
