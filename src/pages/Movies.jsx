import { useEffect, useState } from "react";
import { fetchForSearchMovies } from "../themoviedb-api.js";
import MovieList from "../components/MovieList/MovieList.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Loader from "../components/Loader/Loader.jsx";
import ErrorMassage from "../components/ErrorMassage/ErrorMassage.jsx";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "../components/ImageModal/ImageModal.jsx";
import toast, { Toaster } from "react-hot-toast";

export default function Movies() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const initialValues = { search: "" };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const handleSubmit = (values, actions) => {
    const searchValue = values.search.trim();
    console.log(values);

    if (searchValue.length === 0) {
      toast.error("Please enter a search term!");
      return;
    }
    if (searchValue.length > 0) {
      setQuery(searchValue);
      setPage(1);
      setHasMorePhotos(true);
      actions.resetForm();
    }
  };

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!query) return; //if query is empty do not load
    console.log("query", query);

    async function loadPhotos() {
      try {
        setLoading(true);
        setError(false); // to disable error message if this was visible

        const data = await fetchForSearchMovies(query);
        console.log(data);

        if (data.length > 0) {
          // new search, replace old photos, otherwise, add new phootos.
          if (page === 1) {
            setPhotos(data);
          } else {
            setPhotos((prevPhotos) => [...prevPhotos, ...data]);
          }

          if (data.length < 12) {
            setHasMorePhotos(false);
          }
        } else {
          setPhotos([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      loadPhotos();
    }
  }, [query, page]);

  return (
    <div>
      <SearchBar initialValues={initialValues} onSubmit={handleSubmit} />
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
      {loading && <Loader />}
      {error && <ErrorMassage />}
      {photos.length > 0 ? (
        <>
          <MovieList items={photos} onImageClick={openModal} />
          {hasMorePhotos && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
        </>
      ) : (
        !loading && query && <p className="noPhotos">No photos found!</p>
      )}
      {selectedImage && (
        <ImageModal
          isOpen={modalIsOpen}
          imageUrl={selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
}
