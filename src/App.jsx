import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      
      <Outlet />
      
      <Footer isContactPage={isContactPage} /> 
    </div>
  );
}

export default App;