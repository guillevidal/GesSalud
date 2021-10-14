const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('agendas', {
    
    count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  { timestamps: false }
  );
};