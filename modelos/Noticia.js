const { DataTypes, Model, DATE } = require("sequelize");
const sequelize = require("../conecciones/connection");

class Noticia extends Model {}

Noticia.init(
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contenidoRes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagenesUrl: {
      type: DataTypes.TEXT,
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
    fecha: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: true,
    },
    fuente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Noticia",
    tableName: "Noticias",
  }
);

module.exports = Noticia;
