import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)

export default userModel