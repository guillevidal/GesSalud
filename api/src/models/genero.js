const { DataTypes, STRING } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('diagnostico', {

    genere: {
      type: DataTypes.STRING,
      allowNull: false,
    }

    }, 
  { timestamps: false }
  ); 
};