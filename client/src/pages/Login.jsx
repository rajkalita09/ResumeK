import React from 'react';
import { Lock, Mail, User2Icon, KeyRound, EyeOff, Eye } from "lucide-react";
import api from '../configs/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get('state')?.toLowerCase();
  const [state, setState] = React.useState(urlState === 'signup' ? 'signup' : 'login');

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    otp: '',
    newPassword: ''
  });

  const [otpSent, setOtpSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      const endpoint =
        state === "forgot"
          ? "/api/users/forgot-password/send-otp"
          : "/api/users/send-otp";
      const { data } = await api.post(endpoint, { email: formData.email });
      toast.success(data.message || "OTP sent to your Gmail!");
      setOtpSent(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.otp) {
      toast.error("Please fill in all fields before verifying");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post('/api/users/verify-otp', formData);
      dispatch(login(data));
      localStorage.setItem('token', data.token);
      toast.success(data.message || "Registration successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post('/api/users/login', {
        email: formData.email,
        password: formData.password
      });
      dispatch(login(data));
      localStorage.setItem('token', data.token);
      toast.success(data.message || "Login successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp || !formData.newPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post('/api/users/forgot-password/verify', {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });
      toast.success(data.message || "Password reset successful!");
      setState("login");
      setOtpSent(false);
      setFormData({ name: '', email: '', password: '', otp: '', newPassword: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form
        onSubmit={
          state === "login"
            ? handleLogin
            : state === "signup"
            ? otpSent
              ? handleVerifyAndSignup
              : (e) => e.preventDefault()
            : handleResetPassword
        }
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium capitalize">
          {state === "login"
            ? "Login"
            : state === "signup"
            ? "Sign Up"
            : "Reset Password"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {state === "login"
            ? "Please login to continue"
            : state === "signup"
            ? "Please sign up to continue"
            : "Reset your password by verifying OTP"}
        </p>

        {state === "signup" && !otpSent && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={14} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border-none outline-none ring-0 w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {state !== "forgot" && (!otpSent || state === "login") && (
          <>
            <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2">
              <Lock size={13} color="#6B7280" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="border-none outline-none ring-0 w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* 👇 Forgot Password button added here */}
            {state === "login" && (
              <p
                onClick={() => {
                  setOtpSent(false);
                  setState("forgot");
                }}
                className="text-sm text-yellow-500 text-right mt-2 cursor-pointer hover:underline"
              >
                Forgot Password?
              </p>
            )}
          </>
        )}

        {(otpSent && (state === "signup" || state === "forgot")) && (
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <KeyRound size={14} color="#6B7280" />
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="border-none outline-none ring-0 w-full"
              value={formData.otp}
              onChange={handleChange}
            />
          </div>
        )}

        {state === "forgot" && otpSent && (
  <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2">
    <Lock size={13} color="#6B7280" />
    <input
      type={showPassword ? "text" : "password"}
      name="newPassword"
      placeholder="New Password"
      className="border-none outline-none ring-0 w-full"
      value={formData.newPassword}
      onChange={handleChange}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  </div>
)}


        <div className="mt-6 mb-3">
          {state === "login" ? (
            <button
              type="submit"
              className="w-full h-11 rounded-full text-white bg-yellow-500 hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          ) : state === "signup" ? (
            otpSent ? (
              <button
                type="submit"
                className="w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify & Sign Up"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full h-11 rounded-full text-white bg-yellow-500 hover:opacity-90 transition-opacity"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            )
          ) : otpSent ? (
            <button
              type="submit"
              className="w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full h-11 rounded-full text-white bg-yellow-500 hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
        </div>

        <p
          onClick={() => {
            setOtpSent(false);
            setFormData({ name: '', email: '', password: '', otp: '', newPassword: '' });
            setState(prev =>
              prev === "login"
                ? "signup"
                : prev === "signup"
                ? "login"
                : "login"
            );
          }}
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : state === "signup"
            ? "Already have an account?"
            : "Remember your password?"}
          <span className="text-yellow-500 hover:underline"> click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
