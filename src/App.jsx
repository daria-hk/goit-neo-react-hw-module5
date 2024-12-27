import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "./themoviedb-api.js";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation/Navigation.jsx";
import MovieDetailsPage from "./pages/MovieDetailsPage";

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
