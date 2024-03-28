import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./index.css";
import * as client from "../client";

function LandingPage() {
    const initialUserState = {
        _id: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone_number: "",
        dob: "",
        role: "user",
        favorite_TVshow: "",
      };
  const [user, setUser] = useState(initialUserState);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  const getUserProfile = async () => {
    const currentUser = await client.getUserProfile();
    if (currentUser === "Not logged in") {
      // Current user not found
      setLoggedIn(false);
      return;
    }
    else {
        setUser({ ...user, ...currentUser });
        setLoggedIn(true);
    }
    
  };

  const handleLogout = async () => {
    const logoutMessage = await client.logoutUser();
    if (logoutMessage === "Logged out") {
        setUser(initialUserState);
        alert("User logged out");
        setLoggedIn(false);
        
    }
  };

  const goToLoginPage = () => {
    navigate("/#/Auth/Login");
    return;
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <div className="container">
      <h2>Landing page</h2>
      {/* show this if logged out */}
        {loggedIn === false && (
            <div>
            <button className="mx-2" onClick={goToLoginPage}><b>Login</b></button>
            </div>
        )}

        {/* show this if logged in  */}
        {loggedIn === true && (
            <div>
            <h3>Hi, {user.username}</h3>
            <button onClick={handleLogout}>
          <b>Logout</b>
        </button>
        </div>
        )}

        

        <hr />
      </div>
    </>
  );
}

export default LandingPage;
