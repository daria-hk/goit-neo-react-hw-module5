import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../themoviedb-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchTrendingMovies();
        console.log(data);

        setItems(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [query, page]);

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
