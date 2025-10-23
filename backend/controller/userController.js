
const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.json({
                success: false,
                message: 'Missing user data'
            }) 
          
        }


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