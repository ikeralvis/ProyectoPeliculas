// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie'; // Un ícono de película
import AccountCircle from '@mui/icons-material/AccountCircle'; // Icono de usuario

function Header() {
  // Aquí podrías manejar el estado de autenticación para mostrar login/register o el perfil del usuario
  const isAuthenticated = false; // Simulación

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MovieIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            FilmFlow
          </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}> {/* Esconde en móvil, muestra en desktop */}
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/movies">
            Películas
          </Button>
          {!isAuthenticated ? (
            <>
              <Button variant="contained" color="primary" component={Link} to="/login">
                Iniciar Sesión
              </Button>
              <Button variant="outlined" color="primary" component={Link} to="/register">
                Registrarse
              </Button>
            </>
          ) : (
            <IconButton color="inherit" sx={{ p: 0.5 }}>
              <AccountCircle fontSize="large" />
            </IconButton>
          )}
        </Box>
        {/* Aquí podrías añadir un menú de hamburguesa para móvil */}
        {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit">
                <MenuIcon />
            </IconButton>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;