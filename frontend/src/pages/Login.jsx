import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:5000"; // Backend URL

const Login = ({ setToken }) => {  // Use setToken from App.jsx
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", 
        { email, password },
        { 
          withCredentials: true, // ✅ Important for sending cookies/tokens
          headers: { 
            "Content-Type": "application/json",
          }
        }
      );
    
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);  // ✅ Update token in App.jsx
        navigate("/dashboard");  // ✅ Redirect to dashboard after login
      } else {
        setError("Invalid response from server.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
