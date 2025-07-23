
import express from 'express';
// Importamos las funciones del servicio TMDB que acabamos de crear
import { getPopularMovies, searchMovies, getMovieDetails } from '../services/tmdbService.js';

const router = express.Router(); // Creamos un router de Express

// Ruta para obtener películas populares: GET /api/movies/popular
router.get('/popular', async (req, res) => {
  try {
    const movies = await getPopularMovies(); // Llama a la función del servicio
    res.json(movies); // Envía la respuesta de TMDB directamente al frontend
  } catch (error) {
    // En caso de error, envía un mensaje de error 500
    res.status(500).json({ message: error.message });
  }
});

// Ruta para buscar películas: GET /api/movies/search?query=...
router.get('/search', async (req, res) => {
  const { query } = req.query; // Obtiene el parámetro 'query' de la URL
  if (!query) {
    return res.status(400).json({ message: 'El parámetro de búsqueda "query" es requerido.' });
  }
  try {
    const movies = await searchMovies(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener detalles de una película: GET /api/movies/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la URL
  try {
    const movieDetails = await getMovieDetails(id);
    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; // Exporta el router para usarlo en el servidor principal