const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "items_pagos",
    {
      title: {
        type: DataTypes.STRING,
      },
      unit_price: {
        type: DataTypes.INTEGER,
      },
      patient_id: {
        type: DataTypes.STRING,
      },
      turno_id: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
