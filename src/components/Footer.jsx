import logo from "../assets/harbr-logo3.svg";
import InstagramIcon from "./icons/Instagram";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-zinc-50 pt-8 sm:pt-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Logo Section */}
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-x-2 text-zinc-900 mb-4 cursor-pointer"
              onClick={scrollToTop}
            >
              <img alt="Harbr logo" src={logo} className="h-8 w-auto" />
              <span className="font-semibold text-xl">Harbr</span>
            </Link>
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
