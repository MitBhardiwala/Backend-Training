import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Instructor = sequelize.define(
  "Instructor",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Instructor Name cannot be empty.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address.",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Instructor;
