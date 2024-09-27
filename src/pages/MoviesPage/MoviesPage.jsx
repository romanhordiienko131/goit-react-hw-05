import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getMoviesBySearchQuery } from "../../services/tmdb-api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value;
    if (searchQuery.trim() === "") return;

    try {
      setLoading(true);

      const data = await getMoviesBySearchQuery(searchQuery);
      if (data.length === 0) {
        toast("No movies found");
      } else {
        setMovies(data);
      }
    } catch {
      toast.error("Error searching movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <MovieList movies={movies} />
      {loading && <Loader />}

      <Toaster />
    </>
  );
};

export default MoviesPage;
