// src/pages/MoviesPage.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Agregamos useCallback
import {
  Box, Typography, Container, Grid, TextField, InputAdornment, MenuItem,
  Pagination, CircularProgress, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
// import StarIcon from '@mui/icons-material/Star'; // Ya no lo necesitas aquí si usas MovieCard
// import { Link } from 'react-router-dom'; // No es necesario si MovieCard maneja el Link
import MovieCard from '../components/common/MovieCard'; // Importamos tu MovieCard
import { useTheme } from '@mui/material/styles'; // Para acceder al tema

// Puedes mantener estos mock data para los selectores si tu backend no los provee,
// o si prefieres tener control sobre las opciones disponibles en el frontend.
const genres = ['Acción', 'Comedia', 'Drama', 'Ciencia Ficción', 'Terror', 'Aventura', 'Romance'];
const years = ['2024', '2023', '2022', '2021', '2020', 'Anteriores', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000']; // Ampliado para más años

const ITEMS_PER_PAGE = 20; // Ajusta este valor si tu API de TMDB devuelve más por página

function MoviesPage() {
  const theme = useTheme(); // Accede al tema para estilos personalizados
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); // Cambiado a vacío para "Todos"
  const [selectedYear, setSelectedYear] = useState(''); // Cambiado a vacío para "Todos"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Usamos useCallback para memoizar la función y evitar re-creaciones innecesarias
  const fetchMoviesData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Construye la URL de tu backend
      let url = `http://localhost:5000/api/movies/search?query=${encodeURIComponent(searchTerm)}`;

      // Añadir filtros a la URL si están seleccionados
      if (selectedGenre && selectedGenre !== 'Todos') {
        // Nota: La API de TMDB directamente no filtra por "genre name" en la búsqueda,
        // sino por "genre ID". Esto requeriría un mapeo de tu lado, o usar el filtro
        // en el frontend si tienes una lista de películas ya cargada.
        // Por ahora, lo dejamos como parámetro para tu backend/futura implementación.
        url += `&genre=${encodeURIComponent(selectedGenre)}`;
      }
      if (selectedYear && selectedYear !== 'Todos') {
        // TMDB permite buscar por 'primary_release_year'
        url += `&year=${encodeURIComponent(selectedYear)}`;
      }
      url += `&page=${currentPage}`; // Añadir paginación

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // TMDB devuelve los resultados en 'results' y la paginación en 'total_pages'/'total_results'
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      setTotalResults(data.total_results || 0);

    } catch (err) {
      setError('Error al cargar las películas. Por favor, inténtalo de nuevo.');
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedGenre, selectedYear, currentPage]); // Dependencias para useCallback

  useEffect(() => {
    fetchMoviesData();
  }, [fetchMoviesData]); // Dispara la búsqueda cuando fetchMoviesData cambia (es decir, cuando sus deps cambian)

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Puedes añadir una función para manejar el toggle de favoritos, similar a HomePage
  const handleToggleFavorite = (movieId) => {
    console.log(`Película ${movieId} toggle favorito.`);
    // Aquí iría la llamada a tu API de backend para gestionar favoritos
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{
          mb: 5,
          background: theme.palette.gradientText, // Usa el color del tema
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
        }}
      >
        Explora Nuestro Catálogo
      </Typography>

      {/* Sección de Filtros y Búsqueda */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          mb: 5,
          p: 3,
          // Reutiliza los estilos de MuiPaper definidos en tu tema para el glassmorfismo
          // El background.paper ya debería heredar los estilos de MuiPaper
          // Si quieres una sombra adicional, puedes añadirla aquí, pero el tema ya lo maneja
          borderRadius: theme.shape.borderRadius * 2,
          boxShadow: theme.shadows[6], // Usar una sombra del sistema de Material UI
          background: theme.palette.background.glass, // Asegura el glassmorfismo
          backdropFilter: 'blur(15px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          label="Buscar película..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          fullWidth
          sx={{ maxWidth: { md: 300 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Género"
          value={selectedGenre}
          onChange={(e) => { setSelectedGenre(e.target.value); setCurrentPage(1); }}
          fullWidth
          sx={{ maxWidth: { md: 200 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterListIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="">Todos</MenuItem> {/* Valor vacío para "Todos" */}
          {genres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Año"
          value={selectedYear}
          onChange={(e) => { setSelectedYear(e.target.value); setCurrentPage(1); }}
          fullWidth
          sx={{ maxWidth: { md: 150 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterListIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="">Todos</MenuItem> {/* Valor vacío para "Todos" */}
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
        {/* TODO: Aquí iría el filtro por director */}
        {/* <TextField
          label="Director"
          variant="outlined"
          // ... lógica para buscar por director ...
        /> */}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && movies.length === 0 && (
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ my: 5 }}>
          No se encontraron películas con los criterios seleccionados.
        </Typography>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <Grid container spacing={4} justifyContent="center"> {/* justify-content center */}
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2.4}> {/* Las mismas columnas que HomePage */}
                {/* ¡Aquí es donde usamos tu MovieCard! */}
                <MovieCard
                  movie={movie}
                  // isFavorite={false} // Por ahora, asume no favoritos
                  // onToggleFavorite={handleToggleFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'text.primary',
                  '&.Mui-selected': {
                    background: (theme) => theme.palette.gradientPrimary,
                    color: 'white',
                    '&:hover': {
                      background: (theme) => theme.palette.gradientPrimary,
                    }
                  }
                }
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default MoviesPage;