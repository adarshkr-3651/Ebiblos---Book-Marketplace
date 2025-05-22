// src/components/VerifyEmail.jsx
import React from "react";
import { Link } from "react-router-dom";

function VerifyEmail() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md text-center space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">Check your email 📧</h1>
                <p className="text-gray-600">
                    A verification link has been sent to your email. Please verify before logging in.
                </p>
                <Link to="/login" className="text-blue-500 hover:underline">
                    Go to Login
                </Link>
            </div>
        </div>
    );
}

export default VerifyEmail;
