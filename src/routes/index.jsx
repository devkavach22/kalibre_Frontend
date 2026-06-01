/* eslint-disable react-refresh/only-export-components */
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
import HrRegister from "../dashboards/HrRegister";
import HrDashboard from "../dashboards/HrDashboard";
import MyProfile from "../dashboards/UserProfile";
import HrDetails from "../dashboards/HrJobdetails";
import CompnayDashbaord from "../Company/CompnayDashbaord";

// ───── Route Guards ─────

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
};

const ProtectedRouteHR = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const isHR = userType?.toLowerCase() === "hr" || userType?.toLowerCase() === "recruiter";

  if (!token) return <Navigate to="/login" replace />;
  if (!isHR) return <Navigate to="/" replace />;
  return children;
};

const ProtectedRouteCandidate = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const isHR = userType?.toLowerCase() === "hr" || userType?.toLowerCase() === "recruiter";

  if (!token) return <Navigate to="/login" replace />;
  if (isHR) return <Navigate to="/" replace />;
  return children;
};

// ✅ NEW - Employer Route Guard
const ProtectedRouteEmployer = ({ children }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const isEmployer = userType?.toLowerCase() === "employer";

  if (!token) return <Navigate to="/login" replace />;
  if (!isEmployer) return <Navigate to="/" replace />;
  return children;
};

// ───── Routes ─────

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

  {
    path: "/resume/upload",
    element: <PublicRoute><ResumeUpload /></PublicRoute>,
  },
  {
    path: "/candidates",
    element: <ProtectedRouteCandidate><CandidateDashbaord /></ProtectedRouteCandidate>,
  },
  {
    path: "/profile",
    element: <ProtectedRouteCandidate><MyProfile /></ProtectedRouteCandidate>,
  },
  {
    path: "/candidates/job/:id",
    element: <ProtectedRouteCandidate><JobDetailsPage /></ProtectedRouteCandidate>,
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
    element: <PublicRoute><HrRegister /></PublicRoute>,
  },

  // HR/Recruiter Routes
  {
    path: "/hrDashbaord",
    element: <ProtectedRouteHR><HrDashboard /></ProtectedRouteHR>,
  },
  {
    path: "/hrDashboard/job/:id",
    element: <ProtectedRouteHR><HrDetails /></ProtectedRouteHR>,
  },

  // ✅ Employer Route — now uses ProtectedRouteEmployer
  {
    path: "/compnay",
    element: <ProtectedRouteEmployer><CompnayDashbaord /></ProtectedRouteEmployer>,
  },
]);

export default router;