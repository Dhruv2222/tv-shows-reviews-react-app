import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Register() {

    return (
    <>
    
    
    <div className="container">
        <h1>Registration Form</h1>
        <form action="#" method="post">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm password:</label>
                <input type="password" id="passwordConfirm" name="password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="userType">Select role:</label>
                <select id="userType" name="userType">
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="form-group">
                <button className="" type="submit">Register</button>
            </div>
        </form>
        <Link to={"/Auth/Login"}>Already have an account? Login</Link>
    </div>
    
    
    </>
    );
    
    }
    
    export default Register;