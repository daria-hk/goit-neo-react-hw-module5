import { useEffect, useState } from "react";
import { fetchForSearchMovies } from "../themoviedb-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Loader from "../components/Loader/Loader.jsx";
import ErrorMassage from "../components/ErrorMassage/ErrorMassage.jsx";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function Movies() {
  const [movies, setmovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoremovies, setHasMoreMovies] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(searchQuery);
  const initialValues = { search: "" };

  const handleSubmit = (values, actions) => {
    const searchValue = values.search.trim();

    if (searchValue.length === 0) {
      toast.error("Please enter a search term!");
      return;
    }
    if (searchValue.length > 0) {
      searchParams.set("query", searchValue);
      setSearchParams(searchParams);
      setQuery(searchValue);
      setPage(1);
      setHasMoreMovies(true);
      actions.resetForm();
    }
  };

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!query) return; //if query is empty do not load

    async function loadmovies() {
      try {
        setLoading(true);
        setError(false); // to disable error message if this was visible

        const data = await fetchForSearchMovies(query, page);

        if (data.length > 0) {
          // new search, replace old movies, otherwise, add new phootos.
          if (page === 1) {
            setmovies(data);
          } else {
            setmovies((prevmovies) => [...prevmovies, ...data]);
          }

          if (data.length < 12) {
            setHasMoreMovies(false);
          }
        } else {
          setmovies([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      loadmovies();
    }
  }, [query, page]);

  return (
    <>
      <SearchBar initialValues={initialValues} onSubmit={handleSubmit} />
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMassage />}
      {movies.length > 0 ? (
        <>
          <MovieList items={movies} />
          {hasMoremovies && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
        </>
      ) : (
        !loading && query && <p className="noMovies">No movies found!</p>
      )}
    </>
  );
}
