import logo from "../assets/harbr-logo3.svg";
import InstagramIcon from "./icons/Instagram";
import LinkedInIcon from "./icons/LinkedIn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    
    // Track the logo click event
    trackEvent('footer_logo_click', {
      location: location.pathname,
      destination: isHomePage ? 'scroll_top' : 'home'
    });
    
    if (isHomePage) {
      // If already on home page, just scroll to top
      scrollToTop();
    } else {
      // If on another page, navigate to home
      navigate('/');
    }
  };

  return (
    <footer className="bg-zinc-50 pt-8 sm:pt-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Logo Section */}
          <div>
            <a 
              href="/" 
              className="flex items-center gap-x-2 text-zinc-900 mb-4 cursor-pointer"
              onClick={handleLogoClick}
            >
              <img alt="Harbr logo" src={logo} className="h-8 w-auto" />
              <span className="font-semibold text-xl">Harbr</span>
            </a>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col">
            <h3 className="text-zinc-400 text-sm font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-zinc-900 hover:text-[#5371FF] transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-zinc-900 hover:text-[#5371FF] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="flex flex-col sm:items-start lg:items-end">
            <h3 className="text-zinc-400 text-sm font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/harbr_" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Harbr on Instagram"
                className="text-zinc-500 hover:text-[#5371FF] transition-colors duration-200"
              >
                <InstagramIcon className="w-6 h-6 fill-current" />
              </a>
              <a 
                href="https://www.linkedin.com/company/harbrapp" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Harbr on LinkedIn"
                className="text-zinc-500 hover:text-[#5371FF] transition-colors duration-200"
              >
                <LinkedInIcon className="w-6 h-6 fill-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-zinc-100 text-center sm:text-left text-xs text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} Harbr Pty Ltd (ABN: 15 685 512 154). All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
