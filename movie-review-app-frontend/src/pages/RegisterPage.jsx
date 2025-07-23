// src/pages/RegisterPage.jsx
import { Typography, Box, TextField, Button, Link } from '@mui/material';

function RegisterPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)', // Ajuste para el AppBar
        py: 5,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 4,
          background: (theme) => theme.palette.gradientText,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Crea Tu Cuenta
      </Typography>

      <Box sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          textAlign: 'center',
          background: (theme) => theme.palette.background.glass,
          backdropFilter: 'blur(15px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: (theme) => theme.shape.borderRadius * 2,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      }}>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Únete a nuestra comunidad de amantes del cine.
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre de Usuario"
          name="username"
          autoComplete="username"
          autoFocus
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          autoComplete="new-password"
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
          Registrarse
        </Button>

        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          ¿Ya tienes una cuenta?{' '}
          <Link component={Link} to="/login" color="secondary" sx={{ fontWeight: 600 }}>
            Inicia Sesión
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterPage;