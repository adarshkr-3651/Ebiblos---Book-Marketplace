import DashboardPage from "../components/Dashboardpage";
import EditPost from "../pages/EditPost";


const other = [
  { path: "/dashboardPage", element: <DashboardPage /> },
  {path: "/editpost/:postId", element: <EditPost/>},

];

export default other;