const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "agendaTotal",
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
