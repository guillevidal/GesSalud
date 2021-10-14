const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('consultorio', {

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },

    modulos_atencion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
  },
  { timestamps: false }
  );
};