// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import NavBar from './components/NavBar';
import { Container } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <div className="bg-dark text-light min-vh-100">
      <NavBar />
      <Container maxWidth="md" className="py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;