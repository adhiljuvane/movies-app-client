import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";

const Favourite = (props) => {
  const [FavouriteNumber, setFavouriteNumber] = useState(0);
  const [Favourited, setFavourited] = useState(false);
  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };

  const onClickFavourite = () => {
    if (Favourited) {
      axios
        .post("/api/favourite/removeFromFavourite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavouriteNumber(FavouriteNumber - 1);
            setFavourited(!Favourited);
          } else {
            alert("Failed to remove from favourites");
          }
        });
    } else {
      axios.post("/api/favourite/addToFavourite", variable).then((response) => {
        console.log("response", response.data);
        if (response.data.success) {
          setFavouriteNumber(FavouriteNumber + 1);
          setFavourited(!Favourited);
        } else {
          alert("Failed to add to favourites");
        }
      });
    }
  };

  useEffect(() => {
    axios.post("/api/favourite/favourited", variable).then((response) => {
      if (response.data) {
        console.log("data", response.data);
        setFavourited(response.data.favourited);
      } else {
        alert("Failed to get Favourited");
      }
    });

    axios.post("/api/favourite/favouriteNumber", variable).then((response) => {
      console.log("Im here");
      if (response.data.success) {
        setFavouriteNumber(response.data.favouriteNumber);
      } else {
        alert("Failed to get favourites Number");
      }
    });
  }, []);
  return (
    <div
      style={{
        position: "relative",
        float: "right",
        top: "-50px",
        right: "10px",
      }}
    >
      <Button onClick={onClickFavourite}>
        {Favourited ? "Remove from Favourites" : "Add to Favourites"}
        {FavouriteNumber}
      </Button>
    </div>
  );
};
export default Favourite;
