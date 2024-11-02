require('dotenv').config();
const express = require('express');
const cors = require('cors');
const noteRoutes = require('./server/router/noteRouter.cjs'); 
const userRoutes = require('./server/router/userRouter.cjs');

const app = express();

// Middleware de CORS
const allowedOrigins = ['http://localhost:5173', 'https://williamsepulveda.github.io/Notas/'];

app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes desde los orígenes en `allowedOrigins`
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
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

// Iniciar el servidor
const port = process.env.EXPRESS_PORT || 5000;
const host = process.env.EXPRESS_HOST_NAME || 'localhost';

app.listen(port, host, () => {
  console.log(`${process.env.EXPRESS_PROTOCOL}${host}:${port}`);
});
