import express from 'express';
import {
  getUserById,
  getUserResumes,
  loginUser,
  sendOtpToEmail,
  verifyOtpAndRegister,
  sendResetOtp,
  verifyResetOtpAndChangePassword,
  resetPassword

} from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// ✅ Step 1: Send OTP to email
userRouter.post('/send-otp', sendOtpToEmail);

// ✅ Step 2: Verify OTP & register user
userRouter.post('/verify-otp', verifyOtpAndRegister);

// ✅ Login route
userRouter.post('/login', loginUser);

// ✅ Step 1: Send reset OTP
userRouter.post('/forgot-password/send-otp', sendResetOtp);

// ✅ Step 2: Verify reset OTP & change password
userRouter.post('/forgot-password/verify', verifyResetOtpAndChangePassword);

// reset password
userRouter.post("/reset-password", resetPassword);

// ✅ Protected routes
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes);

export default userRouter;
