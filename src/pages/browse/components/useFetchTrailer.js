import { useEffect, useState } from "react";
import { MOVIE_CONFIG, movieVideoUrl } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../../../redux/slice/movieSlice";

const useFetchTrailer = (movieId) => {
  const [trailerDetails, setTrailerDetails] = useState({});

  useEffect(() => {
    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  const fetchTrailer = async () => {
    const videoDetails = await fetch(movieVideoUrl(movieId), MOVIE_CONFIG);
    const res = await videoDetails.json();

    const trailer = res?.results?.filter((item) => item.type === "Trailer");
    setTrailerDetails(trailer);
  };

  return trailerDetails;
};

export default useFetchTrailer;
