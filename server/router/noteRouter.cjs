const express = require('express');
const router = express.Router();
const noteController = require('../controller/note.controller.cjs');

// Definir una ruta de ejemplo
router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteByID) 

module.exports = router; 
