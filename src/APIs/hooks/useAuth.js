import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  registerUser,
  loginUser,
  forgotPasswordService,
  resetPasswordService,
} from "../services/authService";

const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role || "candidate",
      };
      await registerUser(payload);
      // ✅ Token save nahi kar rahe — warna PublicRoute /login pe aane nahi deta
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: formData.role || "candidate",
      };
      const data = await loginUser(payload);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_name", data.user_name);
      }
      toast.success("Logged in successfully!");
      navigate("/resume/upload");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await forgotPasswordService(email);
      toast.success(data.message || "OTP sent to your email!");
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to send OTP!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async ({ email, otp, new_password, confirm_password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resetPasswordService({ email, otp, new_password, confirm_password });
      toast.success(data.message || "Password reset successfully!");
      navigate("/login");
      return true;
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to reset password!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, login, forgotPassword, resetPassword, loading, error };
};

export default useAuth;