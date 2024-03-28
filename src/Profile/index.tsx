import React from "react";
import { Link } from "react-router-dom";
import data from "./dummy_data.json"
import "./index.css"

var idx = 0
var isLoggedIn = false;

function Profile() {
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
                                        <h4>{data[idx].name}</h4>
                                        <p className="text-secondary mb-1">{data[idx].role}</p>
                                        <p className="text-muted font-size-sm">{data[idx].address}</p>
                                        <button className="btn btn-primary me-2">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>

                                </div>
                                {/* <div className="vl"></div> */}
                                <div className="col-lg-8">
                                    <div className="mt-3" >
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={data[idx].name} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={data[idx].email} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={data[idx].phone} />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <input type="text" className="form-control" value={data[idx].address} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3"></div>
                                            <div className="col-sm-9 text-secondary d-flex justify-content-end ">
                                                <input type="button" className="btn btn-primary px-4" value="Save Changes" />
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
                                {isLoggedIn && <ul className="timeline">
                                    {data[idx].reviews.map((review) => (
                                        <li key={review.id} >
                                            <div className="timeline-time">
                                                <span className="date">{review.date}</span>
                                                <span className="time">{review.time}</span>
                                            </div>
                                            <div className="timeline-icon">
                                                <a>&nbsp;</a>
                                            </div>
                                            <div className="timeline-body">
                                                <div className="timeline-header d-flex">
                                                    <span className="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" /></span>
                                                    <span className="username"><a>{data[idx].name}</a> <small></small></span>
                                                </div>
                                                <div className="timeline-content">
                                                    <h6 className="d-flex"><a href="">{review.tvshow_id}</a></h6>
                                                    <h6 className="d-flex">{review.heading}</h6>
                                                    <p className="d-flex">
                                                        {review.body}
                                                    </p>
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
        </div>
    )


}

export default Profile;