import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { RiCameraLensFill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { setShows } from "./reducer";
import * as client from "./client";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Auth/Login");
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
      window.location.reload();
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  function searchShows() {
    if (searchQuery === "") {
      return;
    }
    fetch(`http://api.tvmaze.com/search/shows?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data = data.map(
          (show: {
            show: {
              id: any;
              name: any;
              image: { original: any };
              summary: any;
              avgRuntime: any;
              status: any;
              language: any;
              premiered: any;
              rating: { average: any };
            };
          }) => {
            return {
              id: show.show.id,
              title: show.show.name,
              image: show.show.image?.original,
              summary: show.show.summary,
              avgRuntime: show.show.avgRuntime,
              status: show.show.status,
              language: show.show.language,
              premiered: show.show.premiered,
              rating: show.show.rating?.average,
            };
          }
        );
        console.log(data);
        dispatch(setShows(data));
        navigate("/Home");
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
              <a className="nav-link active" aria-current="page" href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
  <RiCameraLensFill className="navbar-icon" />
  <b><i className="navbar-title">TV Lens</i></b>
</a>

                
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
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
                  <button
                  onClick={handleLogout}
                  className="navbar-logout-btn ms-2"
                >
                  Logout <IoIosLogOut />
                </button>
                )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
