const express = require('express');
const router = express.Router();

// Definir una ruta de ejemplo
router.get('/', (req, res) => {
    res.send('¡Hola desde el router!');
});

module.exports = router; 
