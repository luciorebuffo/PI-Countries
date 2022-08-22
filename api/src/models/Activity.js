const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.INTEGER,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    season: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
    
  },
  {
    timestamps: false,
    createdAt:false,
    updateAt:false,
  }
  );
};