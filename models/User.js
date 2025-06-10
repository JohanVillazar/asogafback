import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true },
  nombre: { type: DataTypes.STRING, 
    allowNull: false },
  apellido: { type: DataTypes.STRING, 
    allowNull: false },
  email: { type: DataTypes.STRING, 
    allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, 
    allowNull: false },
  password: { type: DataTypes.STRING, 
    allowNull: false },
}
, {
  tableName: 'User',
 
});

export default User;
