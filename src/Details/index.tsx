import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../Home/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdDeleteForever } from "react-icons/md";
import {
  getShowById,
  getReviewsByShowId,
  addNewReview,
  getUserProfile,
  deleteReview,
  getAverageRating,
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  addShow,
} from "./client";
import { useDispatch, useSelector } from "react-redux";
import Reviews from "../Home/reviews";
import { Link, useParams } from "react-router-dom";
import { profile } from "console";

function Details() {
  // const [shows, setShows] = useState();

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
  const [avgRating, setAvgRating] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const fetchUserProfile = async () => {
    const currentUser = await getUserProfile();
    if (currentUser === "Not logged in") {
      // Current user not found
      setLoggedIn(false);
      return;
    } else {
      setUser({ ...user, ...currentUser });
      setLoggedIn(true);
    }
  };

  const [newWishList, setNewWishList] = useState({
    _id: "",
    username: "",
    showId: 0,
  });

  const getAvgShowRating = async () => {
    const avg = await getAverageRating(showId);
    setAvgRating(avg.averageRating);
  };

  const handleAddToWishlist = async () => {
    try {
      const newWishList = {
        _id: "",
        username: user.username,
        showId: show.id,
      };

      await addToWishlist(newWishList);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleWishlistAction = async () => {
    try {
      if (isInWishlist) {
        // If show is already in wishlist, remove it
        await removeFromWishlist(showId);
        setIsInWishlist(false); // Update state
      } else {
        // If show is not in wishlist, add it
        await addToWishlist({
          _id: "",
          username: user.username,
          showId: show.id,
        });
        setIsInWishlist(true); // Update state
        await addShow(show); // Add show to MongoDB.
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // Handle error
    }
  };

  const { showId } = useParams<{ showId?: string }>();
  const { usernameWIsh } = useParams<{ usernameWIsh?: string }>();

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

  // const [reviews, setReviews] = useState([]);

  const [reviews, setReviews] = useState([
    {
      _id: "",
      username: "",
      showId: 0,
      review_title: "",
      review_description: "",
      review_timestamp: "",
      rating: 0,
    },
  ]);

  const fetchReviewsByShowId = async (showId: any) => {
    try {
      const reviewsList = await getReviewsByShowId(showId);
      setReviews(reviewsList);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDeleteReview = async (_id: any, rating: any) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (!confirmed) {
        return;
      }
      setReviews((currentReviews) =>
        currentReviews.filter((review) => review._id !== _id)
      );
      setAvgRating(
        reviews.length > 1
          ? Number(
            (
              (parseFloat(String(avgRating)) * reviews.length - rating) /
              (reviews.length - 1)
            ).toFixed(2)
          )
          : 0
      );
      const status = await deleteReview(_id);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const fetchWishlistByUsername = async (username: any) => {
    try {
      const wishlist = await getUserWishlist(username);
      return wishlist;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      throw error; // Re-throw the error to handle it in the calling function if needed
    }
  };

  const fetchWishlistByUsernameShow = async (username: any, showId: any) => {
    try {
      const wishlistData = await getUserWishlist(username);
      const wishlistItem = wishlistData.find(
        (item: any) => item.showId == showId
      );
      setIsInWishlist(wishlistItem !== undefined);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    getShowById(showId, (show) => {
      setShow(show);
    });

    fetchReviewsByShowId(showId);
    fetchUserProfile();
    if (user.username) {
      fetchWishlistByUsername(user.username);
      fetchWishlistByUsernameShow(user.username, showId);
    }
    getAvgShowRating();
  }, [user.username, showId]);

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

  const formatDateAndTime = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString(); // Format the date component
    const formattedTime = date.toLocaleTimeString(); // Format the time component
    return { formattedDate, formattedTime };
  };

  const [newReview, setNewReview] = useState({
    _id: "",
    username: "",
    showId: 0,
    review_title: "",
    review_description: "",
    review_timestamp: new Date(),
    rating: 0,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
      showId: show.id,
      review_timestamp: new Date(),
      username: user.username,
      _id: new Date().getTime().toString(),
    });
  };

  const newReviewWithTimestampToString = {
    ...newReview,
    review_timestamp: newReview.review_timestamp.toISOString(),
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addNewReview(newReview);
    setNewReview({
      _id: "",
      username: "",
      showId: 0,
      review_title: "",
      review_description: "",
      review_timestamp: new Date(),
      rating: 0,
    });
    setReviews([newReviewWithTimestampToString, ...reviews]);
    setAvgRating(
      Number(
        (
          (parseFloat(String(avgRating)) * reviews.length + newReview.rating) /
          (reviews.length + 1)
        ).toFixed(2)
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="main-content">
        <div className="container-details-1">
          <h2>
            <b>{show.title}</b>
          </h2>
          <hr />
          <div className="row">
            <div className="col-12 col-lg-5">
              <img
                src={show.image || "images/tvshow_placeholder.png"}
                className="card-img-top"
                alt={show.title}
                style={{ width: "50%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div className="col-12 col-lg-7">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <h4>
                    <b>Description</b>
                  </h4>
                  {show.summary.split("</p>").map((paragraph, index) => (
                    <p
                      style={{ textAlign: "left" }}
                      key={index}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    ></p>
                  ))}
                </div>
                <div className="col-12 col-lg-6">
                  <div className="row">
                    <div className="col">
                      <h5>
                        <b>Status</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h5>
                        {show.status !== undefined ? `${show.status}` : "-"}
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h5>
                        <b>Language</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h5>
                        {show.language !== undefined ? `${show.language}` : "-"}
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h5>
                        <b>Rating</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h5>
                        {show.rating !== null ? `${show.rating} /10.0` : "-"}
                      </h5>
                      <h5>{ }</h5>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h5>
                        <b>Premiered</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h5>
                        {show.premiered !== undefined
                          ? `${show.premiered}`
                          : "-"}
                      </h5>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h5>
                        <b>Average Runtime</b>
                      </h5>
                    </div>
                    <div className="col">
                      <h5>
                        {show.avgRuntime !== undefined
                          ? `${show.avgRuntime} mins`
                          : "-"}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr />
            {/* {<button onClick={handleAddToWishlist}>Add this show to my wishlist</button> } */}
            {loggedIn && (
              <button onClick={handleWishlistAction}>
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            )}
          </div>
        </div>

        {/* Reviews Section */}

        <div className="container-details-1 mb-4">
          <h2>
            <b>Reviews</b>
          </h2>
          <hr />
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="col">
                <b>Average rating</b>
              </div>
              <div className="col">
                <b style={{ fontSize: "50px" }}>{avgRating} </b>
                <b style={{ fontSize: "20px" }}>/ 5.0</b>
              </div>
            </div>

            <div className="col-12 col-lg-9 review-card">
              <ul
                className="list-unstyled"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {reviews.length === 0 ? (
                  <p>No reviews for this show...</p>
                ) : (
                  reviews.map((review, index) => (
                    <div className="card my-2" key={index}>
                      <div className="card-body">
                        <li className="">
                          <div className="row">
                            <div className="col-11 text-start">
                              <b className="card-title">
                                {review.review_title}{" "}
                              </b>
                              | <i>{review.rating} / 5 | </i>
                              {
                                formatDateAndTime(review.review_timestamp)
                                  .formattedDate
                              }{" "}
                              @{" "}
                              {
                                formatDateAndTime(review.review_timestamp)
                                  .formattedTime
                              }
                            </div>
                            {review.username === user.username ||
                              user.role === "moderator" ? (
                              <div className="col-1 text-end">
                                <button
                                  onClick={() =>
                                    handleDeleteReview(
                                      review._id,
                                      review.rating
                                    )
                                  }
                                  className="btn btn-outline-danger mx-1"
                                >
                                  <MdDeleteForever className="fs-4" />
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                            <p className="text-start">
                              {review.review_description}
                            </p>
                          </div>
                          <div className="text-end">
                            <Link to={`/Profile/${review.username}`}>
                              ~{review.username}
                            </Link>
                          </div>
                        </li>
                      </div>
                    </div>
                  ))
                )}
              </ul>
            </div>
            {loggedIn && (
              <div className="col-12 col-lg-3 mt-2">
                <b>Add a new review:</b>
              </div>
            )}
            {!loggedIn && (
              <div className="col-12 col-lg-3 mt-2">
                <b>Login to add a new review</b>
              </div>
            )}

            {loggedIn && (
              <div className="col-12 col-lg-9 review-card mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-9">
                      <label htmlFor="review_title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="review_title"
                        name="review_title"
                        value={newReview.review_title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="rating" className="form-label">
                        Rating
                      </label>
                      <div className="rating">
                        {[...Array(5)].map((_, index) => {
                          const ratingValue = 5 - index;
                          return (
                            <React.Fragment key={ratingValue}>
                              <input
                                id={`star${ratingValue}`}
                                name="rating"
                                type="radio"
                                value={ratingValue}
                                className="radio-btn hide"
                                checked={newReview.rating === ratingValue}
                                onChange={(e) =>
                                  setNewReview({
                                    ...newReview,
                                    rating: parseInt(e.target.value),
                                  })
                                }
                              />
                              <label htmlFor={`star${ratingValue}`}>☆</label>
                            </React.Fragment>
                          );
                        })}
                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="review_description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="review_description"
                      name="review_description"
                      value={newReview.review_description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="mb-2">
                    Add Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
