const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "agendatotal",
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
