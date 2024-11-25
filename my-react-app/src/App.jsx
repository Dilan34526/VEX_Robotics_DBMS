import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VexRoboticsLayout from './components/VexRoboticsLayout';
import NextPage from './components/NextPage';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VexRoboticsLayout />} />
        <Route path="/next-page" element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;