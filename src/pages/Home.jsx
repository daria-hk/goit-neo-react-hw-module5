import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchTrendingMovies } from "../themoviedb-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchTrendingMovies();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadItems();
  }, [query, page]);
  console.log(location);

  return (
    <>
      <h1> Trending Today </h1>
      {
        <>
          <MovieList items={items} />
        </>
      }
    </>
  );
}
