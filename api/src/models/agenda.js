const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
sequelize.define('agenda', {
  
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false }
  );
};