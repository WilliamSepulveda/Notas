const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const User = require('../model/UserModel.cjs');

const user = new User();


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
      let { email, password } = req.body; // Cambiar a req.body
      console.log('Datos recibidos:', { email, password });
  
      if (!email || !password) {
        return res.status(400).json({ status: 400, message: 'Faltan credenciales.' });
      }
  
      let resFindUser = await user.findOneUserByEmail(email);
  
      if (resFindUser.status === 404) {
        return res.status(resFindUser.status).json(resFindUser);
      }
  
      if (!resFindUser.data || !resFindUser.data.password) {
        return res.status(500).json({ status: 500, message: 'Error al recuperar la contraseña del usuario.' });
      }
  
      let resEmailAndPassword = await bcrypt.compare(password, resFindUser.data.password);
      if (!resEmailAndPassword) {
        return res.status(406).json({ status: 406, message: 'Contraseña inválida' });
      }
  
      // Eliminar la contraseña antes de enviar la respuesta
      delete resFindUser.data.password;
  
      res.cookie("token", JSON.stringify(resFindUser), { maxAge: 1800000 });
  
      res.status(200).json({
        status: 200,
        message: 'Inicio de sesión exitoso',
        redirectUrl: '/Notas/HomeScreen'
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      res.status(500).json({ status: 500, message: 'Error interno del servidor.' });
    }
  };
  
exports.findCookies = async (req, res) => {
  console.log(req.cookies.token); 
  res.json({ message: 'Cookie encontrada', token: req.cookies.token });
};