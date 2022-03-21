import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { storeData: user } = useSelector((state) => state.userLogin);
  return user ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
