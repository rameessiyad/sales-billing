// src/LoginForm.js
import React from 'react';

const LoginForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-700">Welcome Back!</h2>
                <p className="text-center text-gray-500">Please log in to your account.</p>
                <form>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 transform focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Login
                    </button>
                </form>
                           </div>
        </div>
    );
};

export default LoginForm;
