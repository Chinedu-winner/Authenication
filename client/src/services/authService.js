import axios from "axios";

const API = "http://localhost:5000/api/auth"; 

export const loginUser = async (data) => {
try {
    const response = await axios.post(`${API}/login`, data);
    return response.data;
} catch (error) {
    console.error("Login error:", error);
    throw error;
}
};

export const signupUser = async (data) => {
try {
    const response = await axios.post(`${API}/signup`, data);
    return response.data;
} catch (error) {
    console.error("Signup error:", error);
    throw error;
}
};