import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import axios from "axios";

function FavouritePage() {
  const [favouriteMovies, setfavouriteMovies] = useState([]);

  const columns = [
    {
      title: "Movie Title",
      dataIndex: "movieTitle",
      key: "movieTitle",
    },
    {
      title: "Movie RunTime",
      dataIndex: "movieRunTime",
      key: "movieRunTime",
    },
    {
      title: "Remove From Favourites",
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record)}
        >
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = (record) => {
    axios
      .post("/api/favourite/removeFromFavourite", record)
      .then((response) => {
        if (response.data.success) {
          fetchFavouriteMovies();
        } else {
          alert("Failed to remove from favourites");
        }
      });
  };

  const variable = {
    userFrom: localStorage.getItem("userId"),
  };

  useEffect(() => {
    fetchFavouriteMovies();
  }, []);

  const fetchFavouriteMovies = () => {
    axios
      .post("/api/favourite/getFavouriteMovies", variable)
      .then((response) => {
        if (response.data.success) {
          setfavouriteMovies(response.data.favourites);
        } else {
          alert("failed to get favourites");
        }
      });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>My Favourites</h2>
      <Table dataSource={favouriteMovies} columns={columns} />;
    </div>
  );
}

export default FavouritePage;
