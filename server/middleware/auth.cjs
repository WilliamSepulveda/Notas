// middleware/auth.js
const jwt = require('jsonwebtoken'); // Asegúrate de tener instalado jsonwebtoken

const authenticate = (req, res, next) => {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Obtén el token después de "Bearer"

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado: no se proporcionó token" });
    }

    // Verificar el token
    jwt.verify(token, 'tu_clave_secreta', (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err); // Log del error
            return res.status(403).json({ message: "Token no válido" });
        }
        req.user = user; // Almacena la información del usuario en req.user
        next(); // Pasa al siguiente middleware o controlador
    });
};

module.exports = authenticate;
