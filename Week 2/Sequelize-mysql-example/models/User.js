import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";

const User = sequelize.define(
  "Users",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
  },
  {
    tableName: "Users",
  }
);



export default User;
