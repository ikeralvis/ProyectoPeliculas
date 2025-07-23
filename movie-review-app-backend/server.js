// movie-review-app-backend/server.js
import express from 'express'; // Importa Express
import dotenv from 'dotenv';   // Para cargar variables de entorno
import cors from 'cors';       // Para habilitar CORS
import movieRoutes from './routes/movieRoutes.js'; // Importa tus rutas de películas

// Carga las variables de entorno de tu archivo .env
dotenv.config();

const app = express(); // Inicializa la aplicación Express

// Middleware: Permite al servidor leer JSON enviado en el cuerpo de las peticiones
app.use(express.json());

// Middleware: Habilita CORS para permitir que tu frontend acceda al backend
app.use(cors());

// Ruta de prueba: cuando accedas a la URL base de tu backend
app.get('/', (req, res) => {
  res.send('API de Películas y Reseñas está corriendo...');
});

// Conecta las rutas de películas. Todas las rutas definidas en movieRoutes.js
// estarán prefijadas con /api/movies (ej. /api/movies/popular)
app.use('/api/movies', movieRoutes);

// Define el puerto en el que correrá el servidor. Usa el del .env o 5000 por defecto.
const PORT = process.env.PORT || 5000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
  console.log(`Accede a la API en: http://localhost:${PORT}`);
  console.log(`Prueba popular: http://localhost:${PORT}/api/movies/popular`);
  console.log(`Prueba búsqueda: http://localhost:${PORT}/api/movies/search?query=barbie`);
});