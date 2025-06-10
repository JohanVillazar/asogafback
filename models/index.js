import sequelize from '../config/db.js';
import User from './User.js';
import Afiliacion from './Afiliacion.js';

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // usar { force: true } si necesitas limpiar todo
    console.log("🟢 Base de datos conectada");
  } catch (error) {
    console.error("🔴 Error conectando base de datos:", error);
  }
};

export { connectDB, User, Afiliacion };
