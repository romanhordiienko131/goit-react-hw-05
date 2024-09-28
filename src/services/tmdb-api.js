import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2ZmY2Q1NWI1OTEzZTBjNTM2ZDQ4ZjE0ZTJhZjk0ZiIsIm5iZiI6MTcyNzQzMDU0My45Mjk2MTMsInN1YiI6IjY2ZjQwMmM4M2E5NWE1YmNkYTIyZmMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g3TJXPdRzSPp5hakDR41ajARu6LXGinqE7ZLkf1crYE";

const getTrendingMovies = async () => {
  const { data } = await axios.get("trending/movie/day");
  return data.results;
};

const getMoviesBySearchQuery = async (query) => {
  const { data } = await axios.get("search/movie", {
    params: {
      query,
    },
  });
  return data.results;
};

const getMovieDetailsById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}`);
  return data;
};

const getMovieCastById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/credits`);
  return data.cast;
};

const getMovieReviewsById = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}/reviews`);
  return data.results;
};

export {
  getTrendingMovies,
  getMoviesBySearchQuery,
  getMovieDetailsById,
  getMovieCastById,
  getMovieReviewsById,
};
