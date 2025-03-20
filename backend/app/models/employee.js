const { DataTypes } = require("sequelize");
const db = require("../dbconfig");

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "employee"),
      allowNull: false,
      defaultValue: "employee",
    },
  },
  {
    timestamps: true,
  }
);

const usersmodel = async () => {
  try {
    await db.sync();
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};
usersmodel();

module.exports = User;
