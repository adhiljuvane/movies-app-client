import React from "react";
import { BsPerson } from "react-icons/bs";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

const SingleReview = (props) => {
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
        <div style={{ marginLeft: "3px" }}>Adhil Juvane</div>
      </div>
      <hr style={{ color: "white" }} />
      <div>
        Ex dolor mollit pariatur fugiat. Fugiat dolor consequat est minim esse.
        Ad ea ut fugiat non deserunt. Culpa sunt dolor consectetur elit est
        dolore Lorem eiusmod Lorem in.
      </div>
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
