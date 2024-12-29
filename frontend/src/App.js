import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoutesConfig from './RoutesConfig';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        {/* Include additional routes from RoutesConfig */}
        <Route path="/*" element={<RoutesConfig />} />
      </Routes>
    </div>
  );
};

export default App;
