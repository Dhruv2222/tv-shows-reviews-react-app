import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css"
import * as client from "./client";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";

interface Review {
    _id: string,
    user_id: string,
    review_tvshow: string,
    review_heading: string,
    review_description: string,
    review_date: string,
    review_time: string,
}
var isLoggedIn = true;

function Profile() {
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



    const [reviews, setReviews] = useState<Review[]>([]);

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

    useEffect(() => {
        const fetchUserData = async () => {
            const existingUser = await client.fetchUserById(profileId);
            setUser(existingUser);
            setEditUser(existingUser)
        };
        fetchUserData();

        const fetchReviewsData = async () => {
            const reviewData = await client.fetchReviewsById(profileId);
            if (reviewData.length > 0 && reviewData[0].reviews) {
                console.log(reviewData[0].reviews)
                setReviews(reviewData[0].reviews);
            } else {
                setReviews([]);
            }
        };

        fetchReviewsData();
    }, [profileId]);

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState("");
    const [selectedReview, setSelectedReview] = useState({
        _id: "",
        user_id: "",
        review_tvshow: "",
        review_heading: "",
        review_description: "",
        review_date: "",
        review_time: "",
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
        console.log(selectedReview)
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

    return (
        <div className="container" style={{ marginTop: '10%' }}>
            <div className="main-body">
                <div className="row ">
                    <div className="col-lg-12 mt-3">
                        <div className="card">
                            <div className="card-body d-flex flex-row">
                                <div className="col-lg-4 d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                                    <div className="mt-3">
                                        <h4>{user.username}</h4>
                                        <p className="text-secondary mb-1">{user.role}</p>
                                        <p className="text-muted font-size-sm">{user.email}</p>
                                        <button className="btn btn-primary me-2">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>

                                </div>
                                <div className="col-lg-8">
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
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={editUser.phone_number} onChange={(e) => setEditUser({ ...editUser, phone_number: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Favorite TV Show</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={editUser.favorite_TVshow} onChange={(e) => setEditUser({ ...editUser, favorite_TVshow: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-9 text-secondary d-flex justify-content-end ">
                                                <button onClick={handleSave} className="btn btn-primary px-4">
                                                    Save Changes
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex ms-2 mt-2">
                        <h4>My Reviews</h4>
                    </div>
                    <div className="col-lg-12 mt-2">
                        <div className="card">
                            <div className="card-body">
                                {isLoggedIn && reviews.length == 0 && <div>
                                    <h4>No reviews added yet</h4>
                                </div>}
                                {isLoggedIn && reviews.length > 0 && <ul className="timeline">
                                    {reviews.map((review: Review) => (
                                        <li key={parseInt(review._id)} >
                                            <div className="timeline-time">
                                                <span className="date">{review.review_date}</span>
                                                <span className="time">{review.review_time}</span>
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
                                                    <h6 className="d-flex"><a href="">{review.review_tvshow}</a></h6>
                                                    <h6 className="d-flex">{review.review_heading}</h6>
                                                    <p className="d-flex">
                                                        {review.review_description}
                                                    </p>
                                                </div>
                                                <div className="d-flex mt-0">
                                                    <button className="btn btn-success btn-sm me-2" onClick={() => handleEditShow(review)}>Edit</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteShow(review._id)}>Delete</button>

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

            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Review for {selectedReview?.review_tvshow}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{selectedReview && (
                    <form>
                        <div className="form-group">
                            <label htmlFor="reviewHeading">Review Heading</label>
                            <input
                                type="text"
                                className="form-control"
                                id="reviewHeading"
                                value={selectedReview.review_heading}
                                onChange={(e) => setSelectedReview({ ...selectedReview, review_heading: e.target.value })}
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
    )


}

export default Profile;