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
  const [RemainingUsers, setRemainingUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(getFriends().then(getRequests()));
  }, []);

  useEffect(() => {
    var allUsers = AllUsers;
    allUsers = _.differenceWith(allUsers, FriendsUsers, _.isEqual);
    console.log("after friends", allUsers);
    allUsers = _.differenceWith(allUsers, FriendRequestsUsers, _.isEqual);
    console.log("after requets", allUsers);
    setRemainingUsers(allUsers);
  }, [AllUsers.length, FriendsUsers.length, FriendRequestsUsers.length]);

  const getAllUsers = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    await axios.post("/api/users/getAll", data).then((response) => {
      if (response.data.users) {
        setAllUsers(response.data.users);
        // console.log("all", AllUsers, response.data.users);
      }
    });
  };

  const getFriends = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    await axios.post("/api/users/user", data).then((response) => {
      if (response.data.user.friends) {
        response.data.user.friends.forEach((request) => {
          const reqData = {
            id: request.user,
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

  const getRequests = async () => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    var users = [];

    await axios.post("/api/users/user", data).then((response) => {
      if (response.data.user.friendRequests) {
        response.data.user.friendRequests.forEach((request) => {
          const reqData = {
            id: request.user,
          };
          axios.post("/api/users/user", reqData).then((response) => {
            if (response.data.user) {
              users = _.concat(users, response.data.user);
              setFriendRequests(users);
              console.log("requestss", FriendRequestsUsers, users);
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
        <Users users={RemainingUsers} />
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
