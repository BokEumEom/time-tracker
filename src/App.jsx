// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Header from './components/common/Header';
import CalendarHeatmapPage from './pages/CalendarHeatmapPage';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const location = useLocation();
  
  return (
    <div className="container">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/calendar" element={<CalendarHeatmapPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
