import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import CreatePromoCode from '../components/CreatePromoCode';
import AddCategory from '../components/AddCategory';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/create-promo"
      element={
        <ProtectedRoute>
          <CreatePromoCode />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-category"
      element={
        <ProtectedRoute>
          <AddCategory />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
