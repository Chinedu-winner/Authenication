// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="font-sans p-5 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <nav>
          <Link to="/" className="ml-4 text-blue-600 hover:underline">Home</Link>
          <Link to="/profile" className="ml-4 text-blue-600 hover:underline">Profile</Link>
          <Link to="/settings" className="ml-4 text-blue-600 hover:underline">Settings</Link>
        </nav>
      </header>

      <main className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Users</h2>
          <p className="text-3xl font-bold text-gray-900">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Orders</h2>
          <p className="text-3xl font-bold text-gray-900">85</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Revenue</h2>
          <p className="text-3xl font-bold text-gray-900">$5,400</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;