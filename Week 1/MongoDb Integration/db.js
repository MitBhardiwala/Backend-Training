import mongoose from "mongoose";
import dotenv from "dotenv"

//loads environment variavles from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully !");
    } catch (error) {
        console.log("MongoDb connection error : ",error);
        // process.exit(1);
    }
}

export default connectDB;
