// src/routes/routes.js
import { createBrowserRouter } from "react-router-dom";
import authRoutes from "./authRoutes.jsx";
import appRoutes from "./appRoutes.jsx";
import footerRoutes from "./footerRoutes.jsx";
import googleRoutes from "./googleRoutes.jsx";
import other from "./other.jsx"; // Import other routes if needed

const router = createBrowserRouter([...appRoutes, ...authRoutes, ...footerRoutes, ...googleRoutes, ...other]);

export default router;
