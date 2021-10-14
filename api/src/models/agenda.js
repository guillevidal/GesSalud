const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
sequelize.define('agenda', {
  
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  
  },
  { timestamps: false }
  );
};