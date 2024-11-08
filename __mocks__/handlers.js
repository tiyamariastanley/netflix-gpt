import { http, HttpResponse } from "msw";
import MOCK_MOVIES_DATA from "./MoviesMockData.json";
import MOCK_TRAILER_DATA from "./MoviesMockData.json";
import { NOW_PLAYING_MOVIES_URL } from "../../utils/constants";

// export const handlers = [
//   // Mock the restaurant list API
//   http.get(NOW_PLAYING_MOVIES_URL, ({ request }) => {
//     console.log("first request", request);
//     return HttpResponse.json(MOCK_MOVIES_DATA);
//   }),
//   http.get(
//     "https://api.themoviedb.org/3/movie/912649/videos?language=en-US",
//     ({ request }) => {
//       return HttpResponse.json(MOCK_TRAILER_DATA);
//     }
//   ),
//   // Add more handlers for other API calls if necessary
// ];
