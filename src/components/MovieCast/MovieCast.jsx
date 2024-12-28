import { Link } from "react-router-dom";
import { getMovieCredits } from "../../themoviedb-api.js";
import { useEffect, useState } from "react";

const MovieCast = ({ id }) => {
  const [movieInfos, setMovieInfos] = useState([]);
  const [showCast, setShowCast] = useState(false);

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

  return (
    <>
      <Link
        to="#"
        onClick={() => {
          handleShowCast();
        }}
      >
        Cast
      </Link>
      {showCast && (
        <ul>
          {movieInfos.map((item) => {
            const posterPath = item.profile_path
              ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
              : "";

            return (
              <li key={item.id}>
                {posterPath && (
                  <img
                    src={posterPath}
                    alt={`${item.name}'s profile`}
                    style={{
                      width: "100px",
                      height: "125px",
                      objectFit: "cover",
                    }}
                  />
                )}
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
