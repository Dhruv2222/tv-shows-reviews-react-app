import React, { useEffect, useState } from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import Auth from './Auth';
import { ProtectedRoute } from './ProtectedRoute';
import Profile from './Profile';
import Landing from './Landing';
import * as client_home from "./Home/client"
import Home from './Home';
import { Provider } from 'react-redux';
import store from './store';
import Details from './Details';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const getUserProfile = async () => {
    const currentUser = await client_home.getUserProfile();
    if (currentUser === "Not logged in") {
      setLoggedIn(false);
      return;
    } else {
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <HashRouter>
      <div>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Auth/*" element={<Auth />} />
            <Route path="/Profile/*" element={<Profile />} />
            <Route path="/Profile/:profileId" element={<Profile />} />
            {/* <Route path="/Profile/*" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/Profile/:profileId" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute> */}
            {/* } /> */}
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
