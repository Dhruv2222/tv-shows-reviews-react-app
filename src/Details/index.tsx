import React, { useEffect, useState } from "react";
import "./index.css";
import Navbar from "../Home/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useDispatch, useSelector } from "react-redux";
import Reviews from "../Home/reviews";
import { Link, useParams } from "react-router-dom";

function Details() {
  // const [shows, setShows] = useState();

  const { showId } = useParams<{ showId?: string }>();

  const shows = useSelector((state: any) => state.shows.shows);

  const [show, setShow] = useState({
    id: "",
    title: "",
    image: "",
    summary: "",
    avgRuntime: "",
    status: "",
    language: "",
    premiered: "",
    rating: "",
  });

  useEffect(() => {
    const showTemp = shows.find(
      (show: { id: number }) => show.id === parseInt(showId ?? "", 10)
    );

    setShow(showTemp);
    console.log(show);
  }, []);

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

  const [loggedIn, setLoggedIn] = useState(false);
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
                    style={{ textAlign: 'left' }}
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
                    <h5>{show.status !== undefined ? `${show.status}` : '-'}</h5>
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
                    <h5>{show.language !== undefined ? `${show.language}` : '-'}</h5>
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
                    <h5>{show.rating !== null ? `${show.rating} /10.0` : '-'}</h5>
                      <h5>{}</h5>
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
                    <h5>{show.premiered !== undefined ? `${show.premiered}` : '-'}</h5>
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
                    <h5>{show.avgRuntime !== undefined ? `${show.avgRuntime} mins` : '-'}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
