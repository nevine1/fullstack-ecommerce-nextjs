import  jwt from "jsonwebtoken";
const authUser = async (req, res) => {

    try {
        
        const authHeader = req.headers.authorization; 

        if (!authHeader || !authHeader.startWith('Bearer')) {
            return res.status(400).json({
            success: false, 
            message: "Invalid authorization"
        })
        }

        const userToken = authHeader.split('')[1];
        const decodedToken = await jwt.verify(userToken, process.env.JWT_SECRET);
        req.userId = decodedToken.id;
        next();
        
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: "Not authorized"
        })
    }
}

export default authUser;