import React, { useState } from "react";
import { Input } from "antd";

const { TextArea } = Input;

const WriteReview = () => {
  const [Review, setReview] = useState("");
  const [written, setWritten] = useState(false);

  const onReviewSubmitted = (e) => {
    e.preventDefault();
    console.log("review", e.target.value);
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
