import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
    }, 
    role: {
        type: String,
        default: "General",
    }
}, {
    timestamps: true
});


const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;