const API_URL = "http://127.0.0.1:5000/api/auth";

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.message || 'Request failed');
        error.response = { data };
        throw error;
    }
    return data;
};

export const signupUser = async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response);
};

export const loginUser = async (formData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    return handleResponse(response);
};