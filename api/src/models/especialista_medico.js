const { DataTypes, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "especialista_medico",
    {
      enrollment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
