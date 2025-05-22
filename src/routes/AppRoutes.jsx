// src/routes/appRoutes.js
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import AddPost from "../pages/SellProduct.jsx";
import EditPost from "../pages/EditPost.jsx";
import Post from "../pages/ProductCard.jsx";
import AllPosts from "../pages/AllProducts.jsx";
import { AuthLayout } from "../components/index.js";
import DashboardPage from "../components/Dashboardpage.jsx";
import Account from "../pages/Footer/Account.jsx";
import Help from "../pages/Footer/Help.jsx";
import Contact from "../pages/Footer/Contact.jsx";
import Support from "../pages/Footer/Support.jsx";
import Terms from "../pages/Footer/TermsAndCondition.jsx";
import Privacy from "../pages/Footer/Privacy.jsx";
import Licensing from "../pages/Footer/Licensing.jsx";
import Affiliate from "../pages/Footer/Affiliate.jsx";
import PricingPage from "../pages/Footer/PricingPage.jsx";
import PressKit from "../pages/Footer/PressKit.jsx";
import Features from "../pages/Footer/Features.jsx";  
import Favorites from "../pages/Favourites.jsx";
import Cart from "../pages/Cart.jsx";
import Notifications from "../pages/Notifications.jsx";
import Checkout from "../pages/checkout.jsx";

const appRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      { path: "/post/:slug", element: <Post /> },
      { path: "/dashboardPage", element: <DashboardPage /> },
      {path: "/editpost/:postId", element: <EditPost/>},
      { path: "/account", element: <Account /> },
  { path: "/help", element: <Help /> },
  { path: "/contact", element: <Contact /> },
  { path: "/support", element: <Support /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/licensing", element: <Licensing /> },
  { path: "/affiliate", element: <Affiliate /> },
  { path: "/pricing", element: <PricingPage /> },
  {path : "/presskit", element: <PressKit />},
  {path: "/features", element: <Features />},
  {path: "/favorites", element:<Favorites />},
  {path:"/cart" ,element:<Cart /> },
  {path: "/notifications", element:<Notifications />},
  {path: "/checkout", element:<Checkout />},

  

    ],
  },
];

export default appRoutes;
