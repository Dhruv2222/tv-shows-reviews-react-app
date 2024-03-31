import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./navbar.css";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setShows } from "./reducer";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

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
            };
          }) => {
            return {
              id: show.show.id,
              title: show.show.name,
              image: show.show.image?.original,
              summary: show.show.summary,
            };
          }
        );
        console.log(data);
        dispatch(setShows(data));
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
                <a className="nav-link active" aria-current="page" href="#">
                  TV Lens
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
                className="btn btn-outline-success"
                type="submit"
                onClick={searchShows}
              >
                Search
              </button>
              <Link to="/Auth">
                <button className="btn btn-outline-success ms-2">Login</button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
