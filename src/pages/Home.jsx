import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../themoviedb-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";
import Loader from "../components/Loader/Loader.jsx";
import ErrorMassage from "../components/ErrorMassage/ErrorMassage.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadItems() {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchTrendingMovies();
        setItems(data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  return (
    <>
      <h1>Trending Today</h1>
      {loading && <Loader />}
      {error && <ErrorMassage />}
      {items.length > 0 ? (
        <MovieList items={items} />
      ) : (
        <p>No movies available at the moment.</p>
      )}
    </>
  );
}
