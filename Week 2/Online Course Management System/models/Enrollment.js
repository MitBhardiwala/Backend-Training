import sequelize from "../config/database.js";
import { DataTypes, DATE } from "sequelize";

const Enrollment = sequelize.define(
  "Enrollment",
  {
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

export default Enrollment;
