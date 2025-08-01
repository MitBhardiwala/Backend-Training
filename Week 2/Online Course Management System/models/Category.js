import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:{
          msg:"Name cannot be empty"
        }
      }
    },
  },
  {
    timestamps: false,
  }
);

export default Category;
