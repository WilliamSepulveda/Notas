require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const noteRoutes = require('./server/router/noteRouter.cjs');
const userRoutes = require('./server/router/userRouter.cjs');

const app = express();

// Middleware de CORS
const allowedOrigins = ['http://localhost:5173', 'https://williamsepulveda.github.io/Notas/', 'https://notas.vercel.app'
];

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

// Archivos estáticos
const staticPath = path.join(__dirname, process.env.EXPRESS_STATIC || 'public');
app.use(express.static(staticPath));

// Rutas de la API
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'La ruta solicitada no está disponible' });
});

// Iniciar el servidor
const port = process.env.PORT || 5500; 
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
