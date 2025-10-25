import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    }, 
    email: {
        type: String,
        require: true,
        unique: true,
    }, 
    password: {
        type: String,
        require: true,
    }, 
    confirmPassword: {
        type: String,
        require: true,
    }, 
    image: {
        type: String,
    }
}, {
    timestamps: true
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;