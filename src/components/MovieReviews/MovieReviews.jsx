import { Link } from "react-router-dom";

const MovieReviews = ({ id }) => {
  return <Link to={`/movies/${id}/reviews`}>Reviews</Link>;
};

export default MovieReviews;
