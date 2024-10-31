const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const User = require('../model/UserModel.cjs');

const user = new User();
const jwt = require('jsonwebtoken'); 

exports.createUser = async (req, res) => {
    const { userName, email, password } = req.body; // Removed 'telefono' and 'rol'

    try {
        // Check if the password is provided
        if (!password) {
            return res.status(400).json({ status: 400, message: 'Password is required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Check if the username already exists
        let userExist = await user.findExistUserName(userName);
        if (userExist.status === 200) {
            return res.status(400).json({ status: 400, message: 'El nombre de usuario ya está en uso.' });
        }

        // Check if the email already exists
        let emailExist = await user.findExistEmail(email);
        if (emailExist.status === 200) {
            return res.status(400).json({ status: 400, message: 'El correo electrónico ya está registrado.' });
        }

        // Insert new user into the collection, including created_at timestamp
        let resUser = await user.insertCollection({ 
            userName, 
            email, 
            password: hashedPassword,
            created_at: new Date() // Set created_at to the current date
        });
        
        if (resUser.status === 200) {
            return res.status(201).json({ status: 201, message: 'Usuario creado exitosamente.' });
        } else {
            return res.status(500).json({ status: 500, message: 'Error al crear el usuario.' });
        }
    } catch (error) {
        console.error('Error al crear el usuario:', error.message);
        let err;
        try {
            err = JSON.parse(error.message);
        } catch {
            err = { status: 500, message: 'Error interno del servidor.' };
        }
        res.status(err.status || 500).json(err);
    }
};

  
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body; // Cambiar a req.body
      console.log('Datos recibidos:', { email, password });

      // Validar que se proporcionen las credenciales
      if (!email || !password) {
          return res.status(400).json({ status: 400, message: 'Faltan credenciales.' });
      }

      // Buscar al usuario por correo electrónico
      let resFindUser = await user.findOneUserByEmail(email);
      if (resFindUser.status === 404) {
          return res.status(resFindUser.status).json(resFindUser);
      }

      if (!resFindUser.data || !resFindUser.data.password) {
          return res.status(500).json({ status: 500, message: 'Error al recuperar la contraseña del usuario.' });
      }

      // Comparar la contraseña proporcionada con la almacenada
      const isPasswordValid = await bcrypt.compare(password, resFindUser.data.password);
      if (!isPasswordValid) {
          return res.status(406).json({ status: 406, message: 'Contraseña inválida' });
      }

      // Eliminar la contraseña antes de enviar la respuesta
      delete resFindUser.data.password;

      // Generar el token JWT
      const token = jwt.sign(
          { id: resFindUser.data._id, username: resFindUser.data.username }, // Cambia user._id a resFindUser.data._id
          'tu_clave_secreta',
          { expiresIn: '1h' }
      );

      // Enviar la cookie con el token (opcional)
      res.cookie("token", token, { maxAge: 1800000, httpOnly: true }); // Usa el token en vez de JSON.stringify(resFindUser)

      // Responder con el token y la redirección
      return res.status(200).json({
          status: 200,
          message: 'Inicio de sesión exitoso',
          redirectUrl: '/Notas/',
          token // También puedes enviar el token si lo deseas
      });

  } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      return res.status(500).json({ status: 500, message: 'Error interno del servidor.' });
  }
};
  
exports.findCookies = async (req, res) => {
  console.log(req.cookies.token); 
  res.json({ message: 'Cookie encontrada', token: req.cookies.token });
};