// router/noteRouter.cjs
const express = require('express');
const router = express.Router();
const noteController = require('../controller/note.controller.cjs');
const authenticate = require('../middleware/auth.cjs'); 

// Obtener todas las notas
router.get('/search', noteController.getNoteByTitle); 
router.get('/:id/history', authenticate, noteController.getNoteByHistory); // Obtiene el historial de cambios de una nota
router.get('/:id', noteController.getNoteByID); // Obtiene los detalles de una nota específica
router.get('/', noteController.getAllNotes); // Obtiene una lista de todas las notas



// router.post('/:id/history', noteController.saveNewVersionNote);
router.put('/:id', authenticate, noteController.updateNote);
router.delete('/:id', noteController.deleteNote);


module.exports = router;
