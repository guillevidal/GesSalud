const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "items_pagos",
    {
      title: {
        type: DataTypes.STRING,
      },
      unit_price: {
        type: DataTypes.BIGINT,
      },
      patient_id: {
        type: DataTypes.BIGINT,
      },
      turno_id: {
        type: DataTypes.BIGINT,
      },
    },
    { timestamps: false }
  );
};
