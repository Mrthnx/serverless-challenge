const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database')

const Employer = sequelize.define('empleado', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
  fechacreacion: {
    type: DataTypes.DATE,
  },
  fechamodificacion: {
    type: DataTypes.DATE,
  }
}, {
    tableName: 'empleado',
    timestamps: false
});

module.exports = { Employer };