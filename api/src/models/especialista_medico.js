const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('especialista_medico', {
    enrollment: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  { timestamps: false }
  );
};