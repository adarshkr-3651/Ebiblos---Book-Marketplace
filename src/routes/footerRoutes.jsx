// src/routes/footerRoutes.js
import Account from "../pages/Footer/Account.jsx";
import Help from "../pages/Footer/Help.jsx";
import Contact from "../pages/Footer/Contact.jsx";
import Support from "../pages/Footer/Support.jsx";
import Terms from "../pages/Footer/TermsAndCondition.jsx";
import Privacy from "../pages/Footer/Privacy.jsx";
import Licensing from "../pages/Footer/Licensing.jsx";

const footerRoutes = [
  { path: "/account", element: <Account /> },
  { path: "/help", element: <Help /> },
  { path: "/contact", element: <Contact /> },
  { path: "/support", element: <Support /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/licensing", element: <Licensing /> },
];

export default footerRoutes;
