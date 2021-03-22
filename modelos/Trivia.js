const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conecciones/connection");

class Trivia extends Model {}

Trivia.init(
  {
    pregunta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    respuestaUno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respuestaDos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respuestaTres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    solucion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Trivia",
    tableName: "Trivias",
  }
);

module.exports = Trivia;
