import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const searchSuggestionSlice = createSlice({
  name: "searchSuggestion",
  initialState: {},
  reducers: {
    cacheSuggestions: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { cacheSuggestions } = searchSuggestionSlice.actions;
export default searchSuggestionSlice.reducer;
