// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Header from './components/Header';
import CalendarHeatmapPage from './pages/CalendarHeatmapPage';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/calendar" element={<CalendarHeatmapPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
