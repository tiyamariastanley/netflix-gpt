import React, { useEffect } from "react";
import Header from "../Header";
import {
  NOW_PLAYING_MOVIES_URL,
  POPULAR_MOVIES_URL,
  TOP_RATED_MOVIES_URL,
  UPCOMING_MOVIES_URL,
} from "../../utils/constants";
import MovieTrailer from "./components/MovieTrailer";
import MovieSuggestions from "./components/MovieSuggestions";
import { useDispatch, useSelector } from "react-redux";

import useFetchMovies from "./components/useFetchMovies";
import useFetchTrailer from "./components/useFetchTrailer";
import {
  addNowPlayingMovieList,
  addPopularMoviesList,
  addSelectedMovieDetails,
  addTopRatedMoviesList,
  addUpcomingMoviesList,
} from "../../redux/slice/movieSlice";
import MovieSearch from "./components/MovieSearch";

const Browse = () => {
  const dispatch = useDispatch();
  const showOverlay = useSelector((store) => store.movieSearch.showOverlay);
  const nowPlayingMovies = useFetchMovies(NOW_PLAYING_MOVIES_URL);
  const popularMovies = useFetchMovies(POPULAR_MOVIES_URL);
  const topRatedMovies = useFetchMovies(TOP_RATED_MOVIES_URL);
  const upcomingMovies = useFetchMovies(UPCOMING_MOVIES_URL);

  useFetchTrailer(nowPlayingMovies[1]?.id);

  useEffect(() => {
    if (nowPlayingMovies) {
      dispatch(addNowPlayingMovieList(nowPlayingMovies));
      dispatch(addSelectedMovieDetails(nowPlayingMovies[1]));
    }
  }, [nowPlayingMovies]);

  useEffect(() => {
    if (popularMovies) {
      dispatch(addPopularMoviesList(popularMovies));
    }
  }, [popularMovies]);

  useEffect(() => {
    if (topRatedMovies) {
      dispatch(addTopRatedMoviesList(topRatedMovies));
    }
  }, [topRatedMovies]);

  useEffect(() => {
    if (upcomingMovies) {
      dispatch(addUpcomingMoviesList(upcomingMovies));
    }
  }, [upcomingMovies]);

  return (
    <div>
      <Header logoStyle={"w-26 h-12 absolute top-2 left-12 z-20"} />
      {showOverlay && <MovieSearch></MovieSearch>}
      <MovieTrailer />
      <MovieSuggestions />
    </div>
  );
};

export default Browse;
