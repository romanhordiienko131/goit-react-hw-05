import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../services/tmdb-api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        toast.error("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>Trending today</h1>

      <MovieList movies={movies} />
      {loading && <Loader />}

      <Toaster />
    </>
  );
};

export default HomePage;
