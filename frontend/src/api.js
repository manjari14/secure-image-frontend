import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Ensure this matches your backend URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error);
    throw error;
  }
};

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchImages = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/images`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Ensure it returns an array
    return Array.isArray(res.data.images) ? res.data.images : [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export const deleteImage = async (filename, token) => {
  try {
    await axios.delete(`${API_URL}/image/${filename}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { message: "Deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    throw error;
  }
};
