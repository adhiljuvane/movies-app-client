import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import { Empty, message } from "antd";
import { Link } from "react-router-dom";

var _ = require("lodash");

const Friends = (props) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users.length]);

  // const viewProfile = (user) => {};

  const unFriend = (user) => {
    const data = {
      userFrom: localStorage.getItem("userId"),
      userTo: user._id,
    };
    axios.post("/api/users/unFriend", data).then((response) => {
      if (response.data.user) {
        message.success("User Unfriended");
      }
    });
  };

  return (
    <div
      style={{
        width: "100%",
        fontSize: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {_.head(Users) !== undefined ? (
        Users.map((user) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#edf0f1",
                borderRadius: "10px",
                padding: "7px",
                margin: "auto",
                width: "80%",
                marginBottom: "5px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {user.image ? (
                  <img src={user.image} style={{ borderRadius: "50%" }} />
                ) : (
                  <BsPerson />
                )}
                <div style={{ marginInline: "5px" }}>
                  <div>
                    {user.name ? user.name : props.userFrom}{" "}
                    {user.lastname ? user.lastname : props.userFrom}
                  </div>
                  <div>{user.email ? user.email : props.userFrom}</div>
                </div>
              </div>
              <div
                style={{
                  marginLeft: "3px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Link to={`/profile/${user._id}`}>
                  <div className="sign-in-button">View Profile</div>
                </Link>
                <div className="sign-in-button" onClick={() => unFriend(user)}>
                  UnFriend
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ color: "white" }}
        />
      )}
    </div>
  );
};

export default Friends;
