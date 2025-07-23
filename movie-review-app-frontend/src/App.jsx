// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'; // Importamos Box para el layout principal

// Importa tus componentes principales
import Header from './components/Header'; // Tu componente Header
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from './pages/MovieDetailPage';
import MoviesPage from './pages/MoviesPage'; // Nueva página para listar películas

// --- Definición del Tema Profesional ---
let myModernTheme = createTheme({
  palette: {
    mode: 'dark', // Tema oscuro para un look premium
    primary: {
      main: '#9c27b0', // Un púrpura profundo y elegante
      light: '#ce93d8',
      dark: '#6a0080',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00bcd4', // Un cian vibrante para acentos
      light: '#62efff',
      dark: '#008394',
      contrastText: '#000000',
    },
    error: { main: '#f44336' },
    warning: { main: '#ff9800' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' },
    background: {
      default: '#121212', // Fondo muy oscuro para el body
      paper: 'rgba(30, 30, 30, 0.8)', // Fondo de tarjetas/paneles con ligera transparencia
      glass: 'rgba(255, 255, 255, 0.08)', // Color específico para elementos de glassmorfismo
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      disabled: '#888888',
    },
    // Colores para degradados
    gradientPrimary: 'linear-gradient(45deg, #9c27b0 30%, #673ab7 90%)',
    gradientSecondary: 'linear-gradient(45deg, #00bcd4 30%, #0097a7 90%)',
    gradientText: 'linear-gradient(45deg, #FFD700 0%, #FFA500 100%)', // Degradado dorado para texto
  },
  typography: {
    fontFamily: ['"Montserrat"', '"Lato"', '"Open Sans"', 'sans-serif'].join(','),
    h1: { fontWeight: 700, fontSize: '3.5rem' },
    h2: { fontWeight: 700, fontSize: '2.8rem' },
    h3: { fontWeight: 700, fontSize: '2.2rem' },
    h4: { fontWeight: 600, fontSize: '1.8rem' },
    h5: { fontWeight: 600, fontSize: '1.5rem' },
    h6: { fontWeight: 600, fontSize: '1.2rem' },
    subtitle1: { fontSize: '1.1rem' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.9rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 }, // Botones con texto normal y más peso
  },
  shape: {
    borderRadius: 10, // Un borderRadius global para elementos como botones, tarjetas
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.background.paper, // Usa el fondo transparente del tema
          backdropFilter: 'blur(12px)', // Un blur más pronunciado
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)', // Borde muy sutil
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)', // Sombra más dramática
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: theme.shape.borderRadius, // Usa el borderRadius global
          padding: '12px 28px',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
          },
          // Degradado para botones 'contained' y 'primary'
          ...(ownerState.variant === 'contained' && ownerState.color === 'primary' && {
            background: theme.palette.gradientPrimary,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)',
            color: theme.palette.primary.contrastText,
            '&:hover': {
              background: theme.palette.gradientPrimary, // Mantener el degradado en hover
            },
          }),
          // Botones 'outlined' modernos
          ...(ownerState.variant === 'outlined' && {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: 'rgba(156, 39, 176, 0.1)', // Fondo sutil en hover
              borderColor: theme.palette.primary.light,
            },
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Efecto Glassmorfismo para todas las tarjetas/paneles
          background: theme.palette.background.glass, // Usa el color glass definido
          backdropFilter: 'blur(15px) saturate(180%)', // Blur y saturación para el efecto de vidrio
          border: '1px solid rgba(255, 255, 255, 0.05)', // Borde muy fino
          borderRadius: theme.shape.borderRadius * 2, // Bordes más redondeados que el global
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)', // Sombra distintiva
          padding: theme.spacing(4),
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: theme.shape.borderRadius,
            background: 'rgba(255, 255, 255, 0.05)', // Fondo ligeramente transparente para inputs
            '& fieldset': {
              borderColor: 'transparent !important', // Quitar borde por defecto
            },
            '&.Mui-focused fieldset': {
              borderColor: `${theme.palette.primary.light} !important`,
              boxShadow: `0 0 0 2px ${theme.palette.primary.dark}`,
            },
            '&:hover fieldset': {
                borderColor: `${theme.palette.primary.main} !important`,
            },
            '& input': {
              color: theme.palette.text.primary,
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
            '&.Mui-focused': {
              color: theme.palette.primary.light,
            },
          },
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none', // Quitar el subrayado por defecto en los enlaces
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.secondary.light,
          '&:hover': {
            color: theme.palette.secondary.main,
            textDecoration: 'underline',
          },
        }),
      },
    },
    // Aquí puedes añadir más overrides para otros componentes como MuiCard, MuiDialog, etc.
  },
});

// Opcional: Para tamaños de fuente responsivos automáticamente
myModernTheme = responsiveFontSizes(myModernTheme);

function App() {
  return (
    <ThemeProvider theme={myModernTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          // Fondo degradado global para toda la aplicación
          background: 'linear-gradient(180deg, #121212 0%, #000000 100%)',
        }}>
          <Header /> {/* El Header permanece fijo en la parte superior */}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}> {/* Contenido principal con padding */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/movies" element={<MoviesPage />} /> {/* Nueva ruta */}
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              {/* Añade más rutas para futuras funcionalidades */}
            </Routes>
          </Box>
          {/* Opcional: Un Footer global */}
          {/* <Footer /> */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;