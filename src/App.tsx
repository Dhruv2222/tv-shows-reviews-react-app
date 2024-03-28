import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Auth from './Auth';
import Profile from './Profile';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Auth" />} />
          <Route path="/Auth/*" element={<Auth />} />
          <Route path="/Profile/:profileId" element={<Profile />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
