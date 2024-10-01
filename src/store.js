import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slice/userSlice";
import movieSlice from "./redux/slice/movieSlice";
import movieSearchSlice from "./redux/slice/movieSearchSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
    movieSearch: movieSearchSlice,
  },
});

export default store;
