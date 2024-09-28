import { Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetailsById } from "../../services/tmdb-api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);

  const location = useLocation();
  const { movieId } = useParams();

  const goBackRef = useRef(location.state);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await getMovieDetailsById(movieId);
        setMovieDetails(details);
      } catch {
        toast.error("Error fetching movie details");
      }
    };
    getDetails();
  }, [movieId]);

  if (!movieDetails) return <h1>Loading...</h1>;
  return (
    <>
      <Link to={goBackRef.current ?? "/movies"}>Go back</Link>
      <div className={s.movieInfo}>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : "https://dummyimage.com/500x750/cdcdcd/000.jpg&text=No+poster"
          }
          alt="Movie poster"
        />
        <div>
          <div>
            <h1>
              {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
            </h1>
            <p>
              User Score: {Math.round(movieDetails.vote_average * 10) + "%"}
            </p>
          </div>
          <div>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
          </div>
          <div>
            <h3>Genres</h3>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      </div>
      <hr />
      <p>Additional information</p>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback="Loading...">
        <Outlet context={movieDetails} />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
