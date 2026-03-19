import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/authService';

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const [message, setMessage] = React.useState({ type: '', text: '' })
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage({ type: '', text: '' })
        setLoading(true)

        try {
            const response = await signupUser(formData.username, formData.email, formData.password)
            setMessage({ type: 'success', text: response.message || 'Signup successful! Redirecting to login...' })
            setFormData({ username: '', email: '', password: '' })
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("Signup Error:", error);
            let errorMsg = error.response?.data?.message || error.message || 'An error occurred during signup'
            if (error.message === "Network Error" || error.message === "Failed to fetch") {
                errorMsg = "Network Error: Unable to connect to server. Please check if the backend is running.";
            }
            setMessage({ type: 'error', text: errorMsg })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600'>
        <form onSubmit={handleSubmit} className="bg-white w-full max-w-md mx-4 p-8 rounded-2xl shadow-2xl transform transition-all">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Create Account</h2>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg border-l-4 text-sm ${message.type === 'success'
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                }`}>
                    <p className="font-bold">{message.type === 'success' ? 'Success' : 'Error'}</p>
                    <p>{message.text}</p>
                </div>
            )}

            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200" type="text" id="username" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200" type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200" type="password" id="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 active:scale-95 duration-200 disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Signing Up...' : 'Sign Up'}</button>

            <p className="text-center mt-6 text-gray-600 text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold hover:underline">Log In</Link></p>
        </form>
        </div>
    );
}
