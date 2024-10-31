require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Asegúrate de importar cors
const noteRoutes = require('./server/router/noteRouter.cjs'); 
const userRoutes = require('./server/router/userRouter.cjs');

const app = express();

// Middleware de CORS
app.use(cors({
  origin: 'http://localhost:5173' // Cambia esto si necesitas permitir otros orígenes
}));

// Middleware para parsear JSON y datos URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/notes', noteRoutes); 
app.use('/Users', userRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'La ruta solicitada no está disponible' });
});

// Iniciar el servidor
const port = process.env.EXPRESS_PORT || 5000; // Establecer un valor por defecto si no está definido
const host = process.env.EXPRESS_HOST_NAME || 'localhost'; // Establecer un valor por defecto si no está definido

app.listen(port, host, () => {
  console.log(`${process.env.EXPRESS_PROTOCOL}${host}:${port}`);
});
