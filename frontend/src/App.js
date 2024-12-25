import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoutesConfig from './RoutesConfig';

const App = () => {
  return (
    <>
      <Routes>
        {/* Include additional routes from RoutesConfig */}
        <Route path="/*" element={<RoutesConfig />} />
      </Routes>
    </>
  );
};

export default App;
