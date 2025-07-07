import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
