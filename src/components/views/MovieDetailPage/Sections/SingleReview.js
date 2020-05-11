import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import { message } from "antd";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const SingleReview = (props) => {
  const [User, setUser] = useState([]);

  useEffect(() => {
    const data = {
      id: props.userFrom,
    };
    axios.post("/api/users/user", data).then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
      }
    });
  }, []);

  const liked = () => {
    const data = {
      userFrom: localStorage.getItem("userId"),
      movieId: props.movieId,
      likedReview: props.reviewId,
    };

    axios.post("/api/reviews/likeOne", data).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        message.success("Review Liked");
      }
    });
  };

  const disliked = () => {
    const data = {
      userFrom: localStorage.getItem("userId"),
      movieId: props.movieId,
      likedReview: props.reviewId,
    };

    axios.post("/api/reviews/dislikeOne", data).then((response) => {
      if (response.data.doc1 && response.data.doc2) {
        message.success("Review Disliked");
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#edf0f1",
        borderRadius: "10px",
        padding: "7px",
        margin: "auto",
        width: "80%",
        marginBottom: "5px",
        fontSize: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {User.image ? (
          <img src={User.image} style={{ borderRadius: "50%" }} />
        ) : (
          <BsPerson />
        )}
        <div
          style={{
            marginLeft: "3px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {User.name ? User.name : props.userFrom}
          <div style={{ fontSize: "14px" }}>{props.review.review}</div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "10%",
            justifyContent: "space-evenly",
          }}
        >
          <div>{props.review.likedBy && props.review.likedBy.length}</div>
          <FaRegThumbsUp style={{ marginRight: "25px" }} onClick={liked} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "10%",
            justifyContent: "space-evenly",
          }}
        >
          <div>{props.review.dislikedBy && props.review.dislikedBy.length}</div>
          <FaRegThumbsDown style={{ marginRight: "25px" }} onClick={disliked} />
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
