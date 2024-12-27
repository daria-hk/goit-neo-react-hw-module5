import { useParams } from "react-router-dom";
import { getMovieItem } from "../themoviedb-api.js";
import { useEffect, useState } from "react";
import MovieInfoCard from "../components/MovieInfoCard/MovieInfoCard.jsx";
import MovieCast from "../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../components/MovieReviews/MovieReviews.jsx";
import css from "./pagesCss/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieInfos, setmovieInfos] = useState([]);
  const { movieId, title } = useParams();

  useEffect(() => {
    async function loadInfo() {
      try {
        const data = await getMovieItem(movieId);
        console.log(data);
        setmovieInfos(data);
      } catch (error) {
        console.error("Error");
      }
    }
    loadInfo();
  }, [movieId]);
  console.log("console", movieInfos);

  const posterPath = `https://image.tmdb.org/t/p/w500${movieInfos.poster_path}`;
  const userScore = movieInfos.vote_average * 10;

  return (
    <>
      <MovieInfoCard
        posterPath={posterPath}
        title={movieInfos.title}
        userScore={userScore}
        overview={movieInfos.overview}
        genres={movieInfos.genres}
      />
      <hr />
      <p>Additional information</p>
      <div className={css.additionals}>
        <MovieCast id={movieId} />
        <MovieReviews id={movieId} />
      </div>
    </>
  );
};

export default MovieDetailsPage;
