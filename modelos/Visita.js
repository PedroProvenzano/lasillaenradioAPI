const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conexiones/connection");

class Visita extends Model {}

Visita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: 1,
    },
    numerovisitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Visita",
    tableName: "Visitas",
  }
);

module.exports = Visita;
