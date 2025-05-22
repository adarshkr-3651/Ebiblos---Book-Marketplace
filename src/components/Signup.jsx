import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import googleLogo from "../google.jpg";
import loginImage from "../login_image.jpeg"; // Adjust path if it's in a different folder

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (!userData) {
                setError("Error creating account. Please try again.");
                return;
            }
            const userDetails = await authService.getCurrentUser();
            if (userDetails) {
                dispatch(login(userDetails));
                navigate("/");
            }
        } catch (error) {
            setError(error.message || "Something went wrong. Please try again.");
        }
    };

    const handleGoogleSignup = async () => {
        setError("");
        try {
            const response = await authService.loginWithGoogle();
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left: Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Get Started Now</h2>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit(create)} className="space-y-5">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm"
                            {...register("name", { required: true })}
                        />
                        <Input
                            label="Email address"
                            placeholder="Enter your email"
                            type="email"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm"
                            {...register("password", { required: true })}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
                        >
                            Signup
                        </Button>
                    </form>

                    {/* Or divider */}
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px bg-gray-300 flex-1" />
                        <span className="text-sm text-gray-500">or</span>
                        <span className="h-px bg-gray-300 flex-1" />
                    </div>

                    {/* Google / Apple Signup */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleGoogleSignup}
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <img src={googleLogo} alt="Google" className="w-5 h-5" />
                            <span className="text-sm font-medium">Sign in with Google</span>
                        </button>
                        <button
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                                alt="Apple"
                                className="w-5 h-5"
                            />
                            <span className="text-sm font-medium">Sign in with Apple</span>
                        </button>
                    </div>

                    <p className="text-sm text-center text-gray-600">
                        Have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right: Image Section */}
<div className="hidden lg:flex w-1/2 bg-white items-center justify-center">
    <div className="w-full h-full">
        <div
            className="w-full h-full bg-contain bg-no-repeat bg-center rounded-bl-[50px] rounded-tl-[20px] rounded-tr-[20px]" // Adjust border-radius here
            style={{ backgroundImage: `url(${loginImage})` }}
        />
    </div>
</div>

        </div>
    );
}

export default Signup;
