import React, { useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      title: "Suits",
      review: "This is a great show!",
      rating: 5,
      date: "2021-07-01",
    },
    {
      title: "House of the Dragon",
      review: "This is a terrible show!",
      rating: 1,
      date: "2021-07-05",
    },
  ]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review, index) => (
        <div key={index}>
          <h3>
            <b>{review.title}</b>
          </h3>
          <p>{review.review}</p>
          <p>Rating: {review.rating}</p>
          <p>Date: {review.date}</p>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default Reviews;
