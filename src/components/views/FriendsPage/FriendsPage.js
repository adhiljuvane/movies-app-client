import React from "react";
import { Typography, Tabs } from "antd";
import Users from "./Sections/Users";
import FriendRequests from "./Sections/FriendRequests";

const { Title } = Typography;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const FriendsPage = () => {
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
        <Users />
      </TabPane>
      <TabPane tab="Friends" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Friend Requests" key="3">
        <FriendRequests />
      </TabPane>
    </Tabs>
  );
};

export default FriendsPage;
