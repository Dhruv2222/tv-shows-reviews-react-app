import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Auth from './Auth';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Auth" />} />
          <Route path="/Auth/*" element={<Auth />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
