import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../User/UserContext';

const ProtectedRoute = () => {
  const { user, isLoading } = useUserContext();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;