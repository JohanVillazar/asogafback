import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const generarToken = (user) => {
  return jwt.sign(
    { id: user.id,  nombre: user.nombre,apellido: user.apellido, email: user.email, phone: user.phone },
    process.env.JWT_SECRET,
    { expiresIn: '40m' }
  );
};

export const register = async (req, res) => {
  const { nombre, apellido, email, phone, password } = req.body;

  try {
    // Validar que no exista
    const existe = await User.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ message: 'El correo ya existe' });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await User.create({
      nombre,
      apellido,
      email,
      phone,
      password: hashedPassword,
    });

    const token = generarToken(newUser);

    res.status(201).json({
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
        phone: newUser.phone
      },
      token,
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = generarToken(usuario);

    res.status(200).json({
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
