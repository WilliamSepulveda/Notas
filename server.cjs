require('dotenv').config();
const express = require('express');
const { join } = require('path');
const miRouter = require('./server/router/noteRouter.cjs'); 


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', miRouter); 

app.use((req, res) => {
    res.status(404).json({ message: 'La ruta solicitada no está disponible' });
  });
// Iniciar el servidor
const port = process.env.EXPRESS_PORT;
const host = process.env.EXPRESS_HOST_NAME;

app.listen(port, host, () => {
  console.log(`${process.env.EXPRESS_PROTOCOL}${host}:${port}`);
});