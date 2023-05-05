import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import FreeSpace from './components/layouts/FreeSpace';
import Presentation from './components/pages/Presentation';
import Portfolio from './components/pages/Portfolio';
import LaPanthere from './components/pages/LaPanthere';

function App() {
  return (
    <div className="app-body">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Presentation />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/la-panthere" element={<LaPanthere />} />
          {/* <Route path="/a-propos" element={<AboutUs />} />
          <Route path="/rent/:id" element={<Rent />} />
          <Route path='*' element={<Error />} /> */}
        </Routes>
      </main>
      <FreeSpace />
      <Footer />
    </div>
  );
}

export default App;
