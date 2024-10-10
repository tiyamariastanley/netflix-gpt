import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchTrailer from "../browse/components/useFetchTrailer";
import CommentSection from "./components/CommentSection";
import LiveChat from "./components/LiveChat";

const MoviePage = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const trailer = useFetchTrailer(params.movieId);

  useEffect(() => {
    if (trailer)
      setMovieDetails(trailer?.length === 1 ? trailer[0] : trailer[1]);
  }, [trailer]);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-screen grid grid-cols-8 py-28">
      <div className="bg-[#141414] pl-16 col-span-6">
        <iframe
          className="relative w-[90%] h-[45%] aspect-video"
          src={`https://www.youtube.com/embed/${movieDetails?.key}?&autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <CommentSection />
      </div>
      <LiveChat />
    </div>
  );
};

export default MoviePage;
