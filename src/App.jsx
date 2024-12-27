import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "./themoviedb-api.js";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation/Navigation.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMassage from "./components/ErrorMassage/ErrorMassage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import toast, { Toaster } from "react-hot-toast";

export function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

/** <SearchBar initialValues={initialValues} onSubmit={handleSubmit} />
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
        )} */
