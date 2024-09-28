import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import { getMovieReviewsById } from "../../services/tmdb-api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const movie = useOutletContext();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const data = await getMovieReviewsById(movie.id);
        setReviews(data);
      } catch {
        toast.error("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movie]);

  return (
    <>
      <ul>
        {reviews.map(({ author, content, created_at }) => (
          <li key={created_at}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
      {reviews.length === 0 && (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
      {loading && <Loader />}
    </>
  );
};

export default MovieReviews;
