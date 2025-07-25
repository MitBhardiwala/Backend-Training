import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true //remove whitespaces
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const User = mongoose.model('User',userSchema);

export default User;