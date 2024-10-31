// router/userRouter.cjs
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.cjs');

// // Crear un nuevo usuario
router.post('/', userController.createUser); 
// // Iniciar sesión
router.post('/login', userController.login); 

// // Cerrar sesión (opcional)
// router.post('/users/logout', userController.logoutUser); // Permite a un usuario cerrar sesión

// // Actualizar usuario (opcional, solo admin)
// router.put('/users/:id', userController.updateUser); // Actualiza la información del usuario específico

// // Eliminar usuario (opcional, solo admin)
// router.delete('/users/:id', userController.deleteUser); // Elimina un usuario específico

module.exports = router;
