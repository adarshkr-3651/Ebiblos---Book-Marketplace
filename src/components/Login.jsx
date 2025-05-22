import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import googleLogo from "../google.jpg";
import loginImage from "../login_image.jpeg"; // Adjust path if it's in a different folder


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);

    // Prefill email from cookie if exists
    useEffect(() => {
        const rememberedEmail = Cookies.get("rememberedEmail");
        if (rememberedEmail) {
            setValue("email", rememberedEmail);
            setRemember(true);
        }
    }, [setValue]);

    const login = async (data) => {
        setError("");
        try {
            if (remember) {
                Cookies.set("rememberedEmail", data.email, { expires: 30 });
            } else {
                Cookies.remove("rememberedEmail");
            }

            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            const response = await authService.loginWithGoogle();
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAppleLogin = async () => {
        setError("");
        try {
            const response = await authService.loginWithApple(); // implement this in your authService
            if (response) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left: Form Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 py-12 bg-white">
                <div className="max-w-md w-full mx-auto">
                <div className="flex items-center space-x-2">
                <Logo width="80px" className="mb-0" />
                <span className="font-bold text-lg hidden sm:inline">Ebiblos</span>
                <p></p>
            </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back!</h2>
                    <p className="text-sm text-gray-500 mb-6">Enter your credentials to access your account</p>

                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        <Input
                            label="Email address"
                            placeholder="Enter your email"
                            type="email"
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
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="accent-green-700"
                                />
                                Remember me for 30 days
                            </label>
                            <Link to="/reset-password" className="text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-md transition cursor-pointer"
                        >
                            Login
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <hr className="flex-1 border-gray-300" />
                        <span className="text-gray-400 text-sm">or</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Google & Apple Sign-In in one line */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center gap-3 px-4 py-3 w-full sm:w-auto bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer transition font-semibold text-sm"
                        >
                            <img src={googleLogo} alt="Google" className="w-5 h-5" />
                            Sign in with Google
                        </button>

                        <button
                            onClick={handleAppleLogin}
                            className="flex items-center justify-center gap-3 px-4 py-3 w-full sm:w-auto bg-black text-white rounded-lg hover:bg-gray-900 cursor-pointer transition font-semibold text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                                <path d="M16.365 1.43c-.736.044-1.624.506-2.145 1.102-.459.533-.86 1.391-.709 2.21.841.032 1.695-.473 2.176-1.059.467-.575.823-1.41.678-2.253zm3.837 16.206c-.021-.037-3.118-1.153-3.143-4.576-.02-2.997 2.372-4.418 2.462-4.464-.012-.041-1.594-2.093-4.161-2.064-1.332.017-2.537.783-3.205.783-.691 0-1.743-.762-2.868-.741-1.475.021-2.854.853-3.618 2.161-1.544 2.593-.395 6.438 1.113 8.55.75 1.076 1.644 2.285 2.816 2.239 1.125-.046 1.548-.725 2.906-.725 1.344 0 1.731.725 2.894.7 1.201-.02 1.961-1.101 2.707-2.185.446-.655.625-.991.634-1.009z" />
                            </svg>
                            Sign in with Apple
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-sm text-center text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right: Background Image with border-radius */}
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

export default Login;
