// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Alert } from '@mui/material';
import MovieCard from '../components/common/MovieCard'; // Asegúrate de que la ruta sea correcta

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // HomePage.jsx (Fragmento)
        const response = await fetch('http://localhost:5000/api/movies/popular'); // SUPONER TU BACKEND EN PUERTO 5000
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
         }
        const data = await response.json();
        setPopularMovies(data.results || data); // Asume que la API devuelve un objeto con 'results' o directamente un array
      } catch (err) {
        console.error("Error fetching popular movies:", err);
        setError("No pudimos cargar las películas populares en este momento. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // TODO: Implementar la lógica para añadir/quitar de favoritos cuando el backend esté listo
  const handleToggleFavorite = (movieId) => {
    console.log(`Película ${movieId} toggle favorito.`);
    // Aquí iría la llamada a tu API de backend para gestionar favoritos
    // Por ahora, solo es un placeholder
  };

  return (
    <Box sx={{ flexGrow: 1, py: 4, px: { xs: 2, sm: 3, md: 6 } }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Películas Más Populares
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && popularMovies.length === 0 && (
        <Alert severity="info" sx={{ my: 4 }}>
          No se encontraron películas populares.
        </Alert>
      )}

      {!loading && !error && popularMovies.length > 0 && (
        <Grid container spacing={3} justifyContent="center">
          {popularMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <MovieCard
                movie={movie}
              // isFavorite={false} // Por ahora, asume que no hay favoritos
              // onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default HomePage;