import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getMoviesBySearchQuery } from "../../services/tmdb-api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const searchQuery = searchParams.get("search") ?? "";

  useEffect(() => {
    if (searchQuery.trim() === "") return;

    const getData = async () => {
      try {
        setMovies([]);
        setLoading(true);

        const data = await getMoviesBySearchQuery(searchQuery);
        setMovies(data);
      } catch {
        toast.error("Error searching movies");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const searchQuery = form.elements.search.value;

    if (searchQuery.trim() === "") return;

    searchParams.set("search", searchQuery);
    setSearchParams(searchParams);

    form.reset();
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
