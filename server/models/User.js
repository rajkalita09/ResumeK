// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },

  // OTP-related
  otpHash: { type: String, default: null },
  otpExpires: { type: Date, default: null },

  // Optional: count invalid attempts, for blocking/resend limits
  otpAttempts: { type: Number, default: 0 },
}, { timestamps: true });

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
