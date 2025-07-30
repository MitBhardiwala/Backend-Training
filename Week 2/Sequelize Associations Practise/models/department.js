import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Department = sequelize.define("department",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    budget:{
        type:DataTypes.DECIMAL,
        allowNull:false
    }
},{
    timestamps:false
})

export default Department;