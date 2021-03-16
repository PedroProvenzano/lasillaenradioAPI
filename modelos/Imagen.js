const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conecciones/connection");

class Imagen extends Model {}

Imagen.init(
  {
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Imagen",
    tableName: "Imagenes",
  }
);

module.exports = Imagen;
