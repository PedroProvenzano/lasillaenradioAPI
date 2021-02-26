const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conecciones/connection");

class Noticia extends Model {}

Noticia.init(
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagenesUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temaPrincipal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    importancia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Noticia",
    tableName: "Noticias",
  }
);

module.exports = Noticia;
