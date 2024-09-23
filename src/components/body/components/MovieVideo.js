import React from "react";
import { useSelector } from "react-redux";

const MovieVideo = () => {
  const videoDetails = useSelector((store) => store.movie.movieVideoDetails);
  const movieDetails = useSelector((store) => store.movie.selectedMovieDetails);

  return (
    <div className="w-screen aspect-video">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${videoDetails?.key}?si=NHsRI5ICAzyFbbQb&amp;controls=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>

      <div className="absolute z-20 top-56 text-white w-1/3 ml-14">
        <h1 className="text-6xl font-bold">{movieDetails.title}</h1>
        <p>{movieDetails.overview}</p>
        <button className="mt-5 px-5 py-2 bg-white text-black font-semibold rounded-sm">
          Play
        </button>
      </div>
    </div>
  );
};

export default MovieVideo;
