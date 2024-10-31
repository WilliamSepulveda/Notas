# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




# Proyecto de Notas - Frontend

Este proyecto es una aplicación de **notas** creada con **React** utilizando **Vite** como herramienta de desarrollo. El frontend está diseñado para interactuar con una API, permitiendo la creación, edición y guardado de notas. Además, se incluye navegación mediante **React Router** y gestión de solicitudes HTTP con **Axios**.

## Características principales

- **Vite**: Utilizado para un entorno de desarrollo rápido y ligero.
- **React**: Para la construcción de la interfaz de usuario.
- **React Router**: Para manejar la navegación entre diferentes rutas de la aplicación.

        npm install react-router-dom

- **Axios**: Para gestionar las solicitudes HTTP al servidor, como la creación y guardado de notas.

        npm install axios


## Requisitos previos

Asegúrate de tener **Node.js** y **npm** instalados en tu sistema antes de comenzar.

## Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tuusuario/proyecto-notas.git
```
2. **Acceder al directorio del proyecto:**

```bash
cd proyecto-notas
```
3. **instalar las dependicias**
```bash
npm install 
```

# conexion base de datos

1.**Configura el Backend con Express (Node.js) y MongoDB**

Primero, necesitarás un servidor backend con Node.js y Express para manejar la conexión a MongoDB.
a. Instala las dependencias necesarias

En tu carpeta del backend, instala las siguientes dependencias:
```bash
npm init -y
npm install express mongoose cors dotenv
```
        

2. **se inicia el backend**

con este comando inicias el backend
```bash
npm init -y
```
       

3. **instala todas las dependecias**
```bash
npm install 
```

4. **como cuarto paso se ajusta el tipo de rutamiento a:**
        node server.cjs

5.**se instala dependencias necesarias**

```bash
→ npm install express
→ npm install corse
→ npm install mongoose
→ npm install dotenv
→ npm install express-validator
→ npm install bcrypt
```


**intalación para la autentificación**
```bash
→ npm install jsonwebtoken
```





# API de Notas

### Endpoints que deben desarrollarse

| **Funcionalidad**                    | **Método HTTP** | **Endpoint**          | **Descripción**                                              |
| ------------------------------------ | --------------- | --------------------- | ------------------------------------------------------------ |
| Crear Usuario                        | POST            | `/users`              | Crea un nuevo usuario y devuelve un token JWT.               |
| Iniciar Sesión                       | POST            | `/users/login`        | Permite a un usuario iniciar sesión y obtener un token JWT.  |
| **Cerrar Sesión (opcional)**         | POST            | `/users/logout`       | Permite a un usuario cerrar sesión.                          |
| Crear Nota                           | POST            | `/notes`              | Crea una nueva nota.                                         |
| Obtener Todas las Notas              | GET             | `/notes`              | Obtiene una lista de todas las notas.                        |
| Obtener Nota Específica              | GET             | `/notes/{id}`         | Obtiene los detalles de una nota específica.                 |
| Actualizar Nota                      | PUT             | `/notes/{id}`         | Actualiza una nota existente.                                |
| Eliminar Nota                        | DELETE          | `/notes/{id}`         | Elimina una nota específica.                                 |
| Buscar Notas                         | GET             | `/notes/search`       | Busca notas por título o contenido.                          |
| Obtener Historial de Cambios de Nota | GET             | `/notes/{id}/history` | Obtiene el historial de cambios de una nota específica. **(solo admin)** |
| **Crear Nueva Versión de Nota**      | POST            | `/notes/{id}/history` | Guarda una nueva versión de una nota. **(Sin interfaz gráfica)** |
| **Actualizar Usuario (opcional)**    | PUT             | `/users/{id}`         | Actualiza la información del usuario específico **(solo admin).** |
| **Eliminar Usuario (opcional)**      | DELETE          | `/users/{id}`         | Elimina un usuario específico **(solo admin).**              |