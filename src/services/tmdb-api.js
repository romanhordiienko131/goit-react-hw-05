import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTY1ZDEzZjBiNzBjMzA3OWZlZTkwYzcwMzY4MjRlOSIsIm5iZiI6MTcyNzI4NzU4Ny4yNjU3MzEsInN1YiI6IjY2ZjQwMmM4M2E5NWE1YmNkYTIyZmMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RA8X0_IOMW0kyJ3W7yM06XVXU39YucO1Ueh6j5YY9Lo";

const fetchMovies = async () => {
  const { data } = await axios.get("trending/movie/day");
  return data.results;
};

export { fetchMovies };
