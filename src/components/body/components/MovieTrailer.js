import React from "react";
import { useSelector } from "react-redux";

const MovieTrailer = () => {
  const trailerDetails = useSelector(
    (store) => store.movie.movieTrailerDetails
  );
  const movieDetails = useSelector((store) => store.movie.selectedMovieDetails);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video -mt-28"
        src={`https://www.youtube.com/embed/${trailerDetails?.key}?&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <div className="absolute z-20 top-0 bg-gradient-to-r from-black w-screen aspect-video">
        <div className="absolute z-20 top-56 text-white w-1/3 ml-14">
          <h1 className="text-6xl font-bold">{movieDetails?.title}</h1>
          <p>{movieDetails?.overview}</p>
          <button className="mt-5 px-5 py-2 bg-white text-black font-semibold rounded-md hover:bg-opacity-70">
            Play
          </button>
          <button className="mt-5 px-5 py-2 text-white bg-white bg-opacity-30 font-semibold rounded-md ml-3 hover:bg-opacity-10">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailer;
