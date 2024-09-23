import React, { useEffect } from "react";
import Header from "../Header";
import {
  MOVIE_CONFIG,
  MOVIE_LIST_URL,
  movieVideoUrl,
} from "../../utils/constants";
import MovieVideo from "./components/MovieVideo";
import MovieSuggestions from "./components/MovieSuggestions";
import { useDispatch } from "react-redux";
import {
  addMovieList,
  addMovieVideo,
  addSelectedMovieDetails,
} from "../../redux/slice/movieSlice";

const Browse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const movieList = await fetch(MOVIE_LIST_URL, MOVIE_CONFIG);
    const data = await movieList.json();
    dispatch(addMovieList(data?.results));
    dispatch(addSelectedMovieDetails(data?.results[1]));

    const movieVideoId = data?.results[1]?.id;

    const videoDetails = await fetch(movieVideoUrl(movieVideoId), MOVIE_CONFIG);
    const res = await videoDetails.json();
    const trailer = res?.results.filter((item) => item.type === "Trailer");

    dispatch(addMovieVideo(trailer.length === 1 ? trailer[0] : trailer[1]));
  };

  return (
    <div>
      <Header logoStyle={"w-26 h-12 absolute top-2 left-12 z-20"} />
      <MovieVideo />
      <MovieSuggestions />
    </div>
  );
};

export default Browse;
