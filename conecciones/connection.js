require("dotenv/config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORTSQL}/${process.env.DATABASE_NAME}`,
  {
    timezone: "-03:00",
  }
);

(async () => {
  await sequelize.authenticate();
  console.log("Conectado a la base de datos Sqlite");
})();

module.exports = sequelize;
