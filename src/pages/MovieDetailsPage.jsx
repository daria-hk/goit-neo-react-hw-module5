import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId, title } = useParams();
  return <div>Now showing product with id - {title}</div>;
};

export default MovieDetailsPage;
