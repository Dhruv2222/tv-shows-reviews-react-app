import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import * as client from "../client";
import Navbar from "../../Home/navbar";

function Register() {
  const ADMIN_PIN = process.env.REACT_APP_ADMIN_PIN;
  const MODERATOR_PIN = process.env.REACT_APP_MODERATOR_PIN;

  const [user, setUser] = useState({
    _id: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone_number: "",
    dob: "",
    role: "user",
    favorite_TVshow: "",
  });

  const register = async () => {
    const newUser = await client.registerUser(user);
    setUser({ ...user, ...newUser });
    navigate("/Home");
  };

  const [adminPin, setAdminPin] = useState("");
  const [moderatorPin, setModeratorPin] = useState("");
  const navigate = useNavigate();

  const checkPasswords = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword;
  };
  const handleRegister = (event: any) => {
    const passwordMatch = checkPasswords(user.password, user.confirmPassword);
    let preChecks = true;
    if (passwordMatch === false) {
      event.preventDefault();
      alert("Passwords do not match! Try again.");
      preChecks = false;
    }
    if (user.role === "admin" && adminPin !== ADMIN_PIN) {
      event.preventDefault();
      alert("Registration failed. Incorrect admin pin");
      preChecks = false;
      return;
    }
    if (user.role === "moderator" && moderatorPin !== MODERATOR_PIN) {
      event.preventDefault();
      alert("Registration failed. Incorrect moderator pin");
      preChecks = false;
      // navigate("/#/Auth/Register");
      return;
    }
    if (preChecks === true) {
      event.preventDefault();
      console.log("Username:", user.username);
      console.log("Password:", user.password);
      console.log("Role:", user.role);
      register();
    }
  };

  return (
    <>
    <Navbar/>
    <div className="containerForRegister">
  <h2>Register now!</h2>
  <hr />
  <form onSubmit={handleRegister} className="row">
    <div className="col-md-6">
      {/* Left Column */}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
          placeholder="maze@123"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          placeholder="Enter your password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirm">Confirm password:</label>
        <input
          type="password"
          id="passwordConfirm"
          name="password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          required
          placeholder="Confirm your password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          placeholder="username@maze.com"
          className="form-control"
        />
      </div>
    </div>
    <div className="col-md-6">
      {/* Right Column */}
      <div className="form-group">
        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="number"
          id="phone_number"
          name="phone_number"
          value={user.phone_number}
          onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
          required
          placeholder="6541859999"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="favorite_TVshow">Favorite TV Show:</label>
        <input
          type="text"
          id="favorite_TVshow"
          name="favorite_TVshow"
          value={user.favorite_TVshow}
          onChange={(e) => setUser({ ...user, favorite_TVshow: e.target.value })}
          placeholder="eg. Friends"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userType" className="form-label">
          Select role:
        </label>
        <select
          id="userType"
          name="userType"
          className="form-select"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {user.role === "admin" && (
        <div className="form-group">
          <label htmlFor="adminPin">Pin for admin access:</label>
          <input
            type="password"
            id="adminPin"
            name="adminPin"
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            required
            placeholder="Enter admin pin"
            className="form-control"
          />

        </div>
        <div className="col-md-6">
          {/* Right Column */}
          <div className="form-group">
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              value={user.phone_number}
              onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
              required
              placeholder="6541859999"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="favorite_TVshow">Favorite TV Show:</label>
            <input
              type="text"
              id="favorite_TVshow"
              name="favorite_TVshow"
              value={user.favorite_TVshow}
              onChange={(e) => setUser({ ...user, favorite_TVshow: e.target.value })}
              placeholder="eg. Friends"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType" className="form-label">
              Select role:
            </label>
            <select
              id="userType"
              name="userType"
              className="form-select"
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {user.role === "admin" && (
            <div className="form-group">
              <label htmlFor="adminPin">Pin for admin access:</label>
              <input
                type="password"
                id="adminPin"
                name="adminPin"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                required
                placeholder="Enter admin pin"
                className="form-control"
              />
            </div>
          )}
          {user.role === "moderator" && (
            <div className="form-group">
              <label htmlFor="moderatorPin">Pin for moderator access:</label>
              <input
                type="password"
                id="moderatorPin"
                name="moderatorPin"
                value={moderatorPin}
                onChange={(e) => setModeratorPin(e.target.value)}
                required
                placeholder="Enter moderator pin"
                className="form-control"
              />
            </div>
          )}
        </div>
        <div className="form-group col-md-12">
          <button type="submit">
            <b>Register</b>
          </button>
        </div>
      </form>
      <div className="col-md-12">
        <Link to={"/Auth/Login"}>Already have an account? Login</Link>
      </div>
    </div>

  </form>
  <div className="col-md-12">
    <Link to={"/Auth/Login"}>Already have an account? Login</Link>
  </div>
</div>
</>


  );
}

export default Register;
