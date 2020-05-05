import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import axios from "axios";

const Users = (props) => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const data = {
      id: localStorage.getItem("userId"),
    };
    axios.post("/api/users/getAll", data).then((response) => {
      if (response.data.users) {
        setUsers(response.data.users);
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
                  {user.name ? user.name : props.userFrom}
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
                <div className="sign-in-button">Send Request</div>
                <div className="sign-in-button">Cancel Request </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Users;
