const { DataTypes, STRING } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('historiaClinica', {

    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }

    }, 
  { timestamps: false }
  ); 
};
