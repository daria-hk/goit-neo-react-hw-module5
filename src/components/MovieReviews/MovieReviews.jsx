import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../themoviedb-api.js";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data || []);
        console.log(data);
      } catch (error) {
        console.error("Error");
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <hr />
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.author}</strong>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
