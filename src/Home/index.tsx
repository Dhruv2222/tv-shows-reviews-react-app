import React, { useEffect, useState } from "react";
import "./index.css";
// import Carousel from "./carousel";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useDispatch, useSelector } from "react-redux";
import Reviews from "./reviews";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import UserTable from "./Users";

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
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [wishlistShows, setWishlistShows] = useState<any[]>([]);

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

  const fetchWishlistByUsername = async (username: any) => {
    try {
      const fetchedWishlist = await client.getUserWishlist(username);
      setWishlist(fetchedWishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };


  const fetchWishlistShows = async () => {
    try {
      const showPromises = wishlist.map((item: any) => {
        return new Promise((resolve, reject) => {
          client
            .getShowFromMongoByShowId(item.showId)
            .then((show: any) => {
              resolve(show);
            })
            .catch((error: Error) => {
              reject(
                new Error(
                  `Show with ID ${item.showId} not found: ${error.message}`
                )
              );
            });
        });
      });

      const shows = await Promise.all(showPromises);
      setWishlistShows(shows);
    } catch (error) {
      console.error("Error fetching wishlist shows:", error);
    }
  };

  const goToLoginPage = () => {
    navigate("/#/Auth/Login");
    return;
  };

  // useEffect(() => {
  //   getUserProfile();
  //   if (user.username) {
  //     fetchWishlistByUsername(user.username).then(() => {
  //       fetchWishlistShows();
  //     });
  //   }
  // }, [user.username]);

  useEffect(() => {
    getUserProfile();
  }, []);



  useEffect(() => {
    if (user.username) {
      fetchWishlistByUsername(user.username);
    }
  }, [user.username]);



  useEffect(() => {
    if (wishlist.length > 0) {
      fetchWishlistShows();
    }
  }, [wishlist]);

  const shows = useSelector((state: any) => state.shows.shows);
  const [show, setShow] = useState({
    id: 0,
    title: "",
    image: "",
    summary: "",
    avgRuntime: "",
    status: "",
    language: "",
    premiered: "",
    rating: "",
  });
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
    const words = content?.split(" ");
    if (words?.length > 20) {
      return words?.slice(0, 20).join(" ") + "...";
    }
    return content;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistCurrentPage, setWishlistCurrentPage] = useState(1);
  const showsPerPage = 4;

  const indexOfLastWishlistShow = wishlistCurrentPage * showsPerPage;
  const indexOfFirstWishlistShow = indexOfLastWishlistShow - showsPerPage;
  const currentWishlistShows = wishlistShows.slice(
    indexOfFirstWishlistShow,
    indexOfLastWishlistShow
  );

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);
  //   const currentShows = wishlistShows.concat(currentShows1);

  const paginateWishlist = (pageNumber: number) =>
    setWishlistCurrentPage(pageNumber);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="main-content">

        {
          loggedIn === true ? (
            <div>

              <h2
                style={{
                  marginTop: "80px",
                  marginLeft: "20px",
                  textAlign: "center",
                }}
              >
                <b>Welcome, {user.username}</b>
                <p style={{ fontSize: '16px' }}>Explore the world of TV with TVLens! Keep up with your favorite shows, manage your watchlists,<br /> and dive into reviews and ratings. All your TV needs in one convenient app!</p>
              </h2>

            </div>
          ) : (
            <div>
              <h2 style={{
                marginTop: "80px",
                marginLeft: "20px",
                textAlign: "center",
              }}>
                <p style={{ fontSize: '16px', marginTop: '90px' }}>Explore the world of TV with TVLens! Keep up with your favorite shows, manage your watchlists,<br /> and dive into reviews and ratings. All your TV needs in one convenient app!</p>
              </h2>
            </div>
          )
        }




        {(user.role === "user" || user.role === "moderator") && (
          <div>
            {currentShows.length > 0 && (
              <div className="container-1">
                <h2 className="wishlist-title">Shows</h2>
                {/* <p style={{ fontSize: "16px" }}>
                  Explore the world of TV with TVLens! Keep up with your
                  favorite shows, manage your watchlists,
                  <br /> and dive into reviews and ratings. All your TV needs in
                  one convenient app!
                </p> */}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {currentShows.map(
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
                        <div
                          className="card"
                          style={{ width: "18rem", height: "85%" }}
                        >
                          <Link
                            className="card-text"
                            to={`/Details/${show.id}`}
                          >
                            <img
                              src={
                                show.image || "images/tvshow_placeholder.png"
                              }
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
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <ul className="pagination justify-content-center">
                  {/* Previous Button */}
                  <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""
                      }`}
                  >
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className="page-link m-1"
                    >
                      Previous
                    </button>
                  </li>

                  {/* Page Numbers */}
                  {Array(Math.ceil(shows.length / showsPerPage))
                    .fill(null)
                    .map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""
                          }`}
                      >
                        <button
                          onClick={() => paginate(index + 1)}
                          className="page-link m-1"
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                  {/* Next Button */}
                  <li
                    className={`page-item ${currentPage === Math.ceil(shows.length / showsPerPage)
                      ? "disabled"
                      : ""
                      }`}
                  >
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className="page-link m-1"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {currentShows.length === 0 && (
              <div className="container-1">
                <h1 className="text-center">No Shows Found</h1>
                <h3 className="text-center">Please try again</h3>
              </div>
            )}
          </div>
        )}

        {user.role === "user" && (
          <div>
            {currentWishlistShows.length > 0 && (
              <div className="container-1" style={{ marginTop: '0px' }}>
                <h2 className="wishlist-title">My Wishlist</h2>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {currentWishlistShows.map(
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
                        <div
                          className="card"
                          style={{ width: "18rem", height: "85%" }}
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
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <ul className="pagination justify-content-center">
                  {/* Previous Button */}
                  <li
                    className={`page-item ${wishlistCurrentPage === 1 ? "disabled" : ""
                      }`}
                  >
                    <button
                      onClick={() => paginate(wishlistCurrentPage - 1)}
                      className="page-link m-1"
                    >
                      Previous
                    </button>
                  </li>

                  {/* Page Numbers */}
                  {Array(Math.ceil(wishlistShows.length / showsPerPage))
                    .fill(null)
                    .map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${wishlistCurrentPage === index + 1 ? "active" : ""
                          }`}
                      >
                        <button
                          onClick={() => paginateWishlist(index + 1)}
                          className="page-link m-1"
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                  {/* Next Button */}
                  <li
                    className={`page-item ${wishlistCurrentPage ===
                      Math.ceil(wishlistShows.length / showsPerPage)
                      ? "disabled"
                      : ""
                      }`}
                  >
                    <button
                      onClick={() => paginate(wishlistCurrentPage + 1)}
                      className="page-link m-1"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {user.role === "admin" && (
          <div>
            <h1 className="text-center">Welcome!!! You are an Admin!!!</h1>
            <UserTable />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
