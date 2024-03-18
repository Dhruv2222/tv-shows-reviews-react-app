import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const checkPasswords = (password: string, confirmPassword: string): boolean => {
        return password === confirmPassword;
    };  
    const handleRegister = (event: any) => {
        const passwordMatch = checkPasswords(password, confirmPassword);
        if (passwordMatch === false) {
            event.preventDefault();
            alert("Passwords do not match! Try again.");
        }
        else {
            event.preventDefault();
            console.log('Username:', username);
            console.log('Password:', password);
            console.log('Role:', role);
            setLoggedIn(true); 
        }
        
    }


  return (


    <div className="container">
      <h2>Register now!</h2>
      <hr/>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm password:</label>
          <input type="password" id="passwordConfirm" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="userType" className="form-label">
            Select role:
          </label>
          <select id="userType" name="userType" className="form-select" onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <button className="" type="submit">
            <b>Register</b>
          </button>
        </div>
      </form>
      <Link to={"/Auth/Login"}>Already have an account? Login</Link>
    </div>


  );
}

export default Register;
