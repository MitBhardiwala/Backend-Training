import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Student = sequelize.define(
  "Student",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide correct format of email",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Student;
