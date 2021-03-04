require("dotenv/config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORTSQL}/${process.env.DATABASE_NAME}`,
  {
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: function (field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
    timezone: "-03:00",
  }
);

(async () => {
  await sequelize.authenticate();
  console.log("Conectado a la base de datos Sqlite");
})();

module.exports = sequelize;
