import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../themoviedb-api.js";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data || []);
      } catch (error) {
        console.error("Error");
      }
    };

    fetchCast();
  }, [movieId]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      <hr />
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.movieCast}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
            />
            <div>
              <strong>{actor.name}</strong>
              <p>Character: {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
