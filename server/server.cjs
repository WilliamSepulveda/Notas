const express = require('express');
const app = express();
const port = 5000;

// Middleware para parsear JSON
app.use(express.json());

// Importar conexión a la base de datos
const connectDB = require('./config/connect.cjs');
connectDB(); // Asegúrate de que esto es una función

// Importar rutas
const miRouter = require('./router/noteRouter.cjs'); 
app.use('/', miRouter); 

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
