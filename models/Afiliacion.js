import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Afiliacion = sequelize.define('Afiliacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hijos: { type: DataTypes.JSONB, allowNull: false }, // [{nombre, grado}]
  estado: { type: DataTypes.STRING, defaultValue: 'pendiente_pago' },
});

User.hasOne(Afiliacion, { foreignKey: 'userId', onDelete: 'CASCADE' });
Afiliacion.belongsTo(User, { foreignKey: 'userId' });

export default Afiliacion;
