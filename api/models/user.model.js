import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://tse1.mm.bing.net/th?id=OIP.mP1RB8xuQaHAvUkonYY6HwHaHK&pid=Api&P=0&h=220"
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;
