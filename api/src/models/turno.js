const { DataTypes, STRING } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('turno', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      //allowNull: false,
    },
    hour: {
      type: DataTypes.DATE,
      //allowNull: false,
    },
    modules: {
      type: DataTypes.INTEGER,  ////acepta valores multiplos de 15
      //allowNull: false,
    }
    }, 
  { timestamps: false }
  ); 
};