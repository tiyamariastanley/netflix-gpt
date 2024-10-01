import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovieList: [],
    popularMoviesList: [],
    topRatedMoviesList: [],
    upcomingMoviesList: [],
    selectedMovieDetails: {},
    movieTrailerDetails: {},
  },
  reducers: {
    addNowPlayingMovieList: (state, action) => {
      state.nowPlayingMovieList = action.payload;
    },
    addSelectedMovieDetails: (state, action) => {
      state.selectedMovieDetails = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailerDetails = action.payload;
    },
    addPopularMoviesList: (state, action) => {
      state.popularMoviesList = action.payload;
    },
    addTopRatedMoviesList: (state, action) => {
      state.topRatedMoviesList = action.payload;
    },
    addUpcomingMoviesList: (state, action) => {
      state.upcomingMoviesList = action.payload;
    },
  },
});

export const {
  addNowPlayingMovieList,
  addMovieTrailer,
  addSelectedMovieDetails,
  addPopularMoviesList,
  addTopRatedMoviesList,
  addUpcomingMoviesList,
} = movieSlice.actions;
export default movieSlice.reducer;
