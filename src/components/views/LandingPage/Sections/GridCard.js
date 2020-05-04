import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";
import "./GridCard.css";

function GridCard(props) {
  if (props.actor) {
    return (
      <Col lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt=""
            src={props.image}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              color: "white",
              width: "100%",
              height: "50px",
              opacity: "85%",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgb(121, 121, 121)",
              paddingLeft: "3px",
            }}
          >
            {props.actor}
          </div>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }} className="card">
          <Link to={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              alt=""
              src={props.image}
            />
          </Link>
        </div>
      </Col>
    );
  }
}

export default GridCard;
