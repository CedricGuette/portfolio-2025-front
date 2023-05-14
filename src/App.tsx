import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Presentation from './components/pages/Presentation';
import Portfolio from './components/pages/Portfolio';
import LaPanthere from './components/pages/LaPanthere';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Presentation />} > </Route>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/la-panthere" element={<LaPanthere />} />
      </Routes>
  );
}

export default App;
