import { Link } from "react-router-dom";

const MovieCast = ({ id }) => {
  return <Link to={`/movies/${id}/cast`}>Cast</Link>;
};

export default MovieCast;
