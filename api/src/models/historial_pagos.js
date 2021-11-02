const { DataTypes, STRING } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "historial_pagos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
