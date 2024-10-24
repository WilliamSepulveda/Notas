// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Conexión a MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Conectado a MongoDB'))
// .catch((err) => console.error('Error al conectar a MongoDB:', err));

// // Definir un esquema y modelo de "nota"
// const notaSchema = new mongoose.Schema({
//   texto: String,
// });

// const Nota = mongoose.model('Nota', notaSchema);