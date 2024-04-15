import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import { RiCameraLensFill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { setShows } from "./reducer";
import * as client from "./client";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchQuery(searchParams.get("q") ?? "");
  }, [location.search]);

  const handleNavigate = () => {
    navigate("/Auth/Login");
  };

  const handleNavigateProfile = () => {
    navigate("/Profile");
  };

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

  const getUserProfile = async () => {
    const currentUser = await client.getUserProfile();
    if (currentUser === "Not logged in") {
      // Current user not found
      setLoggedIn(false);
      return;
    } else {
      setUser({ ...user, ...currentUser });
      setLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    const logoutMessage = await client.logoutUser();
    if (logoutMessage === "Logged out") {
      setUser(initialUserState);
      setLoggedIn(false);
      // window.location.reload();
      // navigate("/Home");
      navigate("/Auth/Login"); // why is this not working?
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  async function searchShows() {
    if (searchQuery === "") {
      return;
    }
    await client.search(searchQuery).then((response) => {
      dispatch(setShows(response));
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    });
  }
  
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary fixed-top"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">

                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/Home"
                  // remove the below onClick to make it not random
                  onClick={() => { window.location.href = window.location.origin + '/#/Home'; window.location.reload(); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <RiCameraLensFill className="navbar-icon" />
                  <b>
                    <i className="navbar-title">TV Lens</i>
                  </b>
                </Link>

              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                style={{ width: "400px" }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="navbar-search-btn"
                type="submit"
                onClick={searchShows}
              >
                <FaSearch />
              </button>
              {!loggedIn && (
                <button
                  onClick={handleNavigate}
                  className="navbar-login-btn ms-2"
                >
                  Login <IoIosLogIn />
                </button>
              )}

              {loggedIn && (

                <div><button
                  onClick={handleNavigateProfile}
                  className="navbar-logout-btn ms-2"
                >
                  Profile <CgProfile />
                </button><button
                  onClick={handleLogout}
                  className="navbar-logout-btn ms-2"
                >
                    Logout <IoIosLogOut />
                  </button></div>

              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
