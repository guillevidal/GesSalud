const { DataTypes, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "historiaClinica",
    {
      creationDate: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        //allowNull: false,
      },
    },
    { timestamps: false }
  );
};
