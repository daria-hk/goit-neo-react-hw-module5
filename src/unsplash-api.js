import axios from "axios";

const API_KEY = "2ac2fc2b9b3249e31b0eb40976859874";

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await axios.get(url);

    // Map results to include full image URL
    const movies = res.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Full image URL
    }));

    return movies;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};
