import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import BookingsFeatures from "./pages/BookingsFeatures";
import OnlineBookingsFeatures from "./pages/OnlineBookingsFeatures";
import CrmFeatures from "./pages/CrmFeatures";
import FinanceManagementFeatures from "./pages/FinanceManagementFeatures";
import Implementation from "./pages/Implementation";
import Support from "./pages/Support";
import AIManager from "./pages/AIManager";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BoatTypesGuide from "./pages/BoatTypesGuide";
import ModernTechnologyTransformingMarinas from "./pages/ModernTechnologyTransformingMarinas";
import MarinamooringGuide from "./pages/MarinamooringGuide";
import EssentialSailingKnots from "./pages/EssentialSailingKnots";
import ArtificialIntelligenceDecoded from "./pages/ArtificialIntelligenceDecoded";
import MarinaAccreditationPrograms from "./pages/MarinaAccreditationPrograms";
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
import { AthenaTracker } from "./components/AthenaTracker";

// Route change tracker component
function RouteChangeTracker() {
  const location = useLocation();

  useEffect(() => {
    // Get page name from path
    const getPageNameFromPath = (path) => {
      if (path === "/") return "Home";
      if (path === "/admin") return "Admin Dashboard";
      if (path === "/features") return "Features";
      if (path === "/pricing") return "Pricing";
      if (path === "/bookings-features") return "Bookings & Berth Management";
      if (path === "/online-bookings-features")
        return "Online Bookings & Customer Portal";
      if (path === "/crm-features") return "CRM Features";
      if (path === "/finance-management-features")
        return "Finance Management Features";
      if (path === "/implementation") return "Implementation";
      if (path === "/support") return "Support";
      if (path === "/ai-marina-manager") return "AI Marina Manager";
      if (path === "/blog") return "Blog";
      if (path.startsWith("/blog/")) return "Blog Post";
      if (path === "/start") return "Signup Form";
      if (path === "/terms") return "Terms and Conditions";
      if (path === "/privacy") return "Privacy Policy";

      // Default: capitalize first letter of path segment
      const pageName = path.substring(1).split("/")[0];
      return pageName.charAt(0).toUpperCase() + pageName.slice(1);
    };

    // Track page view with additional context
    trackPageView(getPageNameFromPath(location.pathname), {
      path: location.pathname,
      previous_path: window.previousPath || "direct",
      has_query_params: location.search !== "",
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
      <AthenaTracker />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="bookings-features" element={<BookingsFeatures />} />
          <Route
            path="online-bookings-features"
            element={<OnlineBookingsFeatures />}
          />
          <Route path="crm-features" element={<CrmFeatures />} />
          <Route
            path="finance-management-features"
            element={<FinanceManagementFeatures />}
          />
          <Route path="implementation" element={<Implementation />} />
          <Route path="support" element={<Support />} />
          <Route path="ai-marina-manager" element={<AIManager />} />
          <Route path="blog" element={<Blog />} />
          <Route
            path="blog/complete-guide-mastering-marina-mooring"
            element={<MarinamooringGuide />}
          />
          <Route
            path="blog/essential-sailing-knots-every-boater-should-know"
            element={<EssentialSailingKnots />}
          />
          <Route
            path="blog/artificial-intelligence-decoded"
            element={<ArtificialIntelligenceDecoded />}
          />
          <Route
            path="blog/marina-accreditation-programs-australia"
            element={<MarinaAccreditationPrograms />}
          />
          <Route
            path="blog/modern-technology-transforming-marina-operations"
            element={<ModernTechnologyTransformingMarinas />}
          />
          <Route
            path="blog/complete-guide-different-types-boats"
            element={<BoatTypesGuide />}
          />
          <Route path="blog/:slug" element={<BlogPost />} />
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
