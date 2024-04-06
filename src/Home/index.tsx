import React, { useEffect, useState } from "react";
import "./index.css";
import Carousel from "./carousel";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useDispatch, useSelector } from "react-redux";
import Reviews from "./reviews";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";

function Home() {
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
    } else {
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
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const shows = useSelector((state: any) => state.shows.shows);

  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  // Function to toggle content for a specific card
  const toggleContent = (index: number) => {
    setExpandedCards((prevState: { [key: number]: boolean }) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Get the truncated content if needed
  const getTruncatedContent = (content: string) => {
    const words = content.split(" ");
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return content;
  };

  return (
    <>
      <Navbar />
      <div className="main-content">
      {loggedIn === true && (
            <div>
            <h2 style={{marginTop: '80px', marginLeft: '20px', textAlign: 'center'}}><b>Welcome, {user.username}</b></h2>
        </div>
        )}
        <div className="container-1">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {shows.map(
              (
                show: {
                  id: number;
                  image: string;
                  title: string;
                  summary: string;
                },
                index: number
              ) => (
                <div
                  className="col-sm-6 col-md-6 col-lg-4 col-xxl-3 mb-4"
                  key={index}
                >
                  {/* <Link to={`/Details/${showId}`}> */}
                  <div
                    className="card home-card"
                    style={{ width: "18rem", height: "100%" }}
                  >
                    <Link className="card-text" to={`/Details/${show.id}`}>
                      <img
                        src={show.image || "images/tvshow_placeholder.png"}
                        className="card-img-top"
                        alt={show.title}
                        style={{
                          width: "100%",
                          height: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h3 className="card-title">
                          <b>{show.title}</b>
                        </h3>
                        <p
                          className="card-text-inner"
                          dangerouslySetInnerHTML={{
                            __html: expandedCards[index]
                              ? show.summary
                              : getTruncatedContent(show.summary),
                          }}
                        ></p>
                        {/* Commenting out Show more option */}
                        {/* {show.summary.split(" ").length > 50 && (
                          <button className="home-show-more-btn" onClick={() => toggleContent(index)}>
                            {expandedCards[index] ? "Collapse" : "Expand"}
                          </button>
                        )} */}
                      </div>
                    </Link>
                  </div>
                  {/* </Link> */}
                </div>
              )
            )}
          </div>
        </div>
        {loggedIn ? (
          <>
            <br />
            <br />
            <Reviews />
          </>
        ) : (
          <>
            <br />
            <br />
            <h1>Please login to see reviews</h1>
          </>
        )}
      </div>
      {/* <Carousel /> */}
    </>
  );
}

export default Home;
