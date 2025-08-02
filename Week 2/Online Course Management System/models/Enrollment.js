import sequelize from "../config/database.js";
import { DataTypes, DATE } from "sequelize";

const Enrollment = sequelize.define(
  "Enrollment",
  {
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    courseId: { type: DataTypes.INTEGER, allowNull: false },
    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["studentId", "courseId"],
      },
    ],
    timestamps: false,
  }
);

export default Enrollment;
