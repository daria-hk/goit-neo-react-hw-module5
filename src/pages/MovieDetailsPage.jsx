import { useParams } from "react-router-dom";
import { getMovieItem } from "../themoviedb-api.js";
import { useEffect, useState } from "react";
import MovieInfoCard from "../components/MovieInfoCard/MovieInfoCard.jsx";

const MovieDetailsPage = () => {
  const [items, setItems] = useState([]);
  const { movieId, title } = useParams();
  useEffect(() => {
    async function loadInfo() {
      try {
        const data = await getMovieItem(movieId);
        console.log(data);
        setItems(data);
      } catch {}
    }
    loadInfo();
  }, [movieId]);
  console.log("console", items);
  const posterPath = `https://image.tmdb.org/t/p/w500${items.poster_path}`;
  const userScore = items.vote_average * 10;
  return (
    <MovieInfoCard
      posterPath={posterPath}
      title={items.title}
      userScore={userScore}
      overview={items.overview}
    />
  );
};

export default MovieDetailsPage;

/**
 *     const movies = res.data.forEach((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Full image URL
    }));
 */
