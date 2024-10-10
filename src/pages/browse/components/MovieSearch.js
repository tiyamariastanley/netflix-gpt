import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addResultDetails,
  addSearchInput,
  addSearchResult,
  closeOverlay,
} from "../../../redux/slice/movieSearchSlice";
import { MOVIE_CONFIG } from "../../../utils/constants";
import MovieCard from "./MovieCard";
//import { client } from "../../../utils/chatgptApi";

const MovieSearch = ({ input = "funny malayalam movies" }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((store) => store.movieSearch.searchResult);
  const resultDetails = useSelector((store) => store.movieSearch.resultDetails);

  // useEffect(() => {
  //   movieSearch();
  // }, []);

  // useEffect(() => {
  //   if (searchResults.length > 0) {
  //     getMovieDetails();
  //   }
  // }, [searchResults]);

  const movieSearch = async () => {
    //This is the actual openAI API call. But need subscription to do this. So i'm mocking the call and returning a result
    // const extendedQuery =
    //   "Suggest movie names like a movie critic based on the given input query. Provide just the top 5 movie names in a comma seaparated style";
    // const result = await client.chat.completions.create({
    //   messages: [{ role: "user", content: extendedQuery + input }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(result);

    setTimeout(
      () =>
        dispatch(
          addSearchResult([
            "Kilukkam",
            "Godfather",
            "Ramji Rao Speaking",
            "In Harihar Nagar",
            "Thenmavin Kombath",
            "Chithram",
            "Meesa Madhavan",
            "Punjabi House",
            "Kalyanaraman",
            "Vadakkunokkiyantram",
          ])
        ),
      3000
    );
  };

  const getMovieDetails = async () => {
    //Map function returns a promise array. It doesnt wait for each API call to get fullfilled.
    const promiseArray = searchResults.map(async (item) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${item}&include_adult=false&language=en-US&page=1`,
        MOVIE_CONFIG
      );
      const resultDetails = await res.json();

      return resultDetails.results[0];
    });

    //Promise.all will return the result once all promises are resolved
    const details = await Promise.all(promiseArray);

    dispatch(addResultDetails(details));
  };

  if (resultDetails.length === 0) {
    return null;
  }

  return (
    <div className="w-4/5 h-fit absolute top-[20%] left-[10%] z-50 opacity-95">
      <div
        className="float-end relative right-3 top-3 cursor-pointer"
        onClick={() => {
          dispatch(addSearchInput(""));
          dispatch(closeOverlay());
        }}
      >
        ❌
      </div>
      <div className="flex justify-center flex-wrap gap-4 p-14">
        {resultDetails.map((item) => (
          <MovieCard key={item.id} movieDetails={item} />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
