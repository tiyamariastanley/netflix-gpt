import { createSlice } from "@reduxjs/toolkit";

const movieSearchSlice = createSlice({
  name: "movieSearch",
  initialState: {
    searchInput: null,
    showOverlay: false,
    searchResult: [],
    resultDetails: [],
  },
  reducers: {
    addSearchInput: (state, action) => {
      state.searchInput = action.payload;
      state.showOverlay = true;
    },
    addSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    addResultDetails: (state, action) => {
      state.resultDetails = action.payload;
    },
    closeOverlay: (state, action) => {
      state.showOverlay = false;
    },
  },
});

export const {
  addSearchInput,
  addSearchResult,
  addResultDetails,
  closeOverlay,
} = movieSearchSlice.actions;
export default movieSearchSlice.reducer;
