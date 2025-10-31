import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
console.log('user info are', name, email , password)
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing user data',
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email.',
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Password should be more than 5 characters.',
      });
    }

    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'This user is already existing!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//api for login 
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or password is missing"
      })
    }
    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This user is not registered"
      })
    }

    const userPassword = await bcrypt.compare(password, user.password); // user.password is coming from database
    if (userPassword) {
      const token = await jwt.sign({ id: user._id}, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: "Login successfully", 
        data: user,
        token
      })
    } else {
            return res.status(400).json({
                success: false, 
                message: "User email or password is incorrect",
            }) 
    }
    
  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: err.message
    })
  }
}

//api for user profile
const userProfile = async (req, res) => {
  const userId = req.user._id;
  console.log('user id is:', userId)
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return  res.status(400).json({
        success: false,
        message: "This user is not found"
      })
  }

  return  res.status(200).json({
        success: true,
        data: user
      })
}
export {
  registerUser,
  login, 
  userProfile
};
