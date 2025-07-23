// movie-review-app-frontend/src/services/api.js
import axios from 'axios';

// ¡MUY IMPORTANTE! Esta URL debe ser la de tu backend.
const API_BASE_URL = 'http://localhost:5000/api';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/popular`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies from your backend:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/search`, {
      params: { query }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies from your backend:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId} from your backend:`, error);
    throw error;
  }
};