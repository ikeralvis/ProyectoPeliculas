// movie-review-app-frontend/src/components/common/MovieCard.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, IconButton, Tooltip } from '@mui/material'; // Añadimos Box, IconButton, Tooltip
import FavoriteIcon from '@mui/icons-material/Favorite'; // Icono para favoritos
import StarIcon from '@mui/icons-material/Star'; // Icono para la puntuación
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Para acceder al tema

function MovieCard({ movie, onToggleFavorite, isFavorite }) { // Añadimos props para favoritos
  const theme = useTheme(); // Obtenemos el tema
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Tamaño de póster ligeramente mayor
    : 'https://via.placeholder.com/500x750?text=No+Poster'; // Placeholder más grande

  // Función para formatear la puntuación
  const formatVoteAverage = (vote) => {
    return vote ? vote.toFixed(1) : 'N/A';
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // Hereda el estilo glassmorfismo del MuiPaper global
        borderRadius: theme.shape.borderRadius * 2, // Usa el doble del borderRadius global
        overflow: 'hidden', // Asegura que los bordes redondeados se apliquen a la imagen
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)', // Efecto de elevación al pasar el ratón
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)', // Sombra más pronunciada en hover
        },
        position: 'relative', // Necesario para posicionar el botón de favoritos
      }}
    >
      <CardActionArea component={RouterLink} to={`/movie/${movie.id}`} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          // Usamos un aspectRatio para que se adapte mejor y sea más flexible que una altura fija
          sx={{
            width: '100%',
            height: 'auto',
            aspectRatio: '2/3', // Proporción común de pósters de películas
            objectFit: 'cover',
            borderBottom: `1px solid ${theme.palette.divider}`, // Separador sutil
          }}
          image={posterUrl}
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}> {/* Padding más controlado */}
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: theme.typography.h6.fontWeight,
              lineHeight: 1.3,
              height: 50, // Altura fija para el título para evitar saltos de layout
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2, // Limita el título a 2 líneas
              WebkitBoxOrient: 'vertical',
            }}
          >
            {movie.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1, // Margen superior
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </Typography>
            {movie.vote_average && ( // Muestra la puntuación solo si existe
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ color: theme.palette.warning.main, fontSize: '1rem', mr: 0.5 }} />
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                  {formatVoteAverage(movie.vote_average)}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Botón de Favoritos flotante */}
      {onToggleFavorite && ( // Solo muestra el botón si la prop onToggleFavorite existe
        <Tooltip title={isFavorite ? "Remover de favoritos" : "Añadir a favoritos"}>
          <IconButton
            aria-label="añadir a favoritos"
            onClick={(e) => {
              e.stopPropagation(); // Evita que se dispare el Link de la tarjeta
              e.preventDefault(); // Evita el comportamiento por defecto del evento
              onToggleFavorite(movie.id);
            }}
            sx={{
              position: 'absolute',
              top: theme.spacing(1.5), // Separación del borde superior
              right: theme.spacing(1.5), // Separación del borde derecho
              backgroundColor: isFavorite ? theme.palette.primary.dark : 'rgba(0, 0, 0, 0.6)',
              color: isFavorite ? theme.palette.error.main : theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: isFavorite ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.8)',
                transform: 'scale(1.1)', // Pequeña animación
              },
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              zIndex: 1, // Asegura que esté por encima de la imagen
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Card>
  );
}

export default MovieCard;