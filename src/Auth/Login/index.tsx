import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import * as client from "../client";
import Landing from '../../Landing';
import Navbar from '../../Home/navbar';

function Login() {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        "_id": "",
        "username": "",
        "password": "",
        "confirmPassword": "",
        "email": "",
        "phone_number": "",
        "dob": "",
        "role": "user",
        "favorite_TVshow": ""
      });

    const [loggedIn, setLoggedIn] = useState(false);

    const login = async () => {
        const newUser = await client.loginUser(user);
        if (newUser === "Invalid credentials") {
            // 401 (Unauthorized), show alert for login failure
            alert('Login failed: Invalid credentials');
            navigate("/Auth/Login");
            return;
        }
        setUser({ ...user, ...newUser});
        navigate("/Home");
      }

      const navigate = useNavigate();

    const handleLogin = (event: any) => {
        event.preventDefault();
        // console.log('Username:', user.username);
        // console.log('Password:', user.password);
        setLoggedIn(true); 
        login();
        
    }

    return (
        <>
        <Navbar/>
            <div className="containerForLogin">
                <h2>Login</h2>
                <hr/>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter your username" id="username" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value})} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="Enter your password" id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value})} required />
                    </div>

                    <div className="form-group">
                        <button type="submit"><b>Login</b></button>
                    </div>
                </form>
                <Link to={"/Auth/Register"}>Don't have an account? Register</Link>
            </div>
        </>
    );

}

export default Login;