// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import GardenPage from './pages/GardenPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/garden" element={<GardenPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
