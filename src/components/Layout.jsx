import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { trackPageView } from "../lib/analytics";

export default function Layout() {
  const location = useLocation();
  
  // Track page views when the route changes
  useEffect(() => {
    // Get the page name from the pathname
    const pageName = location.pathname === '/' 
      ? 'Home' 
      : location.pathname.substring(1).charAt(0).toUpperCase() + 
        location.pathname.substring(2).replace('/', ' ');
    
    // Track the page view
    trackPageView(pageName);
  }, [location]);
  
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
} 