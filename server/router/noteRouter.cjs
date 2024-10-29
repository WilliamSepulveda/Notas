// router/noteRouter.cjs
const express = require('express');
const router = express.Router();
const noteController = require('../controller/note.controller.cjs');
const authenticate = require('../middleware/auth.cjs'); // Importa tu middleware de autenticación

// Obtener todas las notas
router.get('/search', noteController.getNoteByTitle); 
router.get('/:id/history', authenticate, noteController.getNoteByHistory); // Obtiene el historial de cambios de una nota
router.get('/:id', noteController.getNoteByID); // Obtiene los detalles de una nota específica
router.get('/', noteController.getAllNotes); // Obtiene una lista de todas las notas


module.exports = router;
