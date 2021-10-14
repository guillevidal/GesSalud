const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('tipo_especialidad', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    modulo_atencion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  { timestamps: false }
  );
};