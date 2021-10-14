const { DataTypes, STRING } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('servicio', {

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
    
    }, 
  { timestamps: false }
  ); 
};