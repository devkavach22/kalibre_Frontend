import { URLS } from "../baseURL/url";

export const registerUser = async (userData) => {
  const response = await fetch(URLS.AUTH.SIGNUP, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(URLS.AUTH.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const forgotPasswordService = async (email) => {
  const response = await fetch(URLS.AUTH.FORGOT_PASSWORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to send OTP");
  return data;
};

export const resetPasswordService = async (payload) => {
  const response = await fetch(URLS.AUTH.RESET_PASSWORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to reset password");
  return data;
};