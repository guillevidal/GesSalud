const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "personal_administrativo",
    {
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    { timestamps: false }
  );
};
