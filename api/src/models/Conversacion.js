const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "conversacion",
    {
      senderId: {
        type: DataTypes.STRING,
      },
      receiverId: {
        type: DataTypes.STRING,
      },
    },

    { timestamps: false }
  );
};
