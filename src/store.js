import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slice/userSlice";
import movieSlice from "./redux/slice/movieSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
  },
});

export default store;
