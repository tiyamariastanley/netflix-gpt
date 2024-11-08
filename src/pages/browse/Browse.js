import React, { useEffect } from "react";
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
  addMovieTrailer,
  addNowPlayingMovieList,
  addPopularMoviesList,
  addSelectedMovieDetails,
  addTopRatedMoviesList,
  addUpcomingMoviesList,
} from "../../redux/slice/movieSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const {
    data: nowPlayingMovies,
    loading: loadingNowPlaying,
    error: errorNowPlaying,
  } = useFetchMovies(NOW_PLAYING_MOVIES_URL);
  const { data: popularMovies } = useFetchMovies(POPULAR_MOVIES_URL);
  const { data: topRatedMovies } = useFetchMovies(TOP_RATED_MOVIES_URL);
  const { data: upcomingMovies } = useFetchMovies(UPCOMING_MOVIES_URL);

  const trailer = useFetchTrailer(nowPlayingMovies[0]?.id);

  useEffect(() => {
    if (trailer)
      dispatch(
        addMovieTrailer(trailer?.length === 1 ? trailer[0] : trailer[1])
      );
  }, [trailer]);

  useEffect(() => {
    if (nowPlayingMovies) {
      dispatch(addNowPlayingMovieList(nowPlayingMovies));
      dispatch(addSelectedMovieDetails(nowPlayingMovies[0]));
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
      {/* {showOverlay && <MovieSearch></MovieSearch>} */}
      <MovieTrailer />
      <MovieSuggestions />
      {/* <Footer /> */}
    </div>
  );
};

export default Browse;
