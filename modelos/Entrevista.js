const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conexiones/connection");

class Entrevista extends Model {}

Entrevista.init(
  {
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Entrevista",
    tableName: "Entrevistas",
  }
);

module.exports = Entrevista;
