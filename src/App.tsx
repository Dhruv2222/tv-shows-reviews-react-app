import React from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Auth from './Auth';
import Landing from './Landing';
import Home from './Home';
import { Provider } from 'react-redux';
import store from './store';
import Details from './Details';

function App() {
  return (
    <HashRouter>
      <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Auth/*" element={<Auth />} />
          <Route path="/Landing/*" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Details/:showId" element={<Details />} />

        </Routes>
        </Provider>
      </div>
    </HashRouter>
  );
}

export default App;
