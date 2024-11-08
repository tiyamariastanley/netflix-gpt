import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movieDetails }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-32"
      onClick={() => navigate(`/movie/${movieDetails.id}`)}
      data-testid={`movie-card-${movieDetails.id}`}
    >
      <img
        className="rounded-sm"
        alt="movie-poster"
        src={`https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}.jpg`}
      ></img>
    </div>
  );
};

export default MovieCard;
