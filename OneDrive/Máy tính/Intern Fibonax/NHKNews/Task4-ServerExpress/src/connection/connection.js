import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  dialect: dialect,
});

export default sequelize;
