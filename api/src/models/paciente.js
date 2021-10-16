const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "paciente",
    {
      medication: {
        type: DataTypes.STRING,
      },

      emergencyContact: {
        type: DataTypes.INTEGER,
      },

      disease: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
