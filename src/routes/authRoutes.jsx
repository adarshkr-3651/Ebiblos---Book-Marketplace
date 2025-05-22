// src/routes/authRoutes.js
import { AuthLayout, Login } from "../components/index.js";
import Signup from "../pages/Signup.jsx";
import VerifyEmail from "../components/VerifyEmail.jsx";


const authRoutes = [
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <AuthLayout authentication={false}>
        <VerifyEmail/>
      </AuthLayout>
    ),
  },
];

export default authRoutes;
