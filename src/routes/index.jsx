import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import AboutUs from "../components/AboutUs";
import Clients from "../components/Clients";
import Industry from "../components/Industry";
import MyServices from "../components/MyServices";
import OurProcess from "../components/OurProcess";
import ContactUs from "../components/ContactUs";
import Service1 from "../components/Service1";
import Service2 from "../components/Service2";
import Service3 from "../components/Service3";
import Service4 from "../components/Service4";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ForgetPassword from "../auth/ForgetPassword";
import ResumeUpload from "../pages/ResumeUpload";
import CandidateDashbaord from "../pages/CandidateDashbaord";
import JobDetailsPage from "../dashboards/JobDetailsPage";

import HrRegister from "../dashboards/HrRegister"
import HrDashboard from "../dashboards/HrDashboard";
import MyProfile from "../dashboards/UserProfile"

// eslint-disable-next-line react-refresh/only-export-components
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Yahan sirf wahi pages aayenge jisme Navbar + Footer chahiye
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/clients", element: <Clients /> },
      { path: "/industry", element: <Industry /> },
      { path: "/services", element: <MyServices /> },
      { path: "/process", element: <OurProcess /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/talent", element: <Service1 /> },
      { path: "/manpower", element: <Service2 /> },
      { path: "/remote-staffing", element: <Service3 /> },
      { path: "/rpo", element: <Service4 /> },
    ],
  },

  // Independent Pages (Yahan na Navbar dikhega, na Footer)
  {
    path: "/resume/upload",
    element: <ResumeUpload />,
  },
  {
    path: "/candidates",
    element: <CandidateDashbaord />,
  },
  {
    path: "/profile",
    element: < MyProfile />,
  },
  {
    path: "/candidates/job/:id",
    element: <JobDetailsPage />,
  },

  // Auth Routes
  {
    path: "/register",
    element: <PublicRoute><Register /></PublicRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/forget-password",
    element: <PublicRoute><ForgetPassword /></PublicRoute>,
  },
  {
    path: "/hr",
    element: < HrRegister />,
  },
  {
    path: "/hrDashbaord",
    element: < HrDashboard />,
  },
]);

export default router;