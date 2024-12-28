import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './Pages/Auth/SignUp';

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Additional routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default RoutesConfig;
