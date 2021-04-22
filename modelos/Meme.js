const { DataTypes, Model } = require("sequelize");
const sequelize = require("../conexiones/connection");

class Meme extends Model {}

Meme.init(
  {
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Meme",
    tableName: "Memes",
  }
);

module.exports = Meme;
