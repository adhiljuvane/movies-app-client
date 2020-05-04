/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { USER_SERVER } from "../../../Config";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div
        mode={props.mode}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div>
          <Link to="/login" className="sign-in-button">
            Sign In
          </Link>
        </div>
        <div>
          <Link to="/register" className="sign-in-button">
            Sign Up
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div
        mode={props.mode}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div className="sign-in-button">
          <a onClick={logoutHandler}>Logout</a>
        </div>
      </div>
    );
  }
}

export default withRouter(RightMenu);
