import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Dashboard from "./dashboard";

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
      setError(err.response?.data?.message || err.message || "An error occurred during login");
      console.error(err);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-pink/10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>n

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm font-medium bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        <input className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />

        <button type="submit" className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium" onClick={Dashboard}>Login</button>

        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 underline">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;