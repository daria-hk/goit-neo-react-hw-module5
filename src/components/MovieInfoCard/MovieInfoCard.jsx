import css from "./MovieInfoCard.module.css";

const MovieInfoCard = ({ posterPath, title, userScore, overview }) => {
  return (
    <div className={css.movieInfoCard}>
      <img src={posterPath} alt={title} />
      <div className={css.movieInfoCardDescription}>
        <h1>{title}</h1>
        <p>User score: {userScore}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h3>Genres</h3>
      </div>
    </div>
  );
};

export default MovieInfoCard;
