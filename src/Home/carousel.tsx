import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./carousel.css";

function Carousel() {
  return (
    <>
      <div
        id="AutoplayingCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/suits.jpeg"
              className="d-block w-100"
              alt="SUITS"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/breaking_bad.jpg"
              className="d-block w-100"
              alt="BREAKING BAD"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/big_bang_theory.jpeg"
              className="d-block w-100"
              alt="BIG BANG THEORY"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#AutoplayingCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#AutoplayingCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carousel;
