// src/pages/MovieDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, CircularProgress, Alert, Container,
  Card, CardMedia, CardContent, Chip, Button, IconButton, Tooltip, Divider
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';

function MovieDetailPage() {
  const { id } = useParams(); // Obtiene el ID de la película de la URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Estado para favoritos
  const theme = useTheme();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Llama a tu backend para obtener los detalles de la película
        const response = await fetch(`http://localhost:5000/api/movies/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Película no encontrada.');
          }
          throw new Error(`Error al cargar los detalles de la película: ${response.statusText}`);
        }
        const data = await response.json();
        setMovie(data);
        // TODO: En un futuro, aquí verificarías si la película está en la lista de favoritos del usuario
        // setIsFavorite(userData.favorites.includes(data.id));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err.message || "No pudimos cargar los detalles de la película.");
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Solo si hay un ID de película
      fetchMovieDetails();
    }
  }, [id]); // Vuelve a cargar si el ID de la URL cambia

  const handleToggleFavorite = () => {
    // TODO: Aquí integrarías la lógica del backend para añadir/quitar de favoritos
    // Por ahora, solo simula el cambio de estado en el frontend
    setIsFavorite(prev => !prev);
    console.log(`Película ${movie.title} ${isFavorite ? 'removida de' : 'añadida a'} favoritos.`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Por favor, verifica el ID de la película o inténtalo de nuevo más tarde.
        </Typography>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">No se encontraron detalles para esta película.</Alert>
      </Container>
    );
  }

  // Formatear la fecha de estreno
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  // Formatear la puntuación
  const formattedVoteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  // Obtener director(es) y actores (asumiendo que TMDB los proporciona en 'credits' o similar)
  // TMDB proporciona 'credits.crew' para el director y 'credits.cast' para actores.
  // Tu backend debe pasar esta información.
  const director = movie.credits?.crew?.find(member => member.job === 'Director')?.name || 'Desconocido';
  const cast = movie.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A'; // Top 5 actores

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        alignItems: { xs: 'center', md: 'flex-start' },
        p: { xs: 2, md: 4 },
        borderRadius: theme.shape.borderRadius * 3, // Más redondeado para la página de detalle
        background: theme.palette.background.glass, // Glassmorfismo
        backdropFilter: 'blur(18px) saturate(180%)', // Un poco más intenso
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
      }}>
        {/* Sección de Póster */}
        <Box sx={{
          flexShrink: 0, // Evita que el póster se encoja
          width: { xs: '100%', sm: '80%', md: '350px' },
          maxWidth: '350px',
          borderRadius: theme.shape.borderRadius * 2,
          overflow: 'hidden',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)',
          position: 'relative', // Para el botón de favorito
        }}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '2/3',
              objectFit: 'cover',
            }}
          />
          {/* Botón de Favoritos superpuesto */}
          <Tooltip title={isFavorite ? "Remover de favoritos" : "Añadir a favoritos"}>
            <IconButton
              aria-label="añadir a favoritos"
              onClick={handleToggleFavorite}
              sx={{
                position: 'absolute',
                top: theme.spacing(2),
                right: theme.spacing(2),
                backgroundColor: isFavorite ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.6)',
                color: isFavorite ? theme.palette.error.main : theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: isFavorite ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.1)',
                },
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                zIndex: 1,
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Sección de Detalles */}
        <Box sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{
            fontWeight: 700,
            background: theme.palette.gradientText, // Título con degradado
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
          }}>
            {movie.title} ({releaseYear})
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon sx={{ color: theme.palette.warning.main, fontSize: '2rem', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {formattedVoteAverage} <Typography component="span" variant="body1" color="text.secondary">/ 10</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              ({movie.vote_count?.toLocaleString()} votos)
            </Typography>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            **Director:** {director}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            **Protagonistas:** {cast}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {movie.genres?.map(genre => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  mr: 1,
                  mb: 1,
                  bgcolor: theme.palette.secondary.dark,
                  color: 'white',
                  fontWeight: 600,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    bgcolor: theme.palette.secondary.main,
                  }
                }}
              />
            ))}
          </Box>

          <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Sinopsis
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {movie.overview || 'Sinopsis no disponible.'}
          </Typography>

          {/* Opcional: Sección de reseñas o trailers */}
          {/* <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>Ver Trailer</Button>
            <Button variant="outlined" color="primary">Escribir Reseña</Button>
          </Box> */}
        </Box>
      </Box>
    </Container>
  );
}

export default MovieDetailPage;