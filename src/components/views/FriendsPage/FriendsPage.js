import React, { useEffect, useState } from "react";
import { Typography, Tabs } from "antd";
import Users from "./Sections/Users";
import FriendRequests from "./Sections/FriendRequests";
import Friends from "./Sections/Friends";
import axios from "axios";

var _ = require("lodash");

const { Title } = Typography;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const FriendsPage = () => {
  const [AllUsers, setAllUsers] = useState([]);
  const [FriendsUsers, setFriendsUsers] = useState([]);
  const [FriendRequestsUsers, setFriendRequests] = useState([]);

  useEffect(() => {
    axios
      .all([getAllUsers(), getFriends(), getRequests()])
      .then(
        axios.spread((...responses) => {
          // console.log("all", AllUsers, responses[0]);
          // console.log("friends", FriendsUsers, responses[1]);
          // console.log("requests", FriendRequestsUsers, responses[2]);
        })
      )
      .catch((errors) => {
        console.log("err", errors.message);
      });
  }, [AllUsers.length, FriendsUsers.length, FriendRequestsUsers.length]);

  const getAllUsers = () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    axios.post("/api/users/getAll", data).then((response) => {
      if (response.data.users) {
        setAllUsers(response.data.users);
        // console.log("all", AllUsers, response.data.users);
      }
    });
  };

  const getFriends = () => {
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
              setFriendsUsers(users);
              // console.log("friends", FriendsUsers, users);
            }
          });
        });
      }
    });
  };

  const getRequests = () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    axios.post("/api/users/user", data).then((response) => {
      if (response.data.user.friendRequests) {
        response.data.user.friendRequests.forEach((request) => {
          const reqData = {
            id: request.requestFrom,
          };
          axios.post("/api/users/user", reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              setFriendRequests(users);
              // console.log("requestss", FriendRequestsUsers, users);
            }
          });
        });
      }
    });
  };

  return (
    <Tabs
      tabBarStyle={{
        color: "#0088a9",
      }}
      defaultActiveKey="1"
      onChange={callback}
      style={{
        width: "100%",
        height: "calc(100vh-80px)",
        padding: "1rem",
        height: "100vh",
        backgroundColor: "#24252A",
        paddingTop: "80px",
      }}
    >
      <TabPane tab="All Users" key="1">
        <Users users={AllUsers} />
      </TabPane>
      <TabPane tab="Friends" key="2">
        <Friends users={FriendsUsers} />
      </TabPane>
      <TabPane tab="Friend Requests" key="3">
        <FriendRequests users={FriendRequestsUsers} />
      </TabPane>
    </Tabs>
  );
};

export default FriendsPage;
