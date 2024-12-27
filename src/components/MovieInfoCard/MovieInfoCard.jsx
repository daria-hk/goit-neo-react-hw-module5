import css from "./MovieInfoCard.module.css";

const MovieInfoCard = ({ posterPath, title, userScore, overview, genres }) => {
  const genreList = genres?.map((genre) => genre.name).join(", ");
  return (
    <div className={css.movieInfoCard}>
      <img src={posterPath} alt={title} />
      <div className={css.movieInfoCardDescription}>
        <h1>{title}</h1>
        <p>User score: {userScore}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genreList}</p>
      </div>
    </div>
  );
};

export default MovieInfoCard;
