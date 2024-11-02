require('dotenv').config();
const express = require('express');
const cors = require('cors');
const noteRoutes = require('./server/router/noteRouter.cjs'); 
const userRoutes = require('./server/router/userRouter.cjs');

const app = express();

// Middleware de CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://williamsepulveda.github.io/Notas/',
  'https://notes.vercel.app'  
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes desde los orígenes en `allowedOrigins` o cualquier origen local
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica los métodos permitidos
  credentials: true // Permite el uso de credenciales como cookies
}));

// Middleware para parsear JSON y datos URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/notes', noteRoutes); 
app.use('/users', userRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'La ruta solicitada no está disponible' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack); // Log de errores en la consola
  res.status(500).json({ message: 'Error interno del servidor.' });
});

// Iniciar el servidor
const port = process.env.EXPRESS_PORT || 5000; // Valor por defecto en caso de no estar definido
const host = process.env.EXPRESS_HOST_NAME || '0.0.0.0'; // Valor por defecto

app.listen(port, host, () => {
  console.log(`Servidor corriendo en ${process.env.EXPRESS_PROTOCOL}${host}:${port}`);
});
