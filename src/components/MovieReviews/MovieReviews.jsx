import { Link, useLocation } from "react-router-dom";
import { getMovieReviews } from "../../themoviedb-api.js";
import { useEffect, useState } from "react";

const MovieReviews = ({ id }) => {
  const [movieInfos, setMovieInfos] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const location = useLocation();
  const previousState = location.state || "/";

  const handleShowReview = async () => {
    if (!showReview) {
      try {
        const data = await getMovieReviews(id);
        setMovieInfos(data);
        setShowReview(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowReview(false);
    }
  };

  return (
    <>
      <Link
        to={`/movies/${id}/reviews`}
        onClick={() => {
          handleShowReview();
        }}
        state={previousState}
      >
        Review
      </Link>
      {showReview && (
        <ul>
          {movieInfos.length > 0 ? (
            movieInfos.map((item) => {
              return (
                <li key={item.id}>
                  <strong>{item.author}</strong>
                  <p>{item.content}</p>
                </li>
              );
            })
          ) : (
            <p>No reviews found.</p>
          )}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
