import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Your backend URL

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");
