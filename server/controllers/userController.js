import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn: '7d'});
    return token;
}


// controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
 try {
    const { name, email, password } = req.body;

    // check if required fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ 
        name, email, password: hashedPassword
     });

     // RETURN SUCCESS RESPONSE
     const token = generateToken(newUser._id)
     newUser.password = undefined; // hide password in response

        return res.status(201).json({message: "User registered successfully",token,user: newUser})

 } catch (error) {
    return res.status(400).json({ message: "Server error", error: error.message });
    }
}

// controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
 try {
    const { email, password } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password is correct or not
    if (!user.comparePassword(password)) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // return success response
     const token = generateToken(user._id)
     user.password = undefined; // hide password in response

        return res.status(200).json({message: "Loin successfully",token,user: user})

 } catch (error) {
    return res.status(400).json({ message: "Server error", error: error.message });
    }
}

// controller for getting user by ID
// GET: /api/users/data
export const getUserById = async (req, res) => {
 try {
    
    const userId = req.userId;

    // check if user already exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    //return user
    user.password = undefined; // hide password in response
     return res.status(200).json({user: user})

 } catch (error) {
    return res.status(400).json({ message: "Server error", error: error.message });
    }
}

// controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        // Return user resumes
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})
    } catch (error) {
        return res.status(400).json({ message: "Server error", error: error.message });
    }
}