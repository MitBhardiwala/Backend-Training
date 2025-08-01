import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";

const Post = sequelize.define(
  "Posts",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalLikes:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    tableName: "Posts",
  }
);





export default Post;
