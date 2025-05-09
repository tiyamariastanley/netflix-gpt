import { useEffect, useState } from "react";
import { MOVIE_CONFIG } from "../../../utils/constants";

const useFetchMovies = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url, MOVIE_CONFIG);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        setData(result.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url]);

  return { data, loading, error };
};

export default useFetchMovies;
