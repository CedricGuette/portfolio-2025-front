import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Presentation from './components/pages/Presentation';
import Portfolio from './components/pages/Portfolio';
import LaPanthere from './components/pages/LaPanthere';
import NotFound from './components/pages/NotFound';
import Administration from './components/pages/Administration';
import AdministratorGenerator from './components/pages/AdministratorGenerator';
import LegalMentions from './components/pages/LegalMentions';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/la-panthere" element={<LaPanthere />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/admin" element={<Administration />} />
        <Route path="/admin-generator/:username" element={<AdministratorGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
