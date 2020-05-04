import React, { useState } from "react";
import { Input } from "antd";
import axios from "axios";
const { TextArea } = Input;

const WriteReview = (props) => {
  const [Review, setReview] = useState("");
  const [written, setWritten] = useState(false);

  const onReviewSubmitted = (e) => {
    setWritten(true);
    e.preventDefault();
    const data = {
      userFrom: props.userFrom,
      movieId: props.movieId,
      review: e.target.value,
    };
    axios.post("/api/reviews/write", data).then((response) => {
      if (response.data.success) {
        alert("Review submitted");
      } else {
        alert("Review error");
      }
    });
    setReview("");
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  return (
    <div style={{ margin: "1rem" }}>
      <TextArea
        placeholder="writeyour review...."
        rows={3}
        disabled={written}
        value={Review}
        onChange={handleChange}
        onPressEnter={onReviewSubmitted}
        style={{ borderRadius: "10px", padding: "4px" }}
      />
    </div>
  );
};

export default WriteReview;
