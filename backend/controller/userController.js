import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.json({
                success: false,
                message: 'Missing user data'
            }) 
          
        }
//validation for email, name, password;
        if (!email) { 
              console.error("Validation Error: Email is missing.");
              return res.status(400).json({ success: false, message: "Email is required." });
            }
            if (!validator.isEmail(email)) {
              console.error("Validation Error: Invalid email format.");
              return res.status(400).json({ success: false, message: "Please enter a valid email." });
            }
        
            if (!password) { 
              console.error("Validation Error: Password is missing.");
              return res.status(400).json({ success: false, message: "Password is required." });
            }
            if (password.length < 5) {
              console.error("Validation Error: Password too short.");
              return res.status(400).json({ success: false, message: "Password should be more than 5 characters." });
        }
        if (!confirmPassword) { 
              console.error("Validation Error: confirmPassword is missing.");
              return res.status(400).json({ success: false, message: "confirmPassword is required." });
            }
            if (confirmPassword.length < 5) {
              console.error("Validation Error:confirmPassword too short.");
              return res.status(400).json({ success: false, message: "confirmPassword should be more than 5 characters." });
        }
        
        const existingUser = await User.find({ email });

        if (existingUser) {
            return res.json({
                success: false, 
                message: "This user is already existing."
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       const  hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt)
        const newUserData = {
            name, 
            email, 
            password: hashedPassword, 
            confirmPassword: hashedConfirmPassword, 
        }
        const newUser = new User(newUserData);
        await newUser.save();
        const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        console.log('token is:', token)
        return res.json({
            success: true,
            message: "New user has successfully registered!", 
            dat: token
        })
    } catch (err) {
        return res.json({
            success: false, 
            message: err.message
        })
    }
}

export {
    registerUser
}