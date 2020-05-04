import React from "react";
import SingleReview from "./SingleReview";

export const Reviews = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      <SingleReview />
      <SingleReview />
      <SingleReview />
      <SingleReview />
    </div>
  );
};
