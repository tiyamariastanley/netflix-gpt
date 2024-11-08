import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slice/userSlice";
import movieSlice from "./redux/slice/movieSlice";
// import movieSearchSlice from "./redux/slice/movieSearchSlice";
import searchSuggestionSlice from "./redux/slice/searchSuggestionSlice";
import liveChatSlice from "./redux/slice/liveChatSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    movie: movieSlice,
    // movieSearch: movieSearchSlice,
    searchSuggestion: searchSuggestionSlice,
    liveChat: liveChatSlice,
  },
});

export default store;
