// // router/userRouter.cjs
// const express = require('express');
// const router = express.Router();
// const userController = require('../controller/user.controller.cjs');

// // Crear un nuevo usuario
// router.post('/users', userController.createUser); // Crea un nuevo usuario y devuelve un token JWT

// // Iniciar sesión
// router.post('/users/login', userController.loginUser); // Permite a un usuario iniciar sesión y obtener un token JWT

// // Cerrar sesión (opcional)
// router.post('/users/logout', userController.logoutUser); // Permite a un usuario cerrar sesión

// // Actualizar usuario (opcional, solo admin)
// router.put('/users/:id', userController.updateUser); // Actualiza la información del usuario específico

// // Eliminar usuario (opcional, solo admin)
// router.delete('/users/:id', userController.deleteUser); // Elimina un usuario específico

// module.exports = router;
