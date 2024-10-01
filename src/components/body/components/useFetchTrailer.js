import { useEffect } from "react";
import { MOVIE_CONFIG, movieVideoUrl } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../../../redux/slice/movieSlice";

const useFetchTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  const fetchTrailer = async () => {
    const videoDetails = await fetch(movieVideoUrl(movieId), MOVIE_CONFIG);
    const res = await videoDetails.json();
    const trailer = res?.results?.filter((item) => item.type === "Trailer");

    dispatch(addMovieTrailer(trailer?.length === 1 ? trailer[0] : trailer[1]));
  };
};

export default useFetchTrailer;
