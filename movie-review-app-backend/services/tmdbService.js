// movie-review-app-backend/services/tmdbService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno del .env

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Obtenemos la clave de nuestro .env
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'; // URL base de la API de TMDB

// Función para obtener películas populares
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES' // Idioma de los resultados
      }
    });
    return response.data; // Devuelve los datos brutos de la respuesta de TMDB
  } catch (error) {
    console.error('Error fetching popular movies from TMDB:', error.response ? error.response.data : error.message);
    throw new Error('No se pudieron obtener las películas populares de TMDB.');
  }
};

// Función para buscar películas
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        language: 'es-ES'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies from TMDB:', error.response ? error.response.data : error.message);
    throw new Error('No se pudieron buscar películas en TMDB.');
  }
};

// Función para obtener detalles de una película por ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES',
        append_to_response: 'credits,videos' // Para obtener actores, directores y trailers
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId} from TMDB:`, error.response ? error.response.data : error.message);
    throw new Error('No se pudieron obtener los detalles de la película de TMDB.');
  }
};