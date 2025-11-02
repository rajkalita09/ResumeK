import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTP } from "../utils/sendMail.js";
import Resume from "../models/Resume.js";

const OTP_STORE = new Map(); // Temporary memory store (use Redis/DB for production)

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ STEP 1 — Send OTP (for Registration)
export const sendOtpToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = OTP_STORE.get(email);

    // ⛔ Prevent OTP spamming: allow resend only after 60 seconds
    if (existing && Date.now() - existing.lastSent < 60 * 1000) {
      return res
        .status(429)
        .json({ message: "Please wait 60 seconds before resending OTP" });
    }

    // Generate a fresh OTP
    const otp = crypto.randomInt(100000, 999999);

    // Store OTP with expiry and timestamp
    OTP_STORE.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // valid for 5 mins
      lastSent: Date.now(),
    });

    await sendOTP(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

// ✅ STEP 2 — Verify OTP and Register
export const verifyOtpAndRegister = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    const record = OTP_STORE.get(email);
    if (!record) return res.status(400).json({ message: "OTP not found" });
    if (record.expires < Date.now())
      return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== Number(otp))
      return res.status(400).json({ message: "Invalid OTP" });

    // ✅ Delete OTP after successful verification
    OTP_STORE.delete(email);

    // Check if already registered
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

// ✅ LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    user.password = undefined;
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET USER DATA
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET USER RESUMES
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ STEP 1 — Send OTP for Password Reset
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No account found with this email" });

    // use a separate key for reset OTPs
    const key = `reset-${email}`;

    const existing = OTP_STORE.get(key);
    if (existing && Date.now() - existing.lastSent < 60 * 1000) {
      return res
        .status(429)
        .json({ message: "Please wait 60 seconds before resending OTP" });
    }

    const otp = crypto.randomInt(100000, 999999);
    OTP_STORE.set(key, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
      lastSent: Date.now(),
    });

    await sendOTP(email, otp);
    return res
      .status(200)
      .json({ message: "OTP sent to your email for password reset" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
};

// ✅ STEP 2 — Verify OTP and Change Password
export const verifyResetOtpAndChangePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    const key = `reset-${email}`;
    const record = OTP_STORE.get(key);

    if (!record) return res.status(400).json({ message: "OTP not found" });
    if (record.expires < Date.now()) {
      OTP_STORE.delete(key);
      return res.status(400).json({ message: "OTP expired" });
    }
    if (record.otp !== Number(otp))
      return res.status(400).json({ message: "Invalid OTP" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    OTP_STORE.delete(key); // ✅ delete after use

    return res
      .status(200)
      .json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to reset password", error: error.message });
  }
};


// ✅ Direct Password Reset (admin/system only)
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: "Email and new password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
};
