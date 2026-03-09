import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const data = await loginUser(formData);

    console.log("Login success:", data);

      // store token if backend returns it
    if (data.token) {
        localStorage.setItem("token", data.token);
      }

    navigate("/dashboard");
    } catch (error) {
    alert("Login failed. Check your credentials.");
    }
};

return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
        <input  type="email"  name="email"  placeholder="Email"  onChange={handleChange}  required/>
        <br />
        <br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>

        <br />
        <br />

        <button type="submit">Login</button>
    </form>

    <br />

    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
);
};

export default Login;