import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css"
import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
        <Navbar/>
      <Routes>
      
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login setToken={setToken} />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
