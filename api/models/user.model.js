import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        reuqired:true,
        unique:true
    },
    email:{
        type:String,
        reuqired:true,
        unique:true
    },
    password:{
        type:String,
        reuqired:true,
    },
},{timeseries:true})

const User = mongoose.model("User",UserSchema);

export default User;