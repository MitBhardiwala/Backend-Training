import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Course = sequelize.define(
  "Course",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This course already exists.",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Course Description cannot be empty.",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Course price must be greater than 0.",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Course;
