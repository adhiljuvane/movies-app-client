import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
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
  return (
    <div
      style={{
        backgroundColor: "#cdcdd4",
        borderRadius: "10px",
        padding: "7px",
        margin: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BsPerson />
        <div style={{ marginLeft: "3px" }}>
          {User.name ? User.name : props.userFrom}
        </div>
      </div>
      <hr style={{ color: "white" }} />
      <div>{props.review}</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
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
          <div>25</div>
          <FaRegThumbsUp style={{ marginRight: "25px" }} />
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
          <div>25</div>
          <FaRegThumbsDown style={{ marginRight: "25px" }} />
        </div>
      </div>
    </div>
  );
};

export default SingleReview;
