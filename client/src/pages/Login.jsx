import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData);
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed: No token received.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.message === "Network Error" || err.message === "Failed to fetch") {
        setError("Network Error: Unable to connect to server. Please check if the backend is running.");
      } else {
        setError(err.response?.data?.message || err.message || "An error occurred during login");
      }
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600'>
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl transform transition-all">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Login</h2>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200" type="email" id="email" name="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} required />
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200" type="password" id="password" name="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 active:scale-95 duration-200">Login</button>

        <p className="text-center mt-6 text-gray-600 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">Signup</Link></p>
      </form> 
    </div>
  );
};

export default Login;