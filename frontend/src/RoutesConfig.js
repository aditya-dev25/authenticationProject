import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Additional routes */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default RoutesConfig;
