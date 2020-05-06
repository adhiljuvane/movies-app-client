import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
var _ = require("lodash");

const FriendRequests = (props) => {
  const [Users, setUsers] = useState([]);
  const [Requests, setRequests] = useState([]);

  useEffect(() => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    axios.post("/api/users/user", data).then((response) => {
      if (response.data.user.friendRequests) {
        response.data.user.friendRequests.forEach((request) => {
          console.log("req", request);
          const reqData = {
            id: request.requestFrom,
          };
          axios.post("/api/users/user", reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              console.log("users", users);
              setUsers(users);
            }
          });
        });
      }
    });
  }, []);

  // const getRequestUsers = () => {
  //   console.log("here");
  //   Requests.forEach((request) => {
  //     const data = {
  //       id: request.requestFrom,
  //     };
  //     axios.post("/api/users/user", data).then((response) => {
  //       if (response.user) {
  //         let users = Users;
  //         users = [...users, response.user];
  //         setUsers(users);
  //       }
  //     });
  //   });
  // };

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
      {Users &&
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
                  <div>{user.name ? user.name : props.userFrom}</div>
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
                <div className="sign-in-button">Accept</div>
                <div className="sign-in-button">Reject</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FriendRequests;
