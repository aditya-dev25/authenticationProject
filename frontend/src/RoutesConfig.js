import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './Pages/Auth/SignUp';
import SignIn from './Pages/Auth/SignIn';
import ProtectedRoute from './Auth/ProtectedRoutes';

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Additional routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
    </Routes>
  );
};

export default RoutesConfig;
