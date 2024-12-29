import { Link, useLocation } from "react-router-dom";
import { getMovieCredits } from "../../themoviedb-api.js";
import { useEffect, useState, useRef } from "react";
import css from "./MovieCast.module.css";

const MovieCast = ({ id }) => {
  const [movieInfos, setMovieInfos] = useState([]);
  const [showCast, setShowCast] = useState(false);
  const location = useLocation();
  const previousState = useRef(location.state || "/");

  const handleShowCast = async () => {
    if (!showCast) {
      try {
        const data = await getMovieCredits(id);
        setMovieInfos(data);
        setShowCast(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowCast(false);
    }
  };

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <>
      <Link
        to={`/movies/${id}/cast`}
        onClick={() => {
          handleShowCast();
        }}
        state={previousState.current}
      >
        Cast
      </Link>
      {showCast && (
        <ul>
          {movieInfos.map((item) => {
            const posterPath = item.profile_path
              ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
              : defaultImg;

            return (
              <li key={item.id} className={css.movieCast}>
                {posterPath && <img src={posterPath} alt={item.name} />}
                <div>
                  <strong>{item.name}</strong>
                  <p>Character: {item.character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
