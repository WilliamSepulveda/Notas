const express = require('express');
const router = express.Router();
const noteController = require('../controller/note.controller.cjs');

// Definir una ruta de ejemplo
router.get('/', noteController.getAllNotes); 

module.exports = router; 
