import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary'


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

  const id = req.userId; //this userId from the token 
  
  console.log('user id is:', id)
  const user = await User.findById(id).select("-password");

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


//api to update the user details 
const updateUserInfo = async (req, res) => {
  try {
    const { userId, name, email, role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //  Check if email belongs to another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "This email is already in use by another account.",
        });
      }
    }

    // Upload new image if provided
    let updatedImage = user.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "users",
      });
      updatedImage = result.secure_url;
    }

    // Update user info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
        image: updatedImage,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//api for update user info by admin 
const updateUserDetailsByAdmin = async (req, res) => {
  try {
    const { userId, name, email, role } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This user is not found"
      })
    }

    const updatedInfo = {
      name, email, role
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedInfo, {
      new: true
    })
    return res.status(200).json({
      success: true,
      message: "User has been updated successfully by admin", 
      data: updatedUser
    })

  } catch (err) {
    return res.status(500).json({
      success: false, 
      message: err.message
    })
  }
}
//api to get all users 
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -__v") // hide sensitive data
      .sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//api for changing user's role
const changeUserRole = async (req, res) => {
  try {
    const {userId, role } = req.body;
    console.log('backend user id is', userId)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This user is not found"
      });
    }
      const newRole = user.role === "General" ? "Admin" : "General"
      const updatedUserRole = await User.findByIdAndUpdate(userId,
        { role: newRole },
        { new: true }
      )
    
      return res.status(200).json({
        success: true,
        message: "User role has been updated successfully",
        data: updatedUserRole,
      });
    
    }catch (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }


export {
  registerUser,
  login, 
  userProfile,
  updateUserInfo,
  getUsers, changeUserRole,
  updateUserDetailsByAdmin
};
