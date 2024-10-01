import { useEffect, useState } from "react";
import { MOVIE_CONFIG } from "../../../utils/constants";

const useFetchMovies = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const movieList = await fetch(url, MOVIE_CONFIG);
    const data = await movieList.json();

    // const movieVideoId = data?.results[1]?.id;
    setData(data.results);
  };

  return data;
};

export default useFetchMovies;
