require("dotenv").config();
const { Sequelize } = require("sequelize");

const dbconfig = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await dbconfig.authenticate();
    console.log("DB Connected Successfully!");
  } catch (err) {
    console.log("failed...");
  }
};
connectDB();
module.exports = dbconfig;
