// middleware/auth.js
const jwt = require('jsonwebtoken'); // Asegúrate de tener instalado jsonwebtoken

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado: no se proporcionó token" });
    }

    jwt.verify(token, 'tu_clave_secreta', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token no válido" });
        }
        req.user = user; // Almacena la información del usuario en req.user
        next(); // Pasa al siguiente middleware o controlador
    });
};

module.exports = authenticate;
