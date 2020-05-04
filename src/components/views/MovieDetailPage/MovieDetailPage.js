import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import { Typography, Rate, Row } from "antd";
import GridCard from "../LandingPage/Sections/GridCard";
import Favourite from "./Sections/Favourite";
import { Reviews } from "./Sections/Reviews";
import WriteReview from "./Sections/WriteReview";

const { Title } = Typography;

function MovieDetailPage(props) {
  const movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        console.log("movie", response);
        setMovie(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            console.log("crew", response.cast);
            setCast(response.cast);
          });
      });
  }, []);
  return (
    <div style={{ width: "100%", margin: 0, scrollbarWidth: "none" }}>
      {Movie && (
        <MainImage
          image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}
      <Favourite
        userFrom={localStorage.getItem("userId")}
        movieId={movieId}
        movieInfo={Movie}
      />
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "1rem",
        }}
      >
        <h1>{Movie && Movie.original_title}</h1>
        <div>{Movie && Movie.tagline}</div>
        <div>
          Rating :{" "}
          {Movie && (
            <Rate allowHalf disabled value={Movie.vote_average} count={10} />
          )}
        </div>
        <div>Rated By : {Movie && Movie.vote_count} people</div>
        <div>Relaese Date : {Movie && Movie.release_date}</div>
        <div>Movie Runtime : {Movie && Movie.runtime} Min</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          Genres :{" "}
          {Movie.genres &&
            Movie.genres.map((genre, index) => (
              <div key={index} style={{ marginRight: "5px" }}>
                {genre.name}
              </div>
            ))}
        </div>
      </div>
      <Title style={{ marginLeft: "1rem" }}>Cast</Title>
      <Row gutter={[16, 6]} style={{ margin: "-3px 3px" }}>
        {Cast &&
          Cast.map((cast, index) =>
            index < 15 ? (
              <React.Fragment key={index}>
                {cast.profile_path && (
                  <GridCard
                    actor={cast.name}
                    image={`${IMAGE_URL}w500${cast.profile_path}`}
                  />
                )}
              </React.Fragment>
            ) : null
          )}
      </Row>
      <Title style={{ margin: "1rem" }}>Reviews</Title>
      <WriteReview />
      <Reviews />
    </div>
  );
}

export default MovieDetailPage;
