import axios from "axios";

const API_KEY = "2ac2fc2b9b3249e31b0eb40976859874";
const BACE_URL = "https://api.themoviedb.org/3/";

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const url = `${BACE_URL}trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await axios.get(url);

    return res.data.results;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const fetchForSearchMovies = async (query, page = 1) => {
  try {
    const url = `${BACE_URL}search/movie?query=${query}&include_adult=false&api_key=${API_KEY}&language=en-US&page=${page}`;
    const res = await axios.get(url);

    return res.data.results;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const url = `${BACE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const getMovieCredits = async (id) => {
  try {
    const url = `${BACE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    const res = await axios.get(url);

    return res.data.cast;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const getMovieReviews = async (id) => {
  try {
    const url = `${BACE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US`;
    const res = await axios.get(url);

    return res.data.results;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};
