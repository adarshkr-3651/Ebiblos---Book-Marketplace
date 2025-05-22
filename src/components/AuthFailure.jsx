import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AuthFailure() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/login"); // Redirect back to login after 3 seconds
        }, 3000);
    }, []);

    return <h2>Google Login Failed. Redirecting...</h2>;
}

export default AuthFailure;
