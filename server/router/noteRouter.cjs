// router/noteRouter.cjs
const express = require('express');
const router = express.Router();
const noteController = require('../controller/note.controller.cjs');

// Obtener todas las notas
router.get('/search', noteController.getNoteByTitle); // Busca notas por título
router.get('/:id', noteController.getNoteByID); // Obtiene los detalles de una nota específica
router.get('/', noteController.getAllNotes); // Obtiene una lista de todas las notas




// Buscar notas por título
module.exports = router;