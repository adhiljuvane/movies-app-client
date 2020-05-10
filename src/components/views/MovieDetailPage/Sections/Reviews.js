import React, { useState, useEffect } from "react";
import SingleReview from "./SingleReview";
import axios from "axios";

export const Reviews = (props) => {
  const [Reviews, setReviews] = useState([]);
  useEffect(() => {
    const data = {
      movieId: props.movieId,
    };
    axios.post("/api/reviews/getAll", data).then((response) => {
      if (response.data.reviews) {
        setReviews(response.data.reviews);
      } else {
        alert("Cannot get reviews");
      }
    });
  }, [props.reload]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        marginBottom: "0px",
      }}
    >
      {Reviews.map((review) => {
        return (
          <SingleReview review={review.review} userFrom={review.userFrom} />
        );
      })}
    </div>
  );
};
