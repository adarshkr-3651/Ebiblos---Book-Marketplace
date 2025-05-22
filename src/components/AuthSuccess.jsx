import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";

function AuthSuccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser().then(user => {
            if (user) {
                dispatch(authLogin(user));
                navigate("/"); // Redirect to home after successful login
            } else {
                navigate("/login"); // Redirect back to login if user data is missing
            }
        });
    }, []);

    return <h2>Logging in with Google...</h2>; // Show loading message
}

export default AuthSuccess;
