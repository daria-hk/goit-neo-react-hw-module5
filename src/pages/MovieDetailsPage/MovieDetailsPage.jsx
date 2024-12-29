import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import { getMovieDetails } from "../../themoviedb-api.js";
import { useEffect, useRef, useState } from "react";
import MovieInfoCard from "../../components/MovieInfoCard/MovieInfoCard.jsx";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieInfos, setmovieInfos] = useState([]);
  const { movieId, title } = useParams();
  const location = useLocation();
  const previousState = useRef(location.state || "/");

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

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  const posterPath = movieInfos.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieInfos.poster_path}`
    : defaultImg;
  const userScore = movieInfos.vote_average * 10;

  return (
    <>
      <Link to={previousState.current}>
        <button className={css.backButton}>Back</button>
      </Link>
      <MovieInfoCard
        posterPath={posterPath}
        title={movieInfos.title}
        userScore={userScore}
        overview={movieInfos.overview}
        genres={movieInfos.genres}
      />
      <hr />
      <h3 className={css.additionalInfo}>Additional information</h3>
      <div className={css.additionals}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
        <Outlet />
      </div>
      <hr />
    </>
  );
};

export default MovieDetailsPage;
