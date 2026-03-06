import React from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from '../services/authService';

export default function Signup() {
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
            setMessage({ type: 'success', text: response.data.message || 'Signup successful! Please login.' })
            setFormData({ username: '', email: '', password: '' })
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || 'An error occurred during signup'
            setMessage({ type: 'error', text: errorMsg })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-pink/10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

            {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                    {message.text}
                </div>
            )}

            <input name="username" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input name="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="password" className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

            <button type="submit" disabled={loading} className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center mt-4">
                Already have an account? <Link to="/login" className="text-blue-500 underline">Log In</Link>
            </p>
        </form>
        </div>
    );
}
