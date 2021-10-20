const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "persona",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //unique: true
      },

      email: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.STRING,
      },

      adress: {
        type: DataTypes.STRING,
      },

      birth: {
        type: DataTypes.STRING,
      },

      user: {
        type: DataTypes.STRING,
      },

      password: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      rol: {
        type: DataTypes.STRING,
      }
    },
    { timestamps: false }
  );
};
