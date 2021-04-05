const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conexiones/connection");

class Mensaje extends Model {}

Mensaje.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barrio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mensaje",
    tableName: "Mensajes",
  }
);

module.exports = Mensaje;
