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
      console.log("HEREEE", currentUser)
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
      console.log("rfef",fetchedWishlist)
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // const fetchWishlistByUsername = async (username: any ) => {
  //   try {
  //     // console.log(username);
  //     const wishlist = await client.getUserWishlist(username);
  //     console.log(wishlist.length);
  //     const showIds = wishlist.map((item:any) => item.showId);
  //     console.log(showIds);
  //     return wishlist;
  //   } catch (error) {
  //     console.error("Error fetching wishlist:", error);
  //     throw error; // Re-throw the error to handle it in the calling function if needed
  //   }
  // };

  // const fetchWishlistShows = async () => {
  //   console.log("Wishfdcdflist", wishlist)
  //   const showPromises = wishlist.map((item: any) => {
  //     return new Promise((resolve) => {
  //       client.getShowById(item.showId, (show: any) => {
  //         resolve(show);
  //       });
  //     });
  //   });
  
  //   const shows = await Promise.all(showPromises);
  //   console.log("Shows",shows)
  //   setWishlistShows(shows);
  // };

  const fetchWishlistShows = async () => {
    console.log("Wishlist", wishlist);
  
    try {
      const showPromises = wishlist.map((item: any) => {
        return new Promise((resolve, reject) => {
          client.getShowById(item.showId, (show: any) => {
            if (show) {
              resolve(show);
            } else {
              reject(new Error(`Show with ID ${item.showId} not found`));
            }
          });
        });
      });
  
      const shows = await Promise.all(showPromises);
      console.log("Shows", shows);
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
  const showsPerPage = 4;

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows1 = shows.slice(indexOfFirstShow, indexOfLastShow);
  console.log(wishlistShows);
  console.log(currentShows1);
  const currentShows = wishlistShows.concat(currentShows1);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="main-content">
        {loggedIn === true && (
          <div>

            <h2
              style={{
                marginTop: "80px",
                marginLeft: "20px",
                textAlign: "center",
              }}
            >
              <b>Welcome, {user.username}</b>
            </h2>

          </div>
        )}

        {currentShows.length > 0 && (
          <div className="container-1">
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
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
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
                className={`page-item ${
                  currentPage === Math.ceil(shows.length / showsPerPage)
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
        {loggedIn ? <></> : <></>}
      </div>
    </>
  );
}

export default Home;
