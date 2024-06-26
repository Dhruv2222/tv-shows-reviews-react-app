import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css"
import * as client from "./client";
import * as client_home from "../Home/client"
import { Button, Modal } from "react-bootstrap";
import Navbar from "../Home/navbar";
import { getShowById, getUserWishlist } from "../Details/client"

function chunk(array: any, size: any) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i += size) {
        chunked_arr.push(array.slice(i, i + size));
    }
    return chunked_arr;
}

interface WishlistItem {
    _id: string;
    username: String;
    showId: number;
    __v: Number;
}

interface Review {
    _id: string;
    username: string;
    review_description: string;
    review_timestamp: string;
    review_title: string;
    showId: number;
    rating: number;
}

interface Show {
    id: number;
    title: string;
    image?: string;
    summary?: string;
    avgRuntime?: number;
    status?: string;
    language?: string;
    premiered?: string;
    rating?: number;
}

interface Shows {
    [key: string]: Show;
}

function Profile() {
    const navigate = useNavigate();
    const { profileId } = useParams();

    const handleSave = () => {
        client.updateUser(editUser)
            .then((response) => {
                console.log('Update successful', response);
                setUser(editUser)
            })
            .catch((error) => {
                console.error('Failed to update user', error);
            });
    };

    const handleDeleteAccountShow = () => {
        setShowDeleteAccount(true);
    }

    const handleDeleteAccount = () => {
        try {
            client_home.logoutUser();
            client.deleteUser(loggedInUser.username);
            console.log(`User ID ${loggedInUser.username} deleted successfully.`);
            navigate("/#/Home");
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    function formatDate(dateString: string): string {
        const [month, day, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        const suffixes = ["th", "st", "nd", "rd"];
        const v = day % 100;
        const dayWithSuffix = day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const formattedDate = `${dayWithSuffix} ${monthNames[date.getMonth()]} ${year}`;
        return formattedDate;
    }

    const [reviews, setReviews] = useState<Review[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isLoggedIn, setLoggedIn] = useState(false);

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

    const [loggedInUser, setLoggedInUser] = useState({
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

    const [editUser, setEditUser] = useState({
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
    const getUserProfile = async () => {
        const currentUser = await client_home.getUserProfile();
        if (currentUser === "Not logged in") {
            // Current user not found
            setLoggedIn(false);
            navigate('/Auth/Login');
            return;
        } else {
            setLoggedIn(true);

            setLoggedInUser(currentUser)
            await fetchUserData(currentUser.username)

        }

    };

    const fetchUserData = async (id: String | undefined) => {
        const existingUser = await client.fetchUserById(id);
        setUser(existingUser);
        setEditUser(existingUser)

        const reviewData = await client.fetchReviewsById(existingUser.username);
        if (reviewData.length > 0 && reviewData[0].reviews) {
            const sortedReviews = reviewData[0].reviews.sort((a: Review, b: Review) => {
                const dateA = new Date(a.review_timestamp);
                const dateB = new Date(b.review_timestamp)
                return dateB.getTime() - dateA.getTime();
            });
            setReviews(sortedReviews);
        } else {
            setReviews([]);
        }

        const wishListData = await getUserWishlist(existingUser.username)
        setWishlist(wishListData)
        const fetchShowDetails = wishListData.map(async (item: any) => {
            if (item.showId && !wishListshows[item.showId]) {
                return new Promise((resolve, reject) => {
                    getShowById(item.showId, (show) => {
                        if (show) {
                            resolve({ showId: item.showId, show });
                        } else {
                            reject('Show not found');
                        }
                    });
                });
            }
            return null; // Return null for already fetched or undefined showIds
        });

        try {
            const showsDetails = await Promise.all(fetchShowDetails.filter(Boolean)); // Filter out nulls and wait for all promises
            showsDetails.forEach(({ showId, show }) => {
                setwishListShows(prev => ({ ...prev, [showId]: show }));
            });
        } catch (error) {
            console.error("Error fetching shows", error);
        }
    };



    useEffect(() => {
        console.log("xxxx", profileId)
        // getUserProfile();
        fetchUserData(profileId);
        setLoggedIn(true)
        if (!profileId) {
            getUserProfile();
        }
    }, []);

    // useEffect(() => {
    //     // getUserProfile();
    //     fetchUserData(profileId);
    //     if (!profileId) {
    //         getUserProfile();

    //     }

    // }, [profileId]);

    const [shows, setShows] = useState<Shows>({});
    useEffect(() => {
        reviews.forEach((review) => {
            if (review.showId && !shows[review.showId]) {
                getShowById(review.showId, (show) => {
                    setShows(prev => ({ ...prev, [review.showId]: show }));
                });
            }
        });
    }, [reviews]);

    const [wishListshows, setwishListShows] = useState<Shows>({});

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState("");
    const [selectedReview, setSelectedReview] = useState({
        _id: "",
        username: "",
        review_description: "",
        review_timestamp: "",
        review_title: "",
        showId: 0,
        rating: 0,
    });

    const handleDeleteShow = (reviewId: string) => {
        setShowDelete(true);
        setSelectedReviewId(reviewId);
    };


    const handleEditShow = (review: Review) => {
        setShowEdit(true);
        setSelectedReview(review);
    };

    const handleDeleteClose = () => {
        setShowDelete(false);
    }

    const handleDeleteCloseAccount = () => {
        setShowDeleteAccount(false);
    }

    const handleEditClose = () => {
        setShowEdit(false);
    }

    const handleDeleteReview = (reviewId: string | null) => {
        if (reviewId == null) {
            console.error('reviewId is null');
            return;
        }
        try {
            client.deleteReviewById(reviewId);
            console.log(`Review with ID ${reviewId} deleted successfully.`);
            setReviews(currentReviews =>
                currentReviews.filter(review => review._id !== reviewId)
            );

        } catch (error) {
            console.error('Failed to delete review:', error);
        }
    };

    const handleEditReview = () => {
        client.updateReview(selectedReview)
            .then((response) => {
                console.log('Update successful', response);
                setReviews(currentReviews =>
                    currentReviews.map(review =>
                        review._id === selectedReview._id ? selectedReview : review
                    )
                );
            })
            .catch((error) => {
                console.error('Failed to update user', error);
            });
    };
    const handleShowClick = (showId: number) => {
        navigate(`/Details/${showId}`, { replace: true });
    };

    // const reviewGroups = chunk(reviews, 4);
    const wishListGroups = chunk(wishlist, 4);

    useEffect(() => {
    }, [wishListGroups])

    return (
        <div>
            <Navbar />
            {user.username ? (
                <div>
                    {/* <div style={{ textAlign: 'right' }}>
                        <h3 style={{ marginTop: '80px' }}>Your role: {loggedInUser.role}</h3>
                    </div> */}
                    <div className="container" style={{ marginTop: '5%', backgroundColor: "rgba(255, 255, 255)" }}>
                        <div className="main-body">

                            <div className="row">
                                <h1 style={{ textAlign: 'center' }}>{profileId ? `${user.username}'s Profile` : "My Profile"}</h1>
                                <div className="col-lg-12 mt-4">
                                    <div className="card">
                                        <div className="card-body d-lg-flex flex-row d-block">
                                            <div className="col-lg-4 col-12 d-flex flex-column align-items-center text-center">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                                <div className="mt-3">
                                                    <h4>{user.username}</h4>
                                                    <p className="text-secondary mb-1">{user.role}</p>
                                                    <p className="text-muted font-size-sm">{user.email}</p>
                                                    {/* <button className="btn btn-primary me-2">Follow</button>
                                                    <button className="btn btn-outline-primary">Message</button> */}
                                                </div>

                                            </div>
                                            <div className="col-lg-8 col-12">
                                                <div className="mt-3" >
                                                    <div className="row mb-3">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Full Name</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input type="text" className="form-control" value={editUser.username} onChange={(e) => setEditUser({ ...editUser, username: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Email</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input type="text" className="form-control" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    {
                                                        (profileId === undefined || profileId === loggedInUser.username) &&
                                                        <div className="row mb-3">
                                                            <div className="col-sm-3">
                                                                <h6 className="mb-0">Phone</h6>
                                                            </div>
                                                            <div className="col-sm-9 text-secondary">
                                                                <input type="text" className="form-control" value={editUser.phone_number} onChange={(e) => setEditUser({ ...editUser, phone_number: e.target.value })} />
                                                            </div>

                                                        </div>
                                                    }

                                                    <div className="row mb-3">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Favorite TV Show</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input type="text" className="form-control" value={editUser.favorite_TVshow} onChange={(e) => setEditUser({ ...editUser, favorite_TVshow: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    {profileId === undefined && (<div className="row">
                                                        <div className="col-sm-3"></div>
                                                        <div className="col-sm-9 text-secondary d-flex justify-content-end ">
                                                            <button onClick={handleSave} className="btn btn-primary px-4 me-2">
                                                                Save Changes
                                                            </button>

                                                            <button onClick={handleDeleteAccountShow} className="btn btn-danger px-4">
                                                                Delete your Account
                                                            </button>

                                                        </div>

                                                    </div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex ms-2 mt-2">
                                    <h4>{profileId ? `${user.username}'s Wishlisted Movies` : "My Wishlisted Movies"}</h4>
                                </div>
                                {wishlist.length > 0 ? (
                                    <div id="movieCarousel" className="carousel slide mt-3 mb-3" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            {wishListGroups.map((group, index) => (
                                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                    <div className="d-flex">
                                                        {group.map((wishlistItem: WishlistItem, idx: number) => (
                                                            <div key={wishlistItem._id} className="card mx-2" style={{ width: "18rem", cursor: 'pointer' }} onClick={() => handleShowClick(wishlistItem.showId)}>
                                                                <img src={wishListshows[wishlistItem.showId]?.image || 'default-image-url'} className="card-img-top" alt={wishListshows[wishlistItem.showId]?.title} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">
                                                                        {wishListshows[wishlistItem.showId] ? wishListshows[wishlistItem.showId].title : "Loading..."}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        {isLoggedIn ? <h4>No Wishlisted movies yet</h4> : <h4>Please log in to view reviews</h4>}
                                    </div>
                                )}
                                <div className="d-flex ms-2 mt-2">
                                    <h4>{profileId ? `${user.username}'s Reviews` : "My Reviews"}</h4>
                                </div>
                                <div className="col-lg-12 mt-2 me-4">
                                    <div className="card">
                                        <div className="card-body" style={{ maxHeight: '550px', overflowY: 'auto', margin: '0 15px' }}>
                                            {isLoggedIn && reviews.length == 0 && <div>
                                                <h4>No reviews added yet</h4>
                                            </div>}
                                            {reviews.length > 0 && <ul className="timeline">
                                                {reviews.map((review: Review) => (
                                                    <li key={parseInt(review._id)} >
                                                        <div className="timeline-time">
                                                            <span className="date me-2">{new Date(review.review_timestamp).toLocaleTimeString()}</span>
                                                            <span className="time me-2">{formatDate(new Date(review.review_timestamp).toLocaleDateString())}</span>
                                                        </div>
                                                        <div className="timeline-icon">
                                                            <a>&nbsp;</a>
                                                        </div>
                                                        <div className="timeline-body">
                                                            <div className="timeline-header d-flex">
                                                                <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                                                <span className="username"><a>{user.username}</a> <small></small></span>
                                                            </div>
                                                            <div className="timeline-content">
                                                                <h6 className="d-flex">
                                                                    {shows[review.showId] ? (
                                                                        <span style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }} className="clickable" onClick={() => handleShowClick(review.showId)}>
                                                                            {shows[review.showId].title}
                                                                        </span>
                                                                    ) : (
                                                                        <span>Loading...</span>
                                                                    )}
                                                                </h6>
                                                                <h6 className="d-flex">{review.review_title}</h6>
                                                                <p className="d-flex">
                                                                    {review.review_description}
                                                                </p>
                                                            </div>
                                                            <div className="d-flex mt-0">
                                                                <button disabled={!!profileId} className="btn btn-success btn-sm me-2" onClick={() => handleEditShow(review)}>Edit</button>
                                                                <button disabled={!(!profileId || loggedInUser.role === "moderator")} className="btn btn-danger btn-sm" onClick={() => handleDeleteShow(review._id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </li>

                                                ))}
                                            </ul>}
                                            {!isLoggedIn &&
                                                <div>
                                                    <h4>You need to be Logged In to see Reviews</h4>
                                                    <Link to={"/Auth/Login"}><button className="btn btn-primary me-2">Log In</button></Link>
                                                    <Link to={"/Auth/Register"}><button className="btn btn-primary">Register</button></Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <Modal show={showDelete} onHide={handleDeleteClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Assignment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    handleDeleteClose();
                                    handleDeleteReview(selectedReviewId)
                                }}>
                                    Delete Review
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showDeleteAccount} onHide={handleDeleteCloseAccount}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Your Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete you account? (This cannot be undone)</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteCloseAccount}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    handleDeleteCloseAccount();
                                    handleDeleteAccount();
                                }}>
                                    Delete Account
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showEdit} onHide={handleEditClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Review for {selectedReview?.showId}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{selectedReview && (
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="reviewHeading">Review Heading</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="reviewHeading"
                                            value={selectedReview.review_title}
                                            onChange={(e) => setSelectedReview({ ...selectedReview, review_title: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="reviewDescription">Review Description</label>
                                        <textarea
                                            className="form-control"
                                            id="reviewDescription"
                                            value={selectedReview.review_description}
                                            onChange={(e) => setSelectedReview({ ...selectedReview, review_description: e.target.value })}
                                        ></textarea>
                                    </div>
                                </form>
                            )}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleEditClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => {
                                    handleEditClose();
                                    handleEditReview();
                                }}>
                                    Edit Review
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>


                </div>
            ) : <div style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
                alignItems: 'center'
            }}>
                <h1 style={{ marginTop: '100px' }}>No Such Profile exists</h1>
            </div>}
        </div >

    )


}

export default Profile;