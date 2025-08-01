import { DataTypes, DECIMAL } from "sequelize";
import sequelize from "../config/database.js";

const Bonus = sequelize.define("bonus",{
    amount:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    bonusType:{
        type:DataTypes.ENUM('performance','holiday','project'),
        allowNull:false
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false
})

export default Bonus;