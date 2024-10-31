require('dotenv').config();
const express = require('express');
const { join } = require('path');
const noteRoutes = require('./server/router/noteRouter.cjs'); 
const userRoutes = require('./server/router/userRouter.cjs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/notes', noteRoutes); 
app.use('/Users', userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'La ruta solicitada no está disponible' });
  });
// Iniciar el servidor
const port = process.env.EXPRESS_PORT;
const host = process.env.EXPRESS_HOST_NAME;

app.listen(port, host, () => {
  console.log(`${process.env.EXPRESS_PROTOCOL}${host}:${port}`);
});