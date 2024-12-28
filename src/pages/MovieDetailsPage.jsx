import { Link, useLocation, useParams } from "react-router-dom";
import { getMovieDetails } from "../themoviedb-api.js";
import { useEffect, useState } from "react";
import MovieInfoCard from "../components/MovieInfoCard/MovieInfoCard.jsx";
import MovieCast from "../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../components/MovieReviews/MovieReviews.jsx";
import css from "./pagesCss/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieInfos, setmovieInfos] = useState([]);
  const { movieId, title } = useParams();
  const location = useLocation();
  const previousState = location.state || "/";

  useEffect(() => {
    async function loadInfo() {
      try {
        const data = await getMovieDetails(movieId);
        setmovieInfos(data);
      } catch (error) {
        console.error("Error");
      }
    }
    loadInfo();
  }, [movieId]);

  const posterPath = `https://image.tmdb.org/t/p/w500${movieInfos.poster_path}`;
  const userScore = movieInfos.vote_average * 10;
  console.log(location);

  return (
    <>
      <Link to={previousState}>
        <button>Back</button>
      </Link>
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
