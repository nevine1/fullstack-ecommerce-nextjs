
const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.json({
                success: false,
                message: 'Missing user data'
            }) 
          
        }

        const existingUser = await User.find({ email });
        if (existingUser) {
            return res.json({
                success: false, 
                message: "This user is already existing."
            })
        }

        const salt = await bcrypt.generateSale(10);
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