import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Callout from "./components/Callout";
import CalloutTwo from "./components/CalloutTwo";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IntroVideo from "./components/IntroVideo";
import Separator from "./components/Separator";
import Story from "./components/Story";
import ThreeColumn from "./components/ThreeColumn";
import StartForm from "./components/StartForm";
import { trackPageView } from "./lib/analytics";

// Route change tracker component
function RouteChangeTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Get page name from path
    const getPageNameFromPath = (path) => {
      if (path === '/') return 'Home';
      if (path === '/admin') return 'Admin Dashboard';
      if (path === '/features') return 'Features';
      if (path === '/pricing') return 'Pricing';
      if (path === '/start') return 'Signup Form';
      if (path === '/terms') return 'Terms and Conditions';
      if (path === '/privacy') return 'Privacy Policy';
      
      // Default: capitalize first letter of path segment
      const pageName = path.substring(1).split('/')[0];
      return pageName.charAt(0).toUpperCase() + pageName.slice(1);
    };
    
    // Track page view with additional context
    trackPageView(getPageNameFromPath(location.pathname), {
      path: location.pathname,
      previous_path: window.previousPath || 'direct',
      has_query_params: location.search !== '',
      query_params: location.search,
    });
    
    // Store current path for tracking previous path on next navigation
    window.previousPath = location.pathname;
    
    // Scroll to top on route change (except anchor links)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return null;
}

function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="start" element={<StartForm />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
