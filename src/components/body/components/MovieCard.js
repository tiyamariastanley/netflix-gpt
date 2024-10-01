import React from "react";

const MovieCard = ({ movieDetails }) => {
  return (
    <div className="w-32">
      <img
        className="rounded-sm"
        alt="movie-poster"
        src={`https://image.tmdb.org/t/p/w185/${movieDetails.poster_path}.jpg`}
      ></img>
    </div>
  );
};

export default MovieCard;
