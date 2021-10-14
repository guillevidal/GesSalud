const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('empleados', {

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
    
  },
  { timestamps: false }
  );
};