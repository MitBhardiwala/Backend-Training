import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Worker = sequelize.define("worker", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
},{
    timestamps:false
});

export default Worker;
