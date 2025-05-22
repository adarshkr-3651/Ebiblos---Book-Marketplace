import Home from "../pages/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import AuthSuccess from "../components/AuthSuccess"; 
import AuthFailure from "../components/AuthFailure";
import ResetPassword from "../components/ResetPassword";

const googleRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/auth/success", element: <AuthSuccess /> },
  { path: "/auth/failure", element: <AuthFailure /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <h1>404 - Page Not Found</h1> }, // Catch-all for unknown routes
];

export default googleRoutes;
