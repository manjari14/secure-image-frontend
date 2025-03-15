import axios from "axios";
import { getToken } from "./auth";

const API_URL = "http://127.0.0.1:5000"; // Backend URL

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || "Upload failed";
  }
};

export const fetchImages = async () => {
  try {
    const res = await axios.get(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to load images";
  }
};

export const deleteImage = async (filename) => {
  try {
    const res = await axios.delete(`${API_URL}/image/${filename}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete image";
  }
};
