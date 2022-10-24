require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mariadb",
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    logging: false,
  }
);

module.exports = sequelize;
