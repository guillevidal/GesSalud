const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diagnostico",
    {
      diagnostic: {
        type: DataTypes.STRING,
        //allowNull: false,
      },

      date: {
        type: DataTypes.STRING,
        //allowNull: false,
      },

      derivation: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
