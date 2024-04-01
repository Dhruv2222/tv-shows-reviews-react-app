import React, { useState } from "react";
import "./index.css";
import Carousel from "./carousel";
import Navbar from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useDispatch, useSelector } from "react-redux";
import Reviews from "./reviews";

function Home() {
  // const [shows, setShows] = useState();

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

  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="container-1">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {shows.map(
              (
                show: { image: string; title: string; summary: string },
                index: number
              ) => (
                <div
                  className="col-sm-6 col-md-6 col-lg-4 col-xxl-3 mb-4"
                  key={index}
                >
                  <div
                    className="card h-100"
                    style={{ width: "18rem", height: "100%" }}
                  >
                    <img
                      src={show.image || "images/default_tv.jpeg"}
                      className="card-img-top"
                      alt={show.title}
                    />
                    <div className="card-body">
                      <h3 className="card-title">
                        <b>{show.title}</b>
                      </h3>
                      <p
                        className="card-text"
                        dangerouslySetInnerHTML={{
                          __html: expandedCards[index]
                            ? show.summary
                            : getTruncatedContent(show.summary),
                        }}
                      ></p>
                      {show.summary.split(" ").length > 50 && (
                        <button onClick={() => toggleContent(index)}>
                          {expandedCards[index] ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>
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
