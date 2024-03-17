import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogin = (event: any) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        setLoggedIn(true); 
    }

    return (
        <>
            <div className="container">
                <h1>Login Form</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <Link to={"/Auth/Register"}>Don't have an account? Register</Link>
            </div>
        </>
    );

}

export default Login;