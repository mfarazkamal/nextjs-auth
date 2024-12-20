import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },

    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
}, {timestamps: true});

export default mongoose.models.User || model("User", userSchema);