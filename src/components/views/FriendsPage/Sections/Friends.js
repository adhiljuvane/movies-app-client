import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import { Empty } from "antd";

var _ = require("lodash");

const Friends = (props) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    axios.post("/api/users/user", data).then((response) => {
      if (response.data.user.friends) {
        response.data.user.friends.forEach((request) => {
          const reqData = {
            id: request.requestFrom,
          };
          axios.post("/api/users/user", reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              setUsers(users);
            }
          });
        });
      }
    });
  }, []);

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
                <div className="sign-in-button">View Profile</div>
                <div className="sign-in-button">UnFriend</div>
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
