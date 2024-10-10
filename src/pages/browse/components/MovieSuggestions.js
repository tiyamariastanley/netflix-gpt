import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MovieSuggestions = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movie.nowPlayingMovieList
  );
  const popularMovies = useSelector((store) => store.movie.popularMoviesList);
  const topRatedMovies = useSelector((store) => store.movie.topRatedMoviesList);
  const upcomingMovies = useSelector((store) => store.movie.upcomingMoviesList);

  const movieList = [
    { category: "Now Playing", list: nowPlayingMovies },
    { category: "Popular", list: popularMovies },
    { category: "Top Rated", list: topRatedMovies },
    { category: "Upcoming", list: upcomingMovies },
  ];

  return (
    <div>
      <div className="-mt-36 relative z-30 w-screen">
        {movieList.map((item) => (
          <div
            key={item.category}
            className="flex flex-col gap-2 pl-14 mb-10 last-of-type:last:mb-0"
          >
            <h1 className="text-white font-semibold text-xl">
              {item.category}
            </h1>
            <div className="flex overflow-x-scroll no-scrollbar">
              <div className="flex flex-row gap-2">
                {item.list.map((movie) => (
                  <MovieCard key={movie.id} movieDetails={movie} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSuggestions;
