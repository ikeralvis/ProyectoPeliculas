// src/pages/LoginPage.jsx
import { Typography, Box, TextField, Button, Link } from '@mui/material'; // Importamos Link de MUI

function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)', // Ajuste para el AppBar
        py: 5,
        // El fondo global ya lo maneja App.jsx
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          background: (theme) => theme.palette.gradientText, // Degradado para el título
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Bienvenido de Nuevo
      </Typography>

      {/* Paper obtendrá sus estilos de glassmorfismo del tema global */}
      <Box sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          textAlign: 'center',
          // Aunque Paper ya tiene estilos de glassmorfismo, Box puede ser útil si no quieres un Paper para este contenedor
          // Aquí estamos usando Box para que el glassmorfismo sea aplicado al contenedor principal del formulario
          // Puedes reemplazar este Box con Paper si quieres la semántica de "tarjeta".
          // Si lo haces con Paper, quita los estilos de background, backdropFilter, border, borderRadius, boxShadow de aquí,
          // ya que los obtendrá del MuiPaper styleOverrides en App.jsx.
          background: (theme) => theme.palette.background.glass,
          backdropFilter: 'blur(15px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: (theme) => theme.shape.borderRadius * 2,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      }}>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Ingresa tus credenciales para continuar.
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          sx={{ mb: 4 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Acceder
        </Button>

        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          ¿Olvidaste tu contraseña?{' '}
          <Link component={Link} to="/forgot-password" color="secondary" sx={{ fontWeight: 600 }}>
            Restablecer
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          ¿No tienes una cuenta?{' '}
          <Link component={Link} to="/register" color="secondary" sx={{ fontWeight: 600 }}>
            Regístrate
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;