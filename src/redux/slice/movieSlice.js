import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingList: [],
    selectedMovieDetails: {},
    movieVideoDetails: {},
  },
  reducers: {
    addMovieList: (state, action) => {
      state.nowPlayingList = action.payload;
    },
    addSelectedMovieDetails: (state, action) => {
      state.selectedMovieDetails = action.payload;
    },
    addMovieVideo: (state, action) => {
      state.movieVideoDetails = action.payload;
    },
  },
});

export const { addMovieList, addMovieVideo, addSelectedMovieDetails } =
  movieSlice.actions;
export default movieSlice.reducer;
