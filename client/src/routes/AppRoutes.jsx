import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Landing from '../pages/Landing';
import AuthPage from '../pages/AuthPage';
import Chat from '../pages/Chat';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={
        <PublicRoute><AuthPage mode="login" /></PublicRoute>
      } />

      <Route path="/register" element={
        <PublicRoute><AuthPage mode="register" /></PublicRoute>
      } />

      <Route path="/chat" element={
        <PrivateRoute><Chat /></PrivateRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;